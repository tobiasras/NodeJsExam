<script>
  import {
    Button,
    Modal,
    Label,
    Input,
    Spinner,
    Toast
  } from 'flowbite-svelte'
  import { BASE_URL } from '../stores/globalStore'
  import { tokenData, userStore } from '../stores/userStore'
  import { blur } from 'svelte/transition'
  async function login () {
    spinner = true

    const body = JSON.stringify({
      username,
      password
    })

    let result

    try {
      result = await fetch(`${$BASE_URL}/api/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body
      })
    } catch (e) {
      error('Could not connect to server')
      spinner = false
      return
    }

    spinner = false

    switch (result.status) {
      case 200:
        success(await result.json())
        break

      case 401:
        error('could not authenticate user')
        break

      case 429:
        error('too many request')
        break
      default:
    }
  }

  function onClose () {
    username = ''
    password = ''
    formModal = false
  }

  function success (bodyFromResponse) {
    toastColor = 'green'
    toastMessage = 'Success'
    toast = true

    const { username, company, role } = bodyFromResponse
    userStore.set({ username, company, role })

    const { accessToken, refreshToken, expires } = bodyFromResponse.token

    tokenData.set({
      expireDate: new Date(expires),
      accessToken,
      refreshToken
    })

    onClose()
  }

  function error (errorMessage) {
    toastColor = 'red'
    toastMessage = errorMessage
    toast = true

    hideToast()
  }

  let counter = 5
  function hideToast () {
    if (--counter > 0) { return setTimeout(hideToast, 1000) }
    toast = false
    counter = 5
  }

  export let formModal = false

  let toast = false
  let toastColor
  let toastMessage
  let username = ''
  let password = ''
  let spinner = false
</script>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Login to coldcanvas
    </h3>

    {#if toast}
      <Toast transition={blur}
        divClass="w-full p-3 text-center"
        bind:color={toastColor}
        simple={true}

      >
        {toastMessage}
      </Toast>
    {/if}

    <Label class="space-y-2">
      <span>Username</span>
      <Input
        bind:value={username}
        type="text"
        name="username"
        placeholder="username"
        required
      />
    </Label>

    <Label class="space-y-2">
      <span>Your password</span>
      <Input
        type="password"
        name="password"
        bind:value={password}
        placeholder="•••••"
        required
      />
    </Label>

    <div class="flex justify-between">
      {#if spinner}
        <Spinner />
      {:else}
        <div />
      {/if}

      <div class="flex justify-end">
        <Button
          on:click={onClose}
          class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
          >Close</Button
        >

        <Button
          class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 "
          on:click={login}>Login</Button
        >
      </div>
    </div>
  </form>
</Modal>
