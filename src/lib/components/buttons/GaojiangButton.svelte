<script lang="ts">
    import Gaojiang from "../icons/Gaojiang.svelte";

    let { onClick, w = "28px", class: className = "" }: { onClick?: () => void; w?: string; class?: string } = $props();
</script>

<button onclick={onClick} class={className}>
    <Gaojiang {w} />
</button>
