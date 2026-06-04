<script lang="ts">
    import FilePdf from "../icons/FilePdf.svelte";
    import { getExportPdfClick } from "../../hooks/operation";

    const exportPdf = getExportPdfClick();
</script>

<button class="overlay-button" onclick={exportPdf}>
    <FilePdf />
    PDF
</button>
