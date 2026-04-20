import mermaid from "mermaid";

let mermaidIdCounter = 0;

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
        } catch (error) {
            console.error("Mermaid render error:", error);
            preElement.innerHTML = `<p style="color: red;">Mermaid render error</p>`;
        }
    }
}
