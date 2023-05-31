<script>
    import {Dropdown, MenuButton} from "flowbite-svelte";

    export let value

</script>


<MenuButton class="dots-menu dark:text-white" vertical/>

<Dropdown>
    <slot>



    </slot>
</Dropdown>