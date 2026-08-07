<script lang="ts">
    import { onMount } from "svelte";
    import { colorModeStore } from "../stores/colorModeStore.svelte";

    let isDark = $derived(colorModeStore.getMode() === "dark");
    let label = $derived(isDark ? "切换到浅色模式" : "切换到深色模式");

    onMount(() => {
        colorModeStore.initialize();
    });
</script>

<button
    type="button"
    class="inline-flex h-7.5 w-7.5 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-gray-700 transition-colors hover:bg-white/80 dark:text-gray-100 dark:hover:bg-gray-600"
    onclick={() => colorModeStore.toggle()}
    aria-label={label}
    aria-pressed={isDark}
    title={label}
>
    {#if isDark}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>
        </svg>
    {:else}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
        </svg>
    {/if}
</button>
