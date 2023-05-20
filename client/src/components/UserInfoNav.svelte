<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { Link, useNavigate } from "svelte-navigator";

  import { user,  token } from "../stores/userStore";

  const navigate = useNavigate();


  function logout()  {
        user.set()
        token.set()
        navigate('/')
    }

</script>

<div>
  <Button class="bg-primary-200 hover:bg-primary-300 rounded-full">
    <p class=" text-secondary-400 align-middle text-md">
      {$user.username}
    </p>

    <p class="material-symbols-outlined text-secondary-300">expand_more</p>
  </Button>

  <Dropdown class=" bg-secondary-300 text-primary-300 w-32">
    <Link to="/app/profile">
      <DropdownItem class="hover:bg-secondary-400">
        <p>Profile</p>
      </DropdownItem>
    </Link>

    <DropdownItem on:click={logout} class="hover:bg-secondary-400">
      <p>Logout</p>
    </DropdownItem>
  </Dropdown>
</div>
