<script>
  import { Card, MenuButton, Dropdown, DropdownItem } from "flowbite-svelte";

    export let defaultModal
</script>


<Card>
    <div class="flex justify-between">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Tobias Rasmussen
      </h5>
      <MenuButton class="dots-menu dark:text-white" vertical />
    </div>
    <Dropdown triggeredBy=".dots-menu">
      <DropdownItem on:click={() => (defaultModal = true)}>Edit</DropdownItem>
      <DropdownItem>Delete</DropdownItem>
    </Dropdown>

    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Admin
    </p>
  </Card>