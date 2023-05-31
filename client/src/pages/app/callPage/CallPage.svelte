<script>
    import {useParams} from "svelte-navigator";
    import {onDestroy} from "svelte";
    import {Button, Card, DropdownItem, Input, Modal, Spinner, Textarea, Toast, Toggle} from "flowbite-svelte";
    import SvelteMarkdown from 'svelte-markdown'
    import LeadDropDownWrapper from "../../../components/LeadDropDownWrapper.svelte";
    import LeadForm from "../../../components/LeadForm.svelte";


    export let socket;

    let leadID;
    const params = useParams();
    params.subscribe((path) => {
        leadID = path.lead;
    });

    let lead;

    let isLoaded = false;

    let otherFields


    socket.emit("load call", leadID);

    socket.on("initial load call", (data) => {
        lead = data;
        const {description, name, email, category, phone, id, ...other} = lead
        otherFields = other

        isLoaded = true;
    });

    onDestroy(() => {
        socket.off("initial load call")
    });


    let toggleMdEditor = true

    function saveLead() {
        socket.emit(`update lead`, lead)
        toggleMdEditor = true
    }

    // MODALS
    let modalUpdateLead = false;

    let submitUpdateLead

    let updatedLead

    function modalShowUpdateLead() {
        updatedLead = lead
        modalUpdateLead = true
    }

    function saveModalUpdate() {
        if (submitUpdateLead("update")) {
            modalUpdateLead = false
            socket.emit("load call", leadID);
        }
    }

    function deleteLead(lead) {
        socket.emit("delete lead", lead)
    }


</script>

<div class="col-start-1 col-span-10 p-5">
    {#if isLoaded}
        <div class="grid grid-cols-7 ">
            <div class=" col-span-4">

                <Card size="lg">
                    <div class="justify-between flex items-end">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Name: {lead.name}
                        </h5>

                        <LeadDropDownWrapper value={lead}>
                            <DropdownItem on:click={() => {modalShowUpdateLead(lead)}}>
                                Edit
                            </DropdownItem>

                            <DropdownItem on:click={() => {deleteLead(lead)}}>
                                Delete
                            </DropdownItem>

                        </LeadDropDownWrapper>
                    </div>


                    <div class="py-3 mt-3 border-t border-gray-300 dark:border-gray-700">

                        <div class="flex justify-between mb-2">
                            <p>Phone</p>
                            <p>{lead.phone}</p>
                        </div>

                        <div class="flex justify-between mb-2">
                            <p>Email</p>
                            <p>{lead.email}</p>
                        </div>

                        <div class="flex justify-between mb-2">
                            <p>Category</p>
                            <p>{lead.category}</p>
                        </div>

                        {#each Object.keys(otherFields) as field, i}
                            <div class="flex justify-between mb-2">
                                <p>{field}</p>
                                <p>{otherFields[field]}</p>
                            </div>
                        {/each}
                    </div>
                </Card>

                <div class="p-3 text-gray-900 dark:text-gray-200">
                    <h1 class="text-4xl font-semibold"></h1>
                </div>
            </div>

            <div class="col-span-3 ">
                <div class="mt-2 rounded-t  bg-gray-300  dark:bg-gray-800 pt-5 pl-5 dark:border-gray-700 border-gray-200 border-b pb-3">
                    <div class="flex justify-between">
                        <h2 class="font-bold dark:text-gray-200">Description:</h2>

                        <div class="flex justify-between">
                            <p class="pr-3 font-bold dark:text-gray-200">Edit</p>

                            <Toggle on:click={() => {toggleMdEditor = !toggleMdEditor}}></Toggle>
                        </div>
                    </div>
                </div>
                <div class="description bg-gray-300  dark:bg-gray-800 p-5 h-[calc(60vh-5rem)] overflow-y-scroll rounded-b">

                    {#if toggleMdEditor}
                        <SvelteMarkdown source={lead.description}/>
                    {:else}
                        <Textarea bind:value="{lead.description}" rows="28">

                        </Textarea>

                        <div class="flex justify-end">
                            <Button on:click={saveLead}
                                    class=" dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mt-5"
                            >Save
                            </Button>
                        </div>

                    {/if}

                </div>
            </div>


        </div>

        <!-- UPDATE LEAD MODAL-->
        <Modal bind:open={modalUpdateLead} size="lg" autoclose={false} class="w-full">
            <LeadForm bind:socket={socket}
                      bind:submit={submitUpdateLead}
                      bind:lead={updatedLead}
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


    {:else}
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {/if}
</div>
