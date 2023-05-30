<script>
    import {
        Table,
        TableBody,
        TableHead,
        TableHeadCell,
        Button,
        Modal, TableBodyCell, TableBodyRow, DropdownItem
    } from "flowbite-svelte";
    import {onMount} from "svelte";
    import LeadForm from "../../../components/LeadForm.svelte";
    import TableRow from "../../../components/TableRow.svelte";
    import LeadDropDownWrapper from "../../../components/LeadDropDownWrapper.svelte";
    import {Link} from "svelte-navigator";

    $: allLeads = []
    export let socket


    onMount(() => {
        updateLeadCache = ""
        socket.emit("load dashboard")
    })


    socket.on("initial load dashboard", (data) => {
        console.log(data.company.leads)
        allLeads = data.company.leads
    })


    socket.on("lead changes", (leadChanges) => {
        switch (leadChanges.type) {
            case "update":
                const keysFromUpdate = Object.keys(leadChanges.changes);
                for (let i = 0; i < keysFromUpdate.length; i++) {
                    const indexOfElement = allLeads.findIndex(lead => lead.id === keysFromUpdate[i]);
                    if (indexOfElement > -1) {
                        allLeads[indexOfElement] = leadChanges.changes[keysFromUpdate[i]]
                    }
                }
                allLeads = [...allLeads];
                break;
            case "create":
                console.log(leadChanges)
                allLeads.push(...leadChanges.changes)
                allLeads = [...allLeads];
                break
            case "delete":
                const indexOfElement = allLeads.findIndex(lead => lead.id === leadChanges.data.id);
                allLeads.splice(indexOfElement, 1)
                console.log(indexOfElement)
                allLeads = [...allLeads];
                break
        }
    })


    // MODALS
    let modalCreateLead = false;
    let modalUpdateLead = false;

    let submitCreateLead
    let submitUpdateLead

    let updateLeadCache

    function modalShowCreateLead() {
        modalCreateLead = true
    }

    function saveModalCreate() {
        if (submitCreateLead("create")) {
            modalCreateLead = false
        }
    }

    function modalShowUpdateLead(lead) {
        updateLeadCache = lead
        modalUpdateLead = true
    }

    function saveModalUpdate() {
        if (submitUpdateLead("update")) {
            modalUpdateLead = false
        }
    }

    function deleteLead(lead) {
        socket.emit("delete lead", lead)
    }
</script>


<div class="col-start-1 col-span-10 px-5 pt-5 h-[calc(100vh-5rem)]">

    <!-- CREATE LEAD MODAL-->
    <Modal bind:open={modalCreateLead} size="lg" autoclose={false} class="w-full">

        <LeadForm bind:submit={submitCreateLead}
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
            Our products
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Browse a list of Flowbite products designed to help you work and play,
                stay organized, get answers, keep in touch, grow your business, and
                more.
            </p>

        </caption>
        <TableHead theadClass="dark:bg-gray-900 w-full">
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell/>
        </TableHead>

        <TableBody>
            {#each allLeads as lead (lead.id)}
                <TableRow bind:lead={lead}>

                    <TableBodyCell>
                        <LeadDropDownWrapper value={lead}>
                            <DropdownItem on:click={() => {modalShowUpdateLead(lead)}}>
                                Edit
                            </DropdownItem>
                            <DropdownItem on:click={() => {deleteLead(lead)}}>
                                Delete
                            </DropdownItem>

                            <Link to={`/app/call/${lead.id}`}>
                                <DropdownItem>
                                    Call
                                </DropdownItem>
                            </Link>
                        </LeadDropDownWrapper>
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
