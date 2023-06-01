<script>
    import { TableBodyCell, TableBodyRow } from 'flowbite-svelte'

    export let lead = ''

    const { category, email, name, phone, id } = lead

    const specific = { name, email, phone, category }

    const row = { ...specific }

    const fields = Object.keys(row)

</script>

<TableBodyRow >

    <TableBodyCell>
        {id.slice(6, 12)}
    </TableBodyCell>

    {#each fields as field }
        <TableBodyCell>{lead[field] || ''}</TableBodyCell>
    {/each}

    <slot>

    </slot>

</TableBodyRow>
