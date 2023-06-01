<script>
    import { Input, Label, Select, Textarea, Button, DropdownItem, Dropdown } from 'flowbite-svelte'

    let form
    export let socket

    export let headerTitle = 'Creating new lead'

    export let lead = {}

    let fields = []

    const { email, phone, name, id, category, description, ...customFields } = lead

    const fieldsFromLead = Object.keys(customFields).map(field => {
      return {
        type: 'text',
        name: field
      }
    })

    fields = [...fields, ...fieldsFromLead]

    let categoriesModal = [
      { value: 'new', name: 'New' },
      { value: 'called', name: 'Called' },
      { value: 'ready', name: 'Ready' },
      { value: 'waiting', name: 'Waiting' },
      { value: 'waiting', name: 'Done' }
    ]

    export const submit = (type) => {
      if (!form.checkValidity()) {
        form.reportValidity()
        return false
      } else {
        socket.emit(`${type} lead`, lead)
        return true
      }
    }

    function editTextField (i) {
      fields[i].name = customFieldName
      customFieldName = ''
      fields = [...fields]
    }

    function deleteTextField (i) {
      const field = fields[i].name
      delete lead[field]
      const data = {
        lead,
        field
      }

      socket.emit('delete field', data)
      fields.splice(i, 1)
      fields = [...fields]
    }

    function createTextField () {
      if (customFieldName) {
        const field = {
          type: 'text',
          name: customFieldName
        }
        lead[customFieldName] = ''
        customFieldName = ''
        fields = [...fields, field]
      }
    }

    let customFieldName = ''

</script>

<form bind:this={form} class="space-y-6">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        { headerTitle }  {lead.name}
    </h3>
    <div class="grid grid-col-6 gap-5">
        <div class="col-start-1 col-span-3">
            <Label class="space-y-2 mb-3">
                <span>Name</span>
                <Input type="text" name="name" placeholder="Johansen"
                       bind:value={lead.name}
                       required/>
            </Label>

            <Label class="space-y-2 mb-3">
                <span>Email</span>
                <Input bind:value={lead.email}
                       type="email"
                       name="email"
                       placeholder="name@company.com"
                />
            </Label>

            <Label class="space-y-2 mb-3">
                <span>Phone</span>
                <Input type="tel" name="phone" placeholder="151231232"
                       bind:value={lead.phone}
                />
            </Label>

            <Label class="space-y-2 mb-2">
                <span>Description  Can be styled with markdown </span>
                <Textarea class="bg-gray-600" name="description"
                          bind:value={lead.description}
                          rows="20"/>
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
                            bind:value={lead.category}
                    />
                </Label>

                <div>
                    {#each fields as field, i}
                        <div class="flex justify-between items-end">

                            <div class="mt-3 flex justify-between w-full items-center">
                                <Label class="mr-2">
                                    <span>{field.name}</span>

                                    <Input bind:value="{lead[field.name]}" type="text" name="name"
                                           required/>
                                </Label>
                            </div>

                            <Dropdown>
                                <DropdownItem class="flex justify-between">
                                    <p>Edit</p>
                                    <p>></p>
                                </DropdownItem>
                                <Dropdown placement="right-start">
                                    <DropdownItem>
                                        <Label for="field-name" class="mb-1">Field name</Label>
                                        <Input bind:value={customFieldName} type="text" id="field-name"
                                               placeholder="Field name" required/>
                                    </DropdownItem>
                                    <DropdownItem on:click={() => { editTextField(i) }} slot="footer">edit
                                    </DropdownItem>
                                </Dropdown>
                                <DropdownItem on:click={() => { deleteTextField(i) }}
                                              class="flex items-baseline justify-between">
                                    <p>Delete</p>
                                </DropdownItem>
                            </Dropdown>
                        </div>

                    {/each}
                </div>

                <div class="mt-5 flex items-center justify-between border-t pt-3">
                    <Label class="">
                        <span>Add new field</span>
                    </Label>

                    <Button class="dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 hover:bg-gray-700 bg-gray-600"
                            type="button">+
                    </Button>

                    <Dropdown>
                        <DropdownItem class="flex items-center justify-between">
                            <p>Text field</p>
                            <p>></p>
                        </DropdownItem>
                        <Dropdown placement="right-start">
                            <DropdownItem>
                                <Label for="field-name" class="mb-1">Field name</Label>
                                <Input bind:value={customFieldName} type="text" id="field-name" placeholder="Field name"
                                       required/>
                            </DropdownItem>

                            <DropdownItem on:click={createTextField} slot="footer">Create</DropdownItem>
                        </Dropdown>
                    </Dropdown>
                </div>

            </div>

            <slot/>

        </div>
    </div>
</form>
