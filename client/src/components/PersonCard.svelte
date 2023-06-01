<script>
    import { Card, DropdownItem, Modal, Button, Label, Input, Select, Dropdown, MenuButton } from 'flowbite-svelte'
    import { userStore } from '../stores/userStore.js'
    import { accessToken } from '../lib/accessToken.js'
    import { BASE_URL } from '../stores/globalStore.js'

    export let user

    const roles = [
      { value: 'admin', name: 'Admin' },
      { value: 'user', name: 'User' }
    ]
    export let socket

    let edit = false

    function submit () {
      const { _id, ...other } = user

      const data = {
        user: other
      }

      accessToken().then(value => {
        data.sender = value
        socket.emit('update user', data)
      })

      socket.on('error update user', () => {
        alert('No access to delete user')
      })
      edit = false
    }

    async function deleteUser (user) {
      const res = await fetch(`${$BASE_URL}/api/users/${$userStore.company}/${user.username}`, {
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json',
          authorization: `bearer ${await accessToken()}`
        }
      })

      if (res.status === 204) {
        socket.emit('load teampage')
      }
    }

    let warningModal = false

</script>

<Card size="lg">
    <Modal bind:open={warningModal} size="xs" autoclose>
        <div class="text-center">
            <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete
                this product?</h3>

            <Button on:click={() => deleteUser(user)} color="gray"
                    class="mr-2 text-gray-200 bg-gray-700 hover:bg-gray-900">Yes, I'm sure
            </Button>
            <Button class="text-gray-200 bg-gray-700 hover:bg-gray-900">No, cancel</Button>
        </div>
    </Modal>

    {#if !edit}
        {#if user.role}
            <p>{user.role}</p>
        {/if}
    <div class="flex justify-between">

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.username}
        </h5>

        <MenuButton class="dots-menu dark:text-white" vertical/>

        <Dropdown>
            <DropdownItem on:click={() => { edit = !edit } } >Edit</DropdownItem>
            <DropdownItem on:click={() => { warningModal = true } }> Delete</DropdownItem>
        </Dropdown>

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
                            on:click={() => { edit = !edit } }
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
