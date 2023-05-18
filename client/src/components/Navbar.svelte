<script>
  import { Link } from "svelte-navigator";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
</script>

<header class="h-16 text-secondary-400 font-semibold">
  <nav class="fixed top-0 z-30 w-full p-3 bg-secondary-400">
    <div class="grid grid-cols-8 items-center pl-10">
      <div class="col-start-1 col-span-2">
        <a class="text-xl text-primary-200 font-extrabold" href="/">
          <h1 class=" ">COLDCANVAS</h1>
        </a>
      </div>

      <div class="col-start-5 col-span-2">
        <ul class="flex justify-start">
          <li>
            <Link to="/">
              <Button class="bg-primary-200 hover:bg-primary-300  mr-3 h-full ">
                <p class="text-secondary-400">Docs</p>
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/app">
              <Button
                class="bg-primary-200 hover:bg-primary-300   mr-3 h-full "
              >
                <p class="text-secondary-400">Pricing</p>
              </Button>
            </Link>
          </li>

          <li>
            <Button class="bg-primary-200 hover:bg-primary-300">
              <p class=" text-secondary-400 align-middle text-md">
                Application
              </p>

              <p class="material-symbols-outlined text-secondary-300">
                expand_more
              </p>
            </Button>

            <Dropdown class=" bg-secondary-300 text-primary-300 w-32">
              <Link to="/app/dashboard">
                <DropdownItem class="hover:bg-secondary-400">
                  <p>Dashboard</p>
                </DropdownItem>
              </Link>

              <Link to="/app/team">
                <DropdownItem class="hover:bg-secondary-400">
                  <p>Teams</p>
                </DropdownItem>
              </Link>

              <Link to="/app/tools">
                <DropdownItem class="hover:bg-secondary-400">
                  <p>Tools</p>
                </DropdownItem>
              </Link>

              <Link to="/app/profile">
                <DropdownItem class="hover:bg-secondary-400">
                  <p>Profile</p>
                </DropdownItem>
              </Link>
            </Dropdown>
          </li>
        </ul>
      </div>

      <div class="ml-5 col-start-8 col-span-1">
        <div />
        <div class="flex justify-start">
          <Link to="/login">
            <Button class="bg-primary-200 hover:bg-primary-300 mr-3">
              <p class="text-secondary-400">Login</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
</header>
