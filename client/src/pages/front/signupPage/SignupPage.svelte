<script>
    import { Button, Input, Label, Spinner, Toast } from 'flowbite-svelte'
    import { Link } from 'svelte-navigator'
    import { blur } from 'svelte/transition'
    import { BASE_URL } from '../../../stores/globalStore.js'

    let isLoading = false
    let toast = false
    let toastColor
    let toastMessage

    const companySignUp = {}

    let password1 = ''
    let password2 = ''

    async function submit () {
      isLoading = true

      if (password1 !== password2 && password1.length > 8) {
        toastColor = 'red'
        toastMessage = 'not valid password'
        toast = true
        isLoading = false
        return
      }

      const checkUsername = await fetch(`${$BASE_URL}/api/users?username=${companySignUp.username}`)

      if (checkUsername.status !== 204) {
        toastColor = 'red'
        toastMessage = 'dublicate username'
        toast = true
        isLoading = false
        return
      }

      const createCompany = await fetch(`${$BASE_URL}/api/companies`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName: companySignUp.companyName,
          cvr: companySignUp.cvr,
          user: {
            company_name: companySignUp.companyName,
            name: companySignUp.name,
            username: companySignUp.username,
            password: password1,
            email: companySignUp.email
          }
        })
      })

      if (createCompany.status === 400) {
        const error = await createCompany.json()
        if (error.code === 11000) {
          toastColor = 'red'
          toastMessage = 'Company already exist'
          toast = true
          isLoading = false
        }
      } else if (createCompany.status !== 204) {
        toastColor = 'red'
        toastMessage = 'Could not create company'
        toast = true
        isLoading = false
      } else {
        toastColor = 'green'
        toastMessage = 'company created, login and access resources'
        toast = true
        isLoading = false
      }
    }

</script>

<main class="grid grid-cols-7 py-24 px-10 dark:bg-gray-700 bg-gray-200 dark:text-gray-300 text-gray-700 h-[calc(100vh-4rem)] ">
    <div class="col-start-2 col-span-3 rounded">

        <form on:submit|preventDefault={submit}
              class="flex flex-col justify-between h-3/4 bg-gray-300 dark:bg-gray-800 p-5 rounded">
            <div>
                <div class="p-3">
                    <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-200">Signup company</h1>
                    <p class="text-gray-900 dark:text-gray-200">Edit, delte and change members type</p>
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

                <div class="grid grid-cols-2 gap-4 mb-4 p-3">
                    <div class="col-span-1">
                        <Label for='name' class="mb-2">Company name</Label>
                        <Input type='text' bind:value={companySignUp.companyName} placeholder='Company name'/>
                    </div>
                    <div>
                        <Label for='brand' class='mb-2'>Email</Label>
                        <Input type='email' bind:value={companySignUp.email} placeholder='name@mail.com'/>
                    </div>
                    <div>
                        <Label for='brand' class='mb-2'>CVR</Label>
                        <Input type='text' bind:value={companySignUp.cvr} placeholder='213145123'/>
                    </div>

                </div>

                <div class="px-4 ">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200">User details:</h2>
                    <p class="text-gray-900 dark:text-gray-200">This will be used for ur account details</p>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4 p-3">
                    <div>
                        <Label for='name' class="mb-2">Username</Label>
                        <Input type='text' bind:value={companySignUp.username} placeholder='Type product name'/>
                    </div>
                    <div>
                        <Label for='brand' class='mb-2'>Name</Label>
                        <Input type='text' bind:value={companySignUp.name} placeholder='Jens Jensen'/>
                    </div>
                </div>

                <div class="px-4 ">
                    <p class="text-gray-700 dark:text-gray-400 text-sm">Req: [ password must be longer than 8 ]</p>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4 p-3">
                    <div>
                        <Label for='brand' class='mb-2'>Password</Label>
                        <Input type='password' bind:value={password1} placeholder='Password'/>
                    </div>

                    <div>
                        <Label for='brand' class='mb-2'>Password [ Should be the same ]</Label>
                        <Input type='password' bind:value={password2} placeholder='Same password'/>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-end">
                <div class=" grid grid-cols-2 gap-5 w-1/2 ">

                    <Button type="sumbit"
                            class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900  ">
                        <p class="text-gray-800 dark:text-gray-200">Signup</p>
                    </Button>

                    <Link to="/">
                        <Button class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900  ">
                            <p class="text-gray-800 dark:text-gray-200">Go back</p>
                        </Button>
                    </Link>

                </div>

                <div>

                    {#if isLoading}
                        <Spinner></Spinner>
                    {/if}

                </div>
            </div>

        </form>

    </div>

</main>
