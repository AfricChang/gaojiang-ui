<script lang="ts">
    import type { ViewMode } from "../types";
    import { globalState } from "../wenyan.svelte";
    import LeftSplitRect from "../components/icons/LeftSplitRect.svelte";
    import RightSplitRect from "../components/icons/RightSplitRect.svelte";
    import Pencil from "../components/icons/Pencil.svelte";

    let viewMode = $derived(globalState.getViewMode());

    function setMode(mode: ViewMode) {
        globalState.setViewMode(mode);
    }

    function buttonClass(mode: ViewMode) {
        const base =
            "inline-flex h-6 w-7 cursor-pointer items-center justify-center border-none transition-colors";
        const active = "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white";
        const inactive = "text-gray-600 hover:bg-white/80 dark:text-gray-300 dark:hover:bg-gray-600";

        return `${base} ${viewMode === mode ? active : inactive}`;
    }
</script>

<div
    class="inline-flex overflow-hidden rounded-sm bg-gray-300/70 p-0.5 dark:bg-gray-800"
    role="group"
    aria-label="视图模式"
>
    <button
        type="button"
        class={buttonClass("split")}
        aria-label="分屏视图"
        aria-pressed={viewMode === "split"}
        title="分屏视图"
        onclick={() => setMode("split")}
    >
        <LeftSplitRect w="15px" />
    </button>
    <button
        type="button"
        class={buttonClass("editor")}
        aria-label="仅编辑视图"
        aria-pressed={viewMode === "editor"}
        title="仅编辑视图"
        onclick={() => setMode("editor")}
    >
        <Pencil />
    </button>
    <button
        type="button"
        class={buttonClass("preview")}
        aria-label="仅预览视图"
        aria-pressed={viewMode === "preview"}
        title="仅预览视图"
        onclick={() => setMode("preview")}
    >
        <RightSplitRect w="15px" />
    </button>
</div>
