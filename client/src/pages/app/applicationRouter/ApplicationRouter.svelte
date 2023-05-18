<script>
  import { DarkMode, Listgroup, P } from "flowbite-svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import Dashboard from "../dashboardPage/DashboardPage.svelte";
  import DashboardPage from "../dashboardPage/DashboardPage.svelte";
  import TeamPage from "../teamPage/TeamPage.svelte";
  import UserPage from "../profilePage/profilePage.svelte";
  import ToolsPage from "../toolsPage/ToolsPage.svelte";
</script>

<main class=" bg-neutral-200 dark:bg-gray-700">
  <div class="grid grid-cols-12">
    <Router basepath="/app">
      <Route path="/dashboard">
        <DashboardPage />
      </Route>

      <Route path="/team">
        <TeamPage />
      </Route>

      <Route path="/tools">
        <ToolsPage />
      </Route>

      <Route path="/profile">
        <UserPage />
      </Route>
    </Router>

    <div
      class="col-start-11 col-span-2 bg-neutral-100 dark:bg-gray-800 h-[calc(100vh-4rem)] p-5"
    >
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold dark:text-neutral-50">Menu</h1>

        <DarkMode
          btnClass="dark:bg-neutral-100 bg-neutral-800 p-2 rounded-lg text-neutral-50 dark:text-gray-800"
        />
      </div>

      <Listgroup class="bg-neutral-200 mt-3">
        <Link to="/app/dashboard">
          <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
            <p class="material-symbols-outlined">team_dashboard</p>

            <p >
              Dashboard
            </p>
          </div>
        </Link>

        <Link to="/app/profile">
          <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
            <p class="material-symbols-outlined">phone</p>

            <p >
              Call
            </p>
          </div>
        </Link>


        

        <Link to="/app/tools">
          <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
            <p class="material-symbols-outlined">auto_fix_high</p>

            <p >
              Tools
            </p>
          </div>
        </Link>

        <Link to="/app/team">
          <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
            <p class="material-symbols-outlined">groups</p>

            <p >
              Team
            </p>
          </div>
        </Link>

        <Link to="/app/profile">
          <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
            <p class="material-symbols-outlined">person</p>

            <p >
              Profile
            </p>
          </div>
        </Link>
        
      








      </Listgroup>
    </div>
  </div>
</main>
