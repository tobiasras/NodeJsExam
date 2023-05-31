<script>
    import {Card, MenuButton, Dropdown, DropdownItem, Modal, Button, Label, Input, Select} from "flowbite-svelte";
    import LeadDropDownWrapper from "./LeadDropDownWrapper.svelte";
    import {tokenData} from "../stores/userStore.js";
    import {accessToken} from "../lib/accessToken.js";


    export let user;



    let roles = [
        {value: "admin", name: "Admin"},
        {value: "user", name: "User"},
    ]
    export let socket;

    let edit = false

    function submit() {
        const {_id, ...other} = user

        const data = {
            user: other
        }

        accessToken().then(value => {
            data.sender = value
            socket.emit("update user", data)
        })

        socket.on("error update user", () => {
            alert("No access to delete user")
        })
        edit = false
    }

</script>


<Card size="lg">
    {#if !edit}
        {#if user.role}
            <p>{user.role}</p>
        {/if}
    <div class="flex justify-between">

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.username}
        </h5>

        <LeadDropDownWrapper value={edit}>
            <DropdownItem on:click={() => edit = !edit }>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
        </LeadDropDownWrapper>
    </div>

    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        {user.name}
    </p>

    {:else }
    <form on:submit|preventDefault={submit} class=" space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Editing member: {user.username}
        </h3>
        <div class="grid grid-col-6 gap-5">


            <div class="col-start-1 col-span-3">
                <Label class="space-y-2 mb-3">
                    <span>Email</span>
                    <Input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            required
                            bind:value={user.email}
                    />
                </Label>

                <Label class="space-y-2 mb-3">
                    <span>Name</span>
                    <Input
                            bind:value={user.name}
                            type="text"
                            name="phone"
                            placeholder="151231232"
                            required
                    />
                </Label>
            </div>

            <div class="col-start-4 col-span-2 flex flex-col justify-between">
                <Label class="space-y-2 mb-3">
                    <span>Role</span>
                    <Select items={roles} bind:value={user.role} class="mb-6"/>
                </Label>
                <div class="flex justify-end">

                    <Button
                            on:click={() => edit = !edit}
                            class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                    >Decline
                    </Button>

                    <Button
                            class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                            type="submit">Save
                    </Button>
                </div>
            </div>
        </div>
    </form>
        {/if}
</Card>





