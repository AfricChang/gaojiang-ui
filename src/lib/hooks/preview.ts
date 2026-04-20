import { setContext, getContext } from "svelte";
import type { Action } from "svelte/action";
import { IMAGE_PROCESSOR_ACTION_KEY, PREVIEW_CLICK_KEY } from "./symbols";
import { initMermaid, renderMermaidInNode } from "../utils/mermaid";

initMermaid();

export type ImageProcessorAction = Action<HTMLElement>;

type PreviewClickFn = () => void;

export function setPreviewClick(fn: PreviewClickFn) {
    setContext(PREVIEW_CLICK_KEY, fn);
}

export function getPreviewClick(): PreviewClickFn {
    return getContext<PreviewClickFn>(PREVIEW_CLICK_KEY);
}

export function setImageProcessorAction(fn: ImageProcessorAction) {
    setContext(IMAGE_PROCESSOR_ACTION_KEY, fn);
}

export function getImageProcessorAction(): ImageProcessorAction {
    return getContext<ImageProcessorAction>(IMAGE_PROCESSOR_ACTION_KEY) ?? defaultImageProcessorAction;
}

const defaultImageProcessorAction: ImageProcessorAction = (node) => {
    const run = async () => {
        const images = node.querySelectorAll<HTMLImageElement>("img");
        if (images.length === 0) return;

        for (const img of images) {
            const dataSrc = img.getAttribute("src");

            if (dataSrc && dataSrc.startsWith("https://mmbiz.qpic.cn/")) {
                img.setAttribute("referrerpolicy", "no-referrer");
            }
        }
    };

    const runAll = async () => {
        // 处理期间断开观察器，避免 renderMermaidInNode 修改 DOM 时触发额外的观察器循环
        observer.disconnect();
        await run();
        await renderMermaidInNode(node);
        observer.observe(node, { childList: true, subtree: true });
    };

    // 首次运行
    runAll();

    const observer = new MutationObserver(() => runAll());

    observer.observe(node, {
        childList: true,
        subtree: true,
    });

    return {
        destroy() {
            observer.disconnect();
        },
    };
};
