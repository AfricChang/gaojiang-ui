<script lang="ts">
    import { globalState } from "../gaojiang.svelte";
    import RightSplitRect from "./icons/RightSplitRect.svelte";

    async function handleClick() {
        globalState.setSidebarOpen(!globalState.getSidebarOpen());
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <RightSplitRect w="14px" />
</button>
