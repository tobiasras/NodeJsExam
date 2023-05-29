<script>
    import {
        Table,
        TableBody,
        TableHead,
        TableHeadCell,
        Button,
        Spinner,
        Card, Modal, TableBodyCell, TableBodyRow, DropdownItem, Dropdown, MenuButton
    } from "flowbite-svelte";
    import io from "socket.io-client";
    import {user} from "../../../stores/userStore";
    import {BASE_URL} from "../../../stores/globalStore";
    import {accessToken} from "../../../lib/accessToken.js";
    import {onMount} from "svelte";
    import LeadForm from "../../../components/LeadForm.svelte";
    import TableRow from "../../../components/TableRow.svelte";
    import {Link} from "svelte-navigator";
    import LeadDropDownWrapper from "../../../components/LeadDropDownWrapper.svelte";

    $: allLeads = []
    let socket

    onMount(async () => {
        isLoading = true

        socket = io(`${$BASE_URL}/${$user.company}`, {
            auth: {
                token: await accessToken()
            }
        })

        socket.on("initial load", (data) => {
            if (data.company.leads) {
                allLeads = data.company.leads
            }
        })

        socket.on("connect_error", () => {
            isLoading = false
            errorSocketOnLoad = true
        })


        socket.on("lead changes", (leadChanges) => {
            switch (leadChanges.type) {
                case "update":

                    console.log(123)

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

        isLoading = false
    })


    let isLoading = true
    let errorSocketOnLoad = false


    // MODALS
    let modalCreateLeadIsShowing = false;

    function modalShowCreateLead() {
        modalCreateLeadIsShowing = true
    }

    function modalCloseCreateLead() {
        modalCreateLeadIsShowing = false
    }

    let createLeadFunc

    function saveModalCreate() {
        createLeadFunc()
        modalUpdateLead = false
    }

    let modalUpdateLead = false;
    let updateLead
    let updateLeadCache

    function modalShowUpdateLead(lead) {
        updateLeadCache = lead
        modalUpdateLead = true
    }

    function modalCloseUpdateLead() {
        updateLeadCache = ""
        modalUpdateLead = false
    }

    function saveModalUpdate() {
        updateLead()
        modalUpdateLead = false
    }

    function deleteLead(lead) {
        socket.emit("delete lead", lead)
    }
</script>


<div class="col-start-1 col-span-10 px-5 pt-5 h-[calc(100vh-5rem)]">

    {#if !isLoading}

        {#if !errorSocketOnLoad}
            <!-- CREATE LEAD MODAL-->
            <Modal bind:open={modalCreateLeadIsShowing} size="lg" autoclose={false} class="w-full">

                <LeadForm bind:createLead={createLeadFunc}
                          bind:socket={socket}>

                    <div class="flex justify-end">
                        <Button on:click={modalCloseCreateLead}
                                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                        >Decline
                        </Button>

                        <Button
                                on:click={saveModalCreate}
                                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                        >Save
                        </Button>
                    </div>
                </LeadForm>
            </Modal>

            <!-- UPDATE LEAD MODAL-->
            <Modal bind:open={modalUpdateLead} size="lg" autoclose={false} class="w-full">
                <LeadForm bind:socket={socket}
                          bind:updateLead={updateLead}
                          bind:lead={updateLeadCache}
                          headerTitle="Updating:">

                    <div class="flex justify-end">
                        <Button on:click={modalCloseUpdateLead}
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

        {:else }
            <div class="flex justify-center items-center">
                <Card size="lg">
                    <div class="flex justify-center p-5">
                        <p class="material-symbols-outlined text-9xl">
                            priority_high
                        </p>
                    </div>
                    <div class="p-5 text-center">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Could not
                            connect
                            to
                            socket</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                            chronological
                            order.
                        </p>
                    </div>
                    <div class="text-center">
                        <Link to="/">
                            <Button
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-5">
                                Frontpage
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600">
                                Frontpage
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        {/if}


    {:else }
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {/if}


</div>
