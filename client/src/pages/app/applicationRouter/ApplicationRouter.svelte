<script>
    import { Button, Card, Spinner } from 'flowbite-svelte'
    import { Router, Route, Link, useNavigate } from 'svelte-navigator'
    import DashboardPage from '../dashboardPage/DashboardPage.svelte'
    import TeamPage from '../teamPage/TeamPage.svelte'
    import ToolsPage from '../toolsPage/ToolsPage.svelte'
    import CallPage from '../callPage/CallPage.svelte'
    import { userStore } from '../../../stores/userStore'
    import ArchivePage from '../archivePage/ArchivePage.svelte'
    import io from 'socket.io-client'
    import { BASE_URL } from '../../../stores/globalStore.js'
    import { accessToken } from '../../../lib/accessToken.js'
    import NavMenu from '../../../components/NavMenu.svelte'

    if (!$userStore) {
      const navigate = useNavigate()
      navigate('/')
    }
    async function connectSocket () {
      const token = await accessToken()
      return new Promise((resolve, reject) => {
        const socket = io(`${$BASE_URL}/${$userStore.company}`, {
          auth: {
            token
          }
        })

        socket.on('connect_error', function (err) {
          reject(new Error('Could not connect to socket: ' + err))
        })

        socket.on('connect', () => {
          resolve(socket)
        })
      })
    }

    function reload () {
      location.reload()
    }

    const promise = connectSocket()
</script>

<main class=" bg-neutral-200 dark:bg-gray-700">
    <div class="grid grid-cols-12">

    {#await promise}
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {:then socket}
        <Router primary={false}>
            <Route path="/dashboard">
                <DashboardPage socket={socket}/>
            </Route>

            <Route path="/team">
                <TeamPage socket={socket} />
            </Route>

            <Route path="/tools">
                <ToolsPage/>
            </Route>

            <Route path="/call/:lead">
                <CallPage socket={socket}/>
            </Route>

            <Route path="/archive">
                <ArchivePage socket={socket}/>
            </Route>
        </Router>
    {:catch error}
        <div class="col-span-10 flex justify-center items-center">
            <Card size="lg">
                <div class="flex justify-center p-5">
                    <p class="material-symbols-outlined text-9xl">
                        priority_high
                    </p>
                </div>
                <div class="p-5 text-center">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Could not
                        Connection timed out</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Reload page
                    </p>
                </div>
                <div class="text-center">
                    <Link to="/">
                        <Button
                                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-5">
                            Frontpage
                        </Button>
                    </Link>
                        <Button on:click={reload}
                                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600">
                            Reload page
                        </Button>
                </div>
            </Card>
        </div>
    {/await}

        <NavMenu/>
    </div>

</main>
