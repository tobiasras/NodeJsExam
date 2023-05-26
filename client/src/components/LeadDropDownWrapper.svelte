<script>
    import {Dropdown, MenuButton} from "flowbite-svelte";

export let lead

</script>


<MenuButton class="dots-menu dark:text-white" vertical/>

<Dropdown>
    <slot>



    </slot>
</Dropdown>