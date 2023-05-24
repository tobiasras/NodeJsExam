<script>
    import {
        Table,
        TableBody,
        TableHead,
        TableHeadCell,
        Button,
        Spinner,
        Card, SpeedDial, Input, Label, Textarea, Modal, Select, TableBodyCell, TableBodyRow
    } from "flowbite-svelte";
    import io from "socket.io-client";
    import {user} from "../../../stores/userStore";
    import {BASE_URL} from "../../../stores/globalStore";
    import {accessToken} from "../../../lib/accessToken.js";
    import {onMount} from "svelte";
    import {Link} from "svelte-navigator";
    import TableRow from "../../../components/TableRow.svelte";
    import CreateLeadModal from "../../../components/LeadForm.svelte";
    import Leadform from "../../../components/LeadForm.svelte";

    let socket

    onMount(async () => {
        isLoading = true
        socket = io(`${$BASE_URL}/${$user.company}`, {
            auth: {
                token: await accessToken()
            }
        })


        socket.on("initial load", (data) => {
            console.log(data)
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

    function sendData() {
        socket.emit("hello", "world")
    }



    // MODALS
    let modalCreateLeadIsShowing = false;
    let modalUpdateLead = false;
    function modalShowUpdateLead() {
        modalUpdateLead = true
    }
    function modalCloseUpdateLead() {
        modalUpdateLead = false
    }
    function modalShowCreateLead() {
        modalCreateLeadIsShowing = true
    }
    function modalCloseCreateLead() {
        modalCreateLeadIsShowing = false
    }
</script>


<div class="col-start-1 col-span-10 p-5">

    {#if !isLoading}
        <div>
            {#if !errorSocketOnLoad}
                <!-- CREATE LEAD -->
                <Modal bind:open={modalCreateLeadIsShowing} size="lg" autoclose={false} class="w-full">
                    <Leadform >
                        <div class="flex justify-end">
                            <Button on:click={modalCloseCreateLead}
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                            >Decline
                            </Button>

                            <Button
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                                    >Save
                            </Button>
                        </div>
                    </Leadform>
                </Modal>

                <!-- UPDATE LEAD -->
                <Modal bind:open={modalUpdateLead} size="lg" autoclose={false} class="w-full">
                    <Leadform headerTitle="Updating:" leadName="random name" >
                        <div class="flex justify-end">
                            <Button on:click={modalCloseUpdateLead}
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                            >Decline
                            </Button>

                            <Button
                                    class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600 mr-3"
                                    >Save
                            </Button>
                        </div>
                    </Leadform>
                </Modal>



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
                            <!-- on:click={modalShowUpdateLead} -->
                            <TableBodyCell>
                                <button on:click={sendData}
                                        class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Edit
                                </button>
                            </TableBodyCell>
                        </TableBodyRow>
                    </TableBody>

                </Table>

                <div class="absolute bottom-20 left-0 right-5 w-10/12 flex justify-end mb-5">
                    <button class="absolute mr-10 bg-[#4285F4] hover:bg-[#2557D6]/90 p-5 rounded-full w-16 h-16 flex-col justify-center items-center"
                            on:click={modalShowCreateLead}>
                        <p class=" text-3xl mb-1 font-bold text-white ">
                            +
                        </p>
                    </button>

                </div>
            {:else }
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
            {/if}


        </div>
    {:else }
        <div class="flex justify-center items-center h-full">
            <Spinner size="32"/>
        </div>
    {/if}


</div>
