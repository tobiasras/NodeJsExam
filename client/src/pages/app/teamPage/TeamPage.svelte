<script>
    import {
        Button,
        Modal,
        Label,
        Input,
        Select, Spinner,
    } from "flowbite-svelte";
    import PersonCard from "../../../components/PersonCard.svelte";
    import {onDestroy, onMount} from "svelte";

    export let socket
    let users
    let isLoading = true
    onMount(() => {
        socket.emit("load teampage")
        socket.on("initial load teampage", (data) => {
            users = data
            isLoading = false
        })
    })

    onDestroy(() => {
        socket.off("initial load teampage")
    });



    function createUser() {

    }



</script>

<div class="col-start-1 col-span-9 p-5">
    <div class="p-3 text-gray-900 dark:text-gray-200">
        <h1 class="text-2xl font-semibold">Team members</h1>
        <p>Edit, delte and change members type</p>
    </div>

    <div>
        {#if !isLoading}
            <div class="grid grid-cols-3 gap-3">
                {#each users as user (user._id)}
                        <PersonCard socket={socket} user={user}/>
                {/each}
            </div>
        {:else }
            <div class="flex justify-center items-center h-full">
                <Spinner size="32"/>
            </div>
        {/if}


    </div>

    <div class="absolute bottom-20 left-0 right-5 w-10/12 flex justify-end mb-5">
        <button class="absolute mr-10 bg-[#4285F4] hover:bg-[#2557D6]/90 p-5 rounded-full w-16 h-16 flex-col justify-center items-center"
                on:click={createUser}>
            <p class=" text-3xl mb-1 font-bold text-white ">
                +
            </p>
        </button>

    </div>

</div>
