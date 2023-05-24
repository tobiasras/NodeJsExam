

<script>
    import {TableBodyCell, TableBodyRow} from "flowbite-svelte";

    export let onClick;

    function handleClick() {
        // Call the onClick function passed from the parent component
        onClick();
    }

</script>

<TableBodyRow>
    <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
    <TableBodyCell>Sliver</TableBodyCell>
    <TableBodyCell>Laptop</TableBodyCell>
    <TableBodyCell>$2999</TableBodyCell>
    <TableBodyCell>
        <button on:click={handleClick} class="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Edit
        </button>
    </TableBodyCell>
</TableBodyRow>
