<script>
    import { Input, Label } from 'flowbite-svelte'
    export let name
    export let value
</script>

<Label class="space-y-2 mb-3">
    <span>{name}</span>
    <Input type="tel" name="{name}" placeholder="151231232"
           bind:value={value}
           required/>
</Label>
