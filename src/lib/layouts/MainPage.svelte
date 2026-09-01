<script lang="ts">
    import CssEditor from "../components/CssEditor.svelte";
    import { MarkdownEditor, OverlayButtons, ThemePreview } from "..";
    import { ScrollSynchronizer } from "../services/scrollSync.svelte";
    import { globalState } from "../gaojiang.svelte";
    import EditorOverlayPanel from "./customs/CustomThemeOverlayPanel.svelte";

    const scroller = new ScrollSynchronizer();
    let viewMode = $derived(globalState.getViewMode());
    let showEditorPane = $derived(viewMode !== "preview");
    let showPreviewPane = $derived(viewMode !== "editor");
    let isSplitMode = $derived(showEditorPane && showPreviewPane);
    let editorPaneClass = $derived(
        [
            "flex w-full flex-col md:h-full md:flex-1 md:min-w-0",
            isSplitMode ? "h-1/2 border-b border-gray-300 md:border-b-0 md:border-r" : "h-full",
        ].join(" ")
    );
    let previewPaneClass = $derived(
        ["relative flex w-full flex-col md:h-full md:flex-1 md:min-w-0", isSplitMode ? "h-1/2" : "h-full"].join(
            " "
        )
    );
</script>

{#if showEditorPane}
    <div class={editorPaneClass}>
        <div class="relative flex-1 overflow-hidden">
            {#if globalState.getThemeEditMode()}
                <CssEditor />
                <EditorOverlayPanel />
            {:else}
                <MarkdownEditor bind:scrollRef={scroller.left} />
            {/if}
        </div>
    </div>
{/if}

{#if showPreviewPane}
    <div class={previewPaneClass}>
        {#if !globalState.getThemeEditMode()}
            <OverlayButtons />
        {/if}

        <div class="max-w-none flex-1 overflow-hidden">
            <ThemePreview bind:scrollRef={scroller.right} wide={viewMode === "preview"} />
        </div>
    </div>
{/if}
