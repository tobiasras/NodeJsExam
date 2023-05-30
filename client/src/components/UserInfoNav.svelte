<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { Link, useNavigate } from "svelte-navigator";

  import { userStore,  tokenData } from "../stores/userStore";

  const navigate = useNavigate();


  function logout()  {
        userStore.set()
        tokenData.set()
        navigate('/')
    }

</script>

<div>
  <Button class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-400  dark:hover:bg-gray-800">
    <p class="dark:text-gray-300 text-gray-800 align-middle text-md">
      {$userStore.username}
    </p>

    <p class="material-symbols-outlined dark:text-gray-300 text-gray-800">expand_more</p>
  </Button>

  <Dropdown class="bg-gray-200 dark:bg-gray-700  dark:hover:bg-gray-800 w-32">
    <Link to="/app/profile">
      <DropdownItem class="hover:bg-gray-400">
        <p>Profile</p>
      </DropdownItem>
    </Link>

    <DropdownItem on:click={logout} class="hover:bg-gray-400">
      <p>Logout</p>
    </DropdownItem>
  </Dropdown>
</div>
