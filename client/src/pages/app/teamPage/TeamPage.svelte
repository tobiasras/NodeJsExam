<script>
  import {
    Card,
    Button,
    Dropdown,
    DropdownItem,
    MenuButton,
    Modal,
    Label,
    Textarea,
    Input,
    Select,
  } from "flowbite-svelte";
  import PersonCard from "../../../components/PersonCard.svelte";

  let defaultModal = false;

  const roles = [
    { value: "Admin", name: "Admin" },
    { value: "Sales", name: "Sales" },
  ];
</script>

<div class="col-start-1 col-span-6 p-5">
  <div class="p-3 text-gray-900 dark:text-gray-200">
    <h1 class="text-2xl font-semibold">Team members</h1>
    <p>Edit, delte and change members type</p>
  </div>

  <div>
    <Modal bind:open={defaultModal} size="md" autoclose={false} class="w-full">
      <form class=" space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Editing member: Tobias Juul
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
              />
            </Label>

            <Label class="space-y-2 mb-3">
              <span>Username</span>
              <Input type="tel" name="phone" placeholder="151231232" required />
            </Label>

            <Label class="space-y-2 mb-3">
              <span>Name</span>
              <Input
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
              <Select items={roles} />
            </Label>

            <div class="flex justify-end">
              <Button
                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                on:click={() => alert('Handle "success"')}>Save</Button
              >
              <Button
                class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                >Decline</Button
              >
            </div>
          </div>
        </div>
      </form>
    </Modal>

    <div class="grid grid-cols-4 gap-3">
      <PersonCard bind:defaultModal />
      <PersonCard bind:defaultModal />
      <PersonCard bind:defaultModal />
      <PersonCard bind:defaultModal />
      <PersonCard bind:defaultModal />
    </div>
  </div>
</div>
