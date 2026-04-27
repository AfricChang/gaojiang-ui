import { globalState } from "../wenyan.svelte";
import { domToPng } from "modern-screenshot";

async function rasterizeMermaidSvgs(root: HTMLElement) {
    const svgElements = root.querySelectorAll<SVGSVGElement>('pre[data-mermaid-processed="true"] svg');
    if (svgElements.length === 0) return;

    const xmlSerializer = new XMLSerializer();

    await Promise.all(
        Array.from(svgElements).map(async (svgElement) => {
            const rect = svgElement.getBoundingClientRect();
            const width = Math.max(1, Math.ceil(rect.width));
            const height = Math.max(1, Math.ceil(rect.height));

            if (width <= 1 || height <= 1) return;

            let svgText = xmlSerializer.serializeToString(svgElement);
            if (!svgText.includes("xmlns=")) {
                svgText = svgText.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if (!svgText.includes("xmlns:xlink=")) {
                svgText = svgText.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
            const objectUrl = URL.createObjectURL(blob);

            try {
                const image = await new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error("Failed to load mermaid svg"));
                    img.src = objectUrl;
                });

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const context = canvas.getContext("2d");
                if (!context) return;

                context.drawImage(image, 0, 0, width, height);

                const pngDataUrl = canvas.toDataURL("image/png");
                const imgElement = document.createElement("img");
                imgElement.src = pngDataUrl;
                imgElement.width = width;
                imgElement.height = height;
                imgElement.style.display = "block";
                imgElement.style.width = `${width}px`;
                imgElement.style.height = `${height}px`;

                svgElement.replaceWith(imgElement);
            } catch (error) {
                console.error("Mermaid rasterize error:", error);
            } finally {
                URL.revokeObjectURL(objectUrl);
            }
        })
    );
}

export async function defaultExportImageHandler() {
    globalState.setConfirmMessage({
        title: "导出长图",
        message: "网页版导出长图功能无法处理图片，如果文档中包含图片，请使用桌面版导出。",
        action: async () => {
            await exportImage();
        },
    });
}

async function exportImage() {
    let bgColor = window.getComputedStyle(document.body).backgroundColor;
    // 如果获取到的是透明色 (rgba(0, 0, 0, 0)) 或者 transparent，设置为白色
    if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
        bgColor = "#ffffff";
    }

    const wenyanElement = document.getElementById("wenyan");
    if (!wenyanElement) return;

    const clonedWenyan = wenyanElement.cloneNode(true) as HTMLElement;
    Object.assign(clonedWenyan.style, {
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "-9999",
        width: "420px",
        backgroundColor: bgColor,
        pointerEvents: "none",
    });

    try {
        document.body.appendChild(clonedWenyan);

        await rasterizeMermaidSvgs(clonedWenyan);

        const dataUrl = await domToPng(clonedWenyan, {
            scale: 2, // 高清
            backgroundColor: bgColor,
            fetch: {
                requestInit: { mode: "cors" },
            },
        });

        const link = document.createElement("a");
        link.download = "wenyan-export.png";
        link.href = dataUrl;
        link.click();
    } finally {
        if (clonedWenyan.parentNode) {
            document.body.removeChild(clonedWenyan);
        }
    }
}
