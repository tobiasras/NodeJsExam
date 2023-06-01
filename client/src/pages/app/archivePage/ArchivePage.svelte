<script>
    import {
      Button, Dropdown,
      DropdownItem,
      Input, MenuButton, Modal,
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell
    } from 'flowbite-svelte'
    import TableRow from '../../../components/TableRow.svelte'
    import { onDestroy, onMount } from 'svelte'

    export let socket

    onMount(() => {
      socket.emit('load company data')
    })

    onDestroy(() => {
      // socket.off("company data")
    })

    $: archivedLeads = []

    let searchQuery = ''
    socket.on('company data', (data) => {
      if (data.company.archive) {
        archivedLeads = data.company.archive
      }
    })

    $: filteredLeads = archivedLeads.filter(lead =>
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    let sortedField = null
    let sortOrder = true

    let leadCache = {}

    function sortLeads (field) {
      if (sortedField === field) {
        sortOrder = !sortOrder
      } else {
        sortedField = field
        sortOrder = true
      }
      archivedLeads.sort((a, b) => {
        if (a[field] < b[field]) return sortOrder ? -1 : 1
        if (a[field] > b[field]) return sortOrder ? 1 : -1
        return 0
      })
      archivedLeads = [...archivedLeads]
    }

    function deleteArchivedLead (lead) {
      socket.emit('delete archived lead', lead)
      removeLeadFromList(lead)
    }

    function removeLeadFromList (leadToRemove) {
      const index = archivedLeads.findIndex(lead => lead.id === leadToRemove.id)
      archivedLeads.splice(index, 1)
      archivedLeads = [...archivedLeads]
    }

    function restoreLead (lead) {
      socket.emit('restore lead', lead)
      removeLeadFromList(lead)
    }

    let warningModal = false

</script>

<div class="col-start-1 col-span-10 p-5">
    <Table divClass="relative overflow-y-auto bg-gray-100 dark:bg-gray-800 h-4/5 ">
        <caption
                class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-900"
        >
            Archived leads
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                A list of archived leads, restore leads.
            </p>

            <div class="w-64 mt-3">
                <Input bind:value={searchQuery}
                       type="text" name="search" placeholder="Search"/>
            </div>

        </caption>

        <TableHead theadClass="dark:bg-gray-900 w-full">
            <TableHeadCell>
                <button on:click={() => sortLeads('id')} class="hover:bg-gray-300 py-3 px-2">ID</button>
            </TableHeadCell>
            <TableHeadCell>
                <button on:click={() => sortLeads('name')} class="hover:bg-gray-300 py-3 px-2">Name</button>
            </TableHeadCell>
            <TableHeadCell>
                <button on:click={() => sortLeads('email')} class="hover:bg-gray-300 py-3 px-2">Email</button>
            </TableHeadCell>
            <TableHeadCell>
                <button on:click={() => sortLeads('phone')} class="hover:bg-gray-300 py-3 px-2">Phone</button>
            </TableHeadCell>
            <TableHeadCell>
                <button on:click={() => sortLeads('category')} class="hover:bg-gray-300 py-3 px-2">Status</button>
            </TableHeadCell>
            <TableHeadCell/>
        </TableHead>

        <TableBody>
            {#each filteredLeads as lead, i}
                <TableRow lead={lead}>
                    <TableBodyCell>
                        <MenuButton class="dots-menu dark:text-white" vertical/>

                        <Dropdown>
                            <DropdownItem on:click={() => restoreLead(lead)}>
                                Restore
                            </DropdownItem>

                            <DropdownItem on:click={() => {
                              warningModal = true
                              leadCache = lead
                            }}>
                                Delete
                            </DropdownItem>
                        </Dropdown>
                    </TableBodyCell>
                </TableRow>
            {:else}
                <TableBodyRow>
                    <TableBodyCell>
                        No Data
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>

        <Modal bind:open={warningModal} size="xs" autoclose>
            <div class="text-center">
                <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none"
                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete
                    this product?</h3>

                <Button on:click={() => deleteArchivedLead(leadCache)} color="gray"
                        class="mr-2 text-gray-200 bg-gray-700 hover:bg-gray-900">Yes, I'm sure
                </Button>
                <Button class="text-gray-200 bg-gray-700 hover:bg-gray-900">No, cancel</Button>
            </div>
        </Modal>

    </Table>
</div>
