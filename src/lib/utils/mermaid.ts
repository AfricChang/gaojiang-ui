import mermaid from "mermaid";

let mermaidIdCounter = 0;

function isolateMermaidLabelStyles(root: ParentNode) {
    const svgElement = root.querySelector<SVGSVGElement>("svg");
    if (!svgElement) return;

    svgElement.setAttribute("data-wenyan-mermaid", "true");

    const labelElements = svgElement.querySelectorAll<HTMLElement>("foreignObject p, foreignObject div, foreignObject span");
    for (const element of labelElements) {
        element.style.setProperty("margin", "0", "important");
        element.style.setProperty("letter-spacing", "normal", "important");
        element.style.setProperty("word-spacing", "normal", "important");
        element.style.setProperty("text-align", "center", "important");
        element.style.setProperty("text-indent", "0", "important");
        element.style.setProperty("line-height", "1.5", "important");
    }
}

export function initMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
    });
}

export async function renderMermaidInNode(node: HTMLElement) {
    const preElements = node.querySelectorAll<HTMLPreElement>("pre");
    if (preElements.length === 0) return;

    for (const preElement of preElements) {
        if (preElement.getAttribute("data-mermaid-processed")) {
            continue;
        }

        const codeElement = preElement.querySelector<HTMLElement>("code");
        if (!codeElement) continue;

        const className = codeElement.className || "";
        const isMermaid =
            className.includes("language-mermaid") ||
            className.includes("lang-mermaid") ||
            codeElement.getAttribute("data-language") === "mermaid";

        if (!isMermaid) continue;

        preElement.setAttribute("data-mermaid-processed", "true");

        try {
            const graphDefinition = codeElement.innerText?.trim() || "";
            if (!graphDefinition) continue;

            const { svg } = await mermaid.render("mermaid-" + mermaidIdCounter++, graphDefinition);
            preElement.innerHTML = svg;
            isolateMermaidLabelStyles(preElement);
        } catch (error) {
            console.error("Mermaid render error:", error);
            preElement.innerHTML = `<p style="color: red;">Mermaid render error</p>`;
        }
    }
}
