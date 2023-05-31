<script>
  import { Link } from "svelte-navigator";
  import {Button, DarkMode, Dropdown, DropdownItem} from "flowbite-svelte";
  import LoginModal from "./LoginModal.svelte";
  import { userStore } from "../stores/userStore";
  import UserInfoNav from "./UserInfoNav.svelte";  

  let loginModal
</script>

<header class="h-16 text-gray-400 font-semibold">
  <nav class="fixed top-0 z-30 w-full p-3 bg-gray-300 dark:bg-gray-600">
    <div class="grid grid-cols-8 items-center pl-10">
      <div class="col-start-1 col-span-2">
        <Link to="/">
            <h1 class="text-xl text-gray-800 dark:text-gray-100 font-extrabold">COLDCANVAS</h1>
        </Link>
      </div>

      <div class="col-start-5 col-span-2 ">
        <ul class="flex justify-start">
          <li>
            <Link to="/">
              <Button class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800  mr-3   h-full ">
                <p class="text-gray-800 dark:text-gray-200">About</p>
              </Button>
            </Link>
          </li>

          <li class="mr-3">
            <Link to="/signup">
              <Button class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800   h-full ">
                <p class="text-gray-800 dark:text-gray-200">Signup company</p>
              </Button>
            </Link>

          <li >
            <Button class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-400  dark:hover:bg-gray-800 ">
              <p class=" text-gray-800 dark:text-gray-200 align-middle text-md">
                Application
              </p>

              <p class="material-symbols-outlined text-gray-800 dark:text-gray-200">
                expand_more
              </p>
            </Button>

            <Dropdown class="bg-gray-200 dark:bg-gray-700  w-32">
              <Link to="/app/dashboard">
                <DropdownItem class="hover:bg-gray-400">
                  <p>Dashboard</p>
                </DropdownItem>
              </Link>

              <Link to="/app/team">
                <DropdownItem class="hover:bg-gray-400">
                  <p>Teams</p>
                </DropdownItem>
              </Link>

              <Link to="/app/tools">
                <DropdownItem class="hover:bg-gray-400">
                  <p>Tools</p>
                </DropdownItem>
              </Link>

              <Link to="/app/profile">
                <DropdownItem class="hover:bg-gray-400">
                  <p>Profile</p>
                </DropdownItem>
              </Link>
            </Dropdown>
          </li>

        </ul>


      </div>

      <div class="ml-5 col-start-8 col-span-1">
        <div class="flex justify-end">
          {#if !$userStore}
          <Button class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-400  dark:hover:bg-gray-800 "
            on:click={() => (loginModal = true)}
          >
            <p class="dark:text-neutral-50 text-gray-800">Login</p>
          </Button>

          <LoginModal bind:formModal={loginModal} />
          {:else}
            <UserInfoNav />
          {/if}

          <DarkMode btnClass="dark:bg-neutral-100 ml-2 w-10  bg-neutral-800 p-2 rounded-lg text-neutral-50 dark:text-gray-800" />
        </div>









      </div>
    </div>
  </nav>
</header>
