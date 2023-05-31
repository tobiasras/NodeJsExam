<script>
    import {
        Button,
        Modal,
        Label,
        Input,
        Select, Spinner, Toast,
    } from "flowbite-svelte";
    import PersonCard from "../../../components/PersonCard.svelte";
    import {onDestroy, onMount} from "svelte";
    import {blur} from "svelte/transition";
    import {Link} from "svelte-navigator";
    import {BASE_URL} from "../../../stores/globalStore.js";
    import {accessToken} from "../../../lib/accessToken.js";
    import {userStore} from "../../../stores/userStore.js";

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
        createModal = true
    }

    let createModal = false;


    let toast = false
    let toastColor
    let toastMessage

    let userSignUp = {}

    let password1 = "skc69ewg"
    let password2 = "skc69ewg"

    let isLoadingCreateUser = false


    async function submit() {
        isLoadingCreateUser = true
        if (password1 !== password2 && password1.length > 8) {
            toastColor = "red"
            toastMessage = "not valid password"
            toast = true
            isLoadingCreateUser = false
            return
        }
        const checkUsername = await fetch(`${$BASE_URL}/api/users?username=${userSignUp.username}`,{
            headers: {
                    "authorization": `bearer ${await accessToken()}`
            }
        })

        if (checkUsername.status !== 204) {
            toastColor = "red"
            toastMessage = "dublicate username"
            toast = true
            isLoadingCreateUser = false
            return
        }

        const createUser = await fetch(`${$BASE_URL}/api/users/${$userStore.company}`, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "authorization": `bearer ${await accessToken()}`
            },
            body: JSON.stringify({
                company_name: $userStore.company,
                name: userSignUp.name,
                username: userSignUp.username,
                password: password1,
                email: userSignUp.email
            })
        })

        if (createUser.status !== 200) {
            toastColor = "red"
            toastMessage = "Could not create user"
            toast = true
            isLoading = false
        } else {
            toastColor = "green"
            toastMessage = "company created, login and access resources"
            toast = true
            isLoading = false
        }

        socket.emit("load teampage")
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


    <Modal bind:open={createModal} size="md" autoclose={false} class="w-full">
        <form on:submit|preventDefault={submit}
              class="flex flex-col justify-between h-3/4 bg-gray-300 dark:bg-gray-800 rounded">
            <div>
                <div class="">
                    <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-200">User details:</h1>
                    <p class="text-gray-900 dark:text-gray-200">This will be used for the account details</p>

                    {#if toast}
                        <Toast transition={blur}
                               divClass="w-full mt-5 text-center p-3"
                               bind:color={toastColor}
                               simple={true}
                        >
                            {toastMessage}
                        </Toast>
                    {/if}
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4 mt-8">
                    <div>
                        <Label for='name' class="mb-2">Username</Label>
                        <Input type='text' bind:value={userSignUp.username} placeholder='Type product name'/>
                    </div>
                    <div>
                        <Label for='brand' class='mb-2'>Name</Label>
                        <Input type='text' bind:value={userSignUp.name} placeholder='Jens Jensen'/>
                    </div>
                </div>

                <div class="grid gap-4 mb-4 ">
                    <div>
                        <Label for='brand' class='mb-2'>Email</Label>
                        <Input type='email' bind:value={userSignUp.email} placeholder='name@mail.com'/>
                    </div>
                </div>



                <div class="grid gap-4 mb-4 w-1/2 ">
                    <div>
                        <Label for='brand' class='mb-2'>Password  [ password must be longer than 8 ]</Label>
                        <Input type='password' bind:value={password1} placeholder='Password'/>
                    </div>

                    <div>
                        <Label for='brand' class='mb-2'>Password [ Should be the same ]</Label>
                        <Input type='password' bind:value={password2} placeholder='Same password'/>
                    </div>
                </div>
            </div>


            <div class="flex justify-between items-end mt-5">
                <div class=" grid grid-cols-2 gap-5 w-1/2 ">

                    <Button type="sumbit"
                            class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900  ">
                        <p class="text-gray-800 dark:text-gray-200">Signup</p>
                    </Button>


                    <Button on:click={() => createModal = false}
                            class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900  ">
                        <p class="text-gray-800 dark:text-gray-200">Go back</p>
                    </Button>


                </div>

                <div>

                    {#if isLoading}
                        <Spinner></Spinner>
                    {/if}

                </div>
            </div>

        </form>
    </Modal>


    <div class="absolute bottom-20 left-0 right-5 w-10/12 flex justify-end mb-5">
        <button class="absolute mr-10 bg-[#4285F4] hover:bg-[#2557D6]/90 p-5 rounded-full w-16 h-16 flex-col justify-center items-center"
                on:click={createUser}>
            <p class=" text-3xl mb-1 font-bold text-white ">
                +
            </p>
        </button>
    </div>

</div>
