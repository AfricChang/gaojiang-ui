<script lang="ts">
    import Zhihu from "../icons/Zhihu.svelte";
    import { globalState } from "../../gaojiang.svelte";

    let { w = "20px" } = $props();

    async function handleClick() {
        globalState.setPlatform("zhihu");
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Zhihu w={w} />
</button>
