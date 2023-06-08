<script>
    import {
      Table, TableBody, TableHead, TableHeadCell, Button, Modal, TableBodyCell, TableBodyRow, DropdownItem, Input, MenuButton, Dropdown
    } from 'flowbite-svelte'
    import { onDestroy, onMount } from 'svelte'
    import LeadForm from '../../../components/LeadForm.svelte'
    import TableRow from '../../../components/TableRow.svelte'
    import { Link } from 'svelte-navigator'

    $: allLeads = []
    export let socket

    onMount(() => {
      updateLeadCache = ''
      socket.emit('load company data')
    })

    onDestroy(() => {
      socket.off('company data')
      socket.off('lead changes')
    })

    socket.on('company data', (data) => {
      if (data.company.leads) {
        allLeads = data.company.leads
      }
    })

    socket.on('lead changes', (leadChanges) => {
      if (leadChanges.type === 'update') {
        const keysFromUpdate = Object.keys(leadChanges.changes)
        for (let i = 0; i < keysFromUpdate.length; i++) {
          const indexOfElement = allLeads.findIndex(lead => lead.id === keysFromUpdate[i])
          if (indexOfElement > -1) {
            allLeads[indexOfElement] = leadChanges.changes[keysFromUpdate[i]]
          }
        }
        allLeads = [...allLeads]
      } else if (leadChanges.type === 'create') {
        console.log(leadChanges)
        allLeads.push(...leadChanges.changes)
        allLeads = [...allLeads]
      } else if (leadChanges.type === 'delete') {
        const indexOfElement = allLeads.findIndex(lead => lead.id === leadChanges.data.id)

        if (indexOfElement !== -1) {
          allLeads.splice(indexOfElement, 1)
        }
        allLeads = [...allLeads]
      }
    })

    // MODALS
    let modalCreateLead = false
    let modalUpdateLead = false

    let submitCreateLead
    let submitUpdateLead
    let updateLeadCache

    function modalShowCreateLead () {
      modalCreateLead = true
    }

    function saveModalCreate () {
      if (submitCreateLead('create')) {
        modalCreateLead = false
      }
    }

    function modalShowUpdateLead (lead) {
      updateLeadCache = lead
      modalUpdateLead = true
    }

    function saveModalUpdate () {
      if (submitUpdateLead('update')) {
        modalUpdateLead = false
      }
    }

    function deleteLead (lead) {
      socket.emit('archive lead', lead)
    }

    let searchQuery = ''

    $: filteredLeads = allLeads.filter(lead =>
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
</script>

<div class="col-start-1 col-span-10 px-5 pt-5 h-[calc(100vh-5rem)]">

    <!-- CREATE LEAD MODAL-->
    <Modal bind:open={modalCreateLead} size="lg" autoclose={false} class="w-full">
        <LeadForm
                bind:submit={submitCreateLead}
                bind:socket={socket}>
            <div class="flex justify-end">
                <Button on:click={() => { modalCreateLead = false }}
                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                >Abort
                </Button>

                <Button on:click={saveModalCreate}
                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                >Save
                </Button>
            </div>
        </LeadForm>
    </Modal>

    <!-- UPDATE LEAD MODAL-->
    <Modal bind:open={modalUpdateLead} size="lg" autoclose={false} class="w-full">
        <LeadForm bind:socket={socket}
                  bind:submit={submitUpdateLead}
                  bind:lead={updateLeadCache}
                  headerTitle="Updating:">

            <div class="flex justify-end">
                <Button on:click={() => { modalUpdateLead = false }}
                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                >Decline
                </Button>

                <Button on:click={saveModalUpdate}
                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                >Save
                </Button>
            </div>
        </LeadForm>
    </Modal>

    <Table divClass="relative overflow-y-auto bg-gray-100 dark:bg-gray-800 h-4/5 ">
        <caption
                class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-900"
        >
            All Leads
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Here is a list of all the leads in the company
            </p>

            <div class="w-64 mt-3">
                <Input bind:value={searchQuery}
                       type="text" name="search" placeholder="Search"/>
            </div>

        </caption>

        <TableHead theadClass="dark:bg-gray-900 w-full">
            <TableHeadCell>
                <button class="hover:bg-gray-300 py-3 px-2">ID</button>
            </TableHeadCell>
            <TableHeadCell>
                <button class="hover:bg-gray-300 py-3 px-2">Name</button>
            </TableHeadCell>
            <TableHeadCell>
                <button class="hover:bg-gray-300 py-3 px-2">Email</button>
            </TableHeadCell>
            <TableHeadCell>
                <button class="hover:bg-gray-300 py-3 px-2">Phone</button>
            </TableHeadCell>
            <TableHeadCell>
                <button class="hover:bg-gray-300 py-3 px-2">Status</button>
            </TableHeadCell>
            <TableHeadCell/>
        </TableHead>

        <TableBody>
            {#each filteredLeads as lead, i}
                <TableRow lead={lead}>
                    <TableBodyCell>
                        <MenuButton class="dots-menu dark:text-white" vertical/>
                        <Dropdown>
                            <DropdownItem on:click={() => { modalShowUpdateLead(lead) }}>
                                Edit
                            </DropdownItem>
                            <DropdownItem on:click={() => { deleteLead(lead) }}>
                                Archive
                            </DropdownItem>

                            <Link to={`/app/call/${lead.id}`}>
                                <DropdownItem>
                                    Open
                                </DropdownItem>
                            </Link>
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
    </Table>

    <div class="absolute bottom-20 left-0 right-5 w-10/12 flex justify-end mb-5">
        <button class="absolute mr-10 bg-[#4285F4] hover:bg-[#2557D6]/90 p-5 rounded-full w-16 h-16 flex-col justify-center items-center"
                on:click={modalShowCreateLead}>
            <p class=" text-3xl mb-1 font-bold text-white ">
                +
            </p>
        </button>

    </div>

</div>
