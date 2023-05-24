<script>
    import {Input, Label, Select, Textarea} from "flowbite-svelte";
    export let socket
    export let leadName = ""
    export let headerTitle = "Creating new lead"

    let leadDataModal = {
        email: "",
        phone: "",
        name: "",
        category: "",
        description: ""
    }

    let categoriesModal = [
        {value: "us", name: "Unexplored"},
        {value: "ca", name: "Called"},
        {value: "fr", name: "France"},
    ];


    export const createLead = () => {
        console.log(123)
        socket.emit("hello", "world")
    }


    export const updateLead = () => {
        console.log(123)
        socket.emit("hello", "world")
    }

</script>


<form class="space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        { headerTitle }  {leadName}
    </h3>
    <div class="grid grid-col-6 gap-5">
        <div class="col-start-1 col-span-3">
            <Label class="space-y-2 mb-2">
                <span>Description  Can be styled with markdown </span>
                <Textarea class="bg-gray-600" name="description"
                          bind:value={leadDataModal.description}
                          required rows="20"/>
            </Label>

            <Label class="space-y-2 mb-3">
                <span>Email</span>
                <Input bind:value={leadDataModal.email}
                       type="email"
                       name="email"
                       placeholder="name@company.com"
                       required
                />
            </Label>

            <Label class="space-y-2 mb-3">
                <span>Phone</span>
                <Input type="tel" name="phone" placeholder="151231232"
                       bind:value={leadDataModal.phone}
                       required/>
            </Label>

            <Label class="space-y-2 mb-3">
                <span>Name</span>
                <Input type="text" name="name" placeholder="Johansen"
                       bind:value={leadDataModal.name}
                       required/>
            </Label>
        </div>

        <div class="col-start-4 col-span-2 flex flex-col justify-between">
            <div>
                <Label class="space-y-1">
                    <span>Catogory</span>
                    <Select
                            underlineClass="p-3"
                            class="mt-2"
                            bind:items={categoriesModal}
                            bind:value={leadDataModal.category}
                    />
                </Label>
            </div>

            <slot/>
        </div>
    </div>
</form>