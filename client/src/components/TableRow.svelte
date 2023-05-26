<script>
    import {Button, Modal, TableBodyCell, TableBodyRow} from "flowbite-svelte";
    import Leadform from "./LeadForm.svelte";

    export let lead = ""
    export let socket

    const {category, email, name, phone, id, description, ...otherFields} = lead
    let specific = {name, email, phone, category}


    const row = {...specific, ...otherFields}

    let fields = Object.keys(row)

</script>

<TableBodyRow >

    <TableBodyCell>
        {id.slice(6, 12)}
    </TableBodyCell>

    {#each fields as field }
        <TableBodyCell>{lead[field] || ""}</TableBodyCell>
    {/each}



    <slot>

    </slot>

</TableBodyRow>
