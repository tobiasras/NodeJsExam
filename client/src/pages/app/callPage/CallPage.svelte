<script>
    import {useParams} from "svelte-navigator";
    import {onMount} from "svelte";
    import {Button, Input, Spinner, Textarea, Toast, Toggle} from "flowbite-svelte";
    import SvelteMarkdown from 'svelte-markdown'


    export let socket;

    let leadID;
    const params = useParams();
    params.subscribe((path) => {
        leadID = path.lead;
    });

    let lead;

    let isLoaded = false;

    onMount(() => {
        socket.emit("load call", leadID);

        socket.on("initial load call", (data) => {
            lead = data;
            console.log(lead);
            isLoaded = true;
        });
    });


    let toggleMdEditor = false

    function saveLead(){
        socket.emit(`update lead`, lead)
    }


</script>

<div class="col-start-1 col-span-10 p-5">
    {#if isLoaded}
        <div class="grid grid-cols-7 ">
            <div class=" col-span-4">
                <div class="p-3 text-gray-900 dark:text-gray-200">
                    <h1 class="text-4xl font-semibold">{lead.name}</h1>

                    <div>
                        <p>{lead.email}</p>
                        <p>{lead.email}</p>
                        <p>{lead.phone}</p>
                        <p>{lead.category}</p>
                    </div>

                </div>
            </div>

            <div class="col-span-3 ">


                <div class="mt-2  bg-gray-300  dark:bg-gray-800 pt-5 pl-5 dark:border-gray-700 border-gray-200 border-b pb-3">
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


    {:else}
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {/if}
</div>
