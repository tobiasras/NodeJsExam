<script>
 import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Avatar,
    TableSearch,
    Button,
    Modal,
    Label,
    Input,
    Textarea,
    Select,
  } from "flowbite-svelte";


  let searchTerm = "";

  let defaultModal = false;

  let selected;
  let countries = [
    { value: "us", name: "Unexplored" },
    { value: "ca", name: "Called" },
    { value: "fr", name: "France" },
  ];



</script>


<div class="col-start-1 col-span-10 p-5">
    <div class="flex space-x-4 justify-end p-3">
        <Avatar />
        <Avatar />
    </div>

    <Table
        divClass="relative overflow-y-auto bg-gray-100   dark:bg-gray-800 h-4/5 "
    >
        <caption
        class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-900"
        >
        Our products
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse a list of Flowbite products designed to help you work and
            play, stay organized, get answers, keep in touch, grow your
            business, and more.
        </p>
        </caption>

        <TableSearch
        divClass="dark:bg-gray-900 bg-gray-100"
        placeholder="Search by maker name"
        hoverable={true}
        bind:inputValue={searchTerm}
        >
        <TableHead theadClass="dark:bg-gray-900">
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell />
        </TableHead>

        <TableBody>
            <TableBodyRow>
            <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
            <TableBodyCell>Sliver</TableBodyCell>
            <TableBodyCell>Laptop</TableBodyCell>
            <TableBodyCell>$2999</TableBodyCell>
            <TableBodyCell>
                <button
                on:click={() => (defaultModal = true)}
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                Edit
                </button>
            </TableBodyCell>
            </TableBodyRow>
        </TableBody>
        </TableSearch>
    </Table>

    <Modal bind:open={defaultModal} size="lg" autoclose={false} class="w-full">
        <form class=" space-y-6" action="#">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Editing lead: 151242
          </h3>
          <div class="grid grid-col-6 gap-5">
            <div class="col-start-1 col-span-3">
              <Label class="space-y-2 mb-2">
                <span>Description [ Can be styled with markdown ]</span>
                <Textarea class="bg-gray-600" name="email" required rows="20" />
              </Label>
      
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
                <span>Phone</span>
                <Input type="tel" name="phone" placeholder="151231232" required />
              </Label>
      
              <Label class="space-y-2 mb-3">
                <span>Name</span>
                <Input type="text" name="phone" placeholder="151231232" required />
              </Label>
            </div>
      
            <div class="col-start-4 col-span-2 flex flex-col justify-between">
              <div>
                <Label class="space-y-1 mb-3">
                  <span>Adress</span>
                  <Input type="tel" name="phone" placeholder="151231232" required />
                </Label>
      
                <Label class="space-y-1">
                  <span>Catogory</span>
                  <Select underlineClass="p-3" class="mt-2" items={countries} bind:value={selected} />
                </Label>
              </div>
      
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

    </div>