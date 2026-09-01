<script lang="ts">
    import { OverlayButtons } from "$lib";
    import { globalState } from "$lib/gaojiang.svelte";

    globalState.setThemeEditMode(true);

</script>

<div class="h-screen w-full overflow-auto bg-amber-500">
    <OverlayButtons />
</div>
