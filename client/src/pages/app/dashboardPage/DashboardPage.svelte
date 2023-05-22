<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
        Button,
        Modal,
        Label,
        Input,
        Textarea,
        Select,
        Spinner,
        Card
    } from "flowbite-svelte";
    import io from "socket.io-client";
    import {user} from "../../../stores/userStore";
    import {BASE_URL} from "../../../stores/globalStore";
    import {accessToken} from "../../../lib/accessToken.js";
    import {onMount} from "svelte";
    import {Link} from "svelte-navigator";

    let searchTerm = "";

    let leadModal = false;

    let selected;
    let countries = [
        {value: "us", name: "Unexplored"},
        {value: "ca", name: "Called"},
        {value: "fr", name: "France"},
    ];

    onMount(async () => {
        isLoading = true

        const socket = io(`${$BASE_URL}/${$user.company}`, {
            auth: {
                token: await accessToken()
            }
        });

        socket.on("leads", () => {

        })

        socket.on("connect", () => {
            isLoading = false
        })

        socket.on("connect_error", () => {
            isLoading = false
            errorSocketOnLoad = true
        })
    })


    let isLoading = true
    let errorSocketOnLoad = false
</script>

<div class="col-start-1 col-span-10 p-5">

    {#if !isLoading}
        <div>
            {#if errorSocketOnLoad}
                <div class="flex justify-center items-center">
                    <Card size="lg">
                        <div class="flex justify-center p-5">
                            <p class="material-symbols-outlined text-9xl">
                                priority_high
                            </p>
                        </div>
                        <div class="p-5 text-center">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Could not
                                connect
                                to
                                socket</h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological
                                order.
                            </p>
                        </div>
                        <div class="text-center">
                            <Link to="/">
                                <Button
                                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-5">
                                    Frontpage
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600">
                                    Frontpage
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            {:else }
                <Table divClass="relative overflow-y-auto bg-gray-100   dark:bg-gray-800 h-4/5 ">
                    <caption
                            class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-900"
                    >
                        Our products
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Browse a list of Flowbite products designed to help you work and play,
                            stay organized, get answers, keep in touch, grow your business, and
                            more.
                        </p>
                    </caption>

                 

                        <TableHead theadClass="dark:bg-gray-900">
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell/>
                        </TableHead>


                        <TableBody>
                            <TableBodyRow>
                                <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
                                <TableBodyCell>Sliver</TableBodyCell>
                                <TableBodyCell>Laptop</TableBodyCell>
                                <TableBodyCell>$2999</TableBodyCell>
                                <TableBodyCell>
                                    <button
                                            on:click={() => (leadModal = true)}
                                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Edit
                                    </button>
                                </TableBodyCell>
                            </TableBodyRow>
                        </TableBody>


                </Table>
            {/if}

            <Modal bind:open={leadModal} size="lg" autoclose={false} class="w-full">
                <form class=" space-y-6" action="#">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Editing lead: 151242
                    </h3>
                    <div class="grid grid-col-6 gap-5">
                        <div class="col-start-1 col-span-3">
                            <Label class="space-y-2 mb-2">
                                <span>Description [ Can be styled with markdown ]</span>
                                <Textarea class="bg-gray-600" name="email" required rows="20"/>
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
                                <Input type="tel" name="phone" placeholder="151231232" required/>
                            </Label>

                            <Label class="space-y-2 mb-3">
                                <span>Name</span>
                                <Input type="text" name="phone" placeholder="151231232" required/>
                            </Label>
                        </div>

                        <div class="col-start-4 col-span-2 flex flex-col justify-between">
                            <div>
                                <Label class="space-y-1 mb-3">
                                    <span>Adress</span>
                                    <Input type="tel" name="phone" placeholder="151231232" required/>
                                </Label>

                                <Label class="space-y-1">
                                    <span>Catogory</span>
                                    <Select
                                            underlineClass="p-3"
                                            class="mt-2"
                                            items={countries}
                                            bind:value={selected}
                                    />
                                </Label>
                            </div>

                            <div class="flex justify-end">
                                <Button
                                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                                        on:click={() => alert('Handle "success"')}>Save
                                </Button
                                >
                                <Button
                                        class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                                >Decline
                                </Button
                                >
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>

        </div>
    {:else }
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {/if}


</div>
