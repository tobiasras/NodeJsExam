<script>
import { Link } from 'svelte-navigator'
import { Listgroup } from 'flowbite-svelte'
</script>

<div
        class="col-start-11 col-span-2 bg-neutral-100 dark:bg-gray-800 h-[calc(100vh-4rem)] p-5"
>
    <div class="flex justify-between">
        <h1 class="text-3xl font-semibold dark:text-neutral-50">Menu</h1>
    </div>

    <Listgroup class="bg-neutral-200 mt-3">
        <Link to="/app/dashboard">
            <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
                <p class="material-symbols-outlined">team_dashboard</p>

                <p >
                    Dashboard
                </p>
            </div>
        </Link>

        <Link to="/app/tools">
            <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
                <p class="material-symbols-outlined">auto_fix_high</p>

                <p >
                    Tools
                </p>
            </div>
        </Link>

        <Link to="/app/team">
            <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
                <p class="material-symbols-outlined">groups</p>

                <p >
                    Team
                </p>
            </div>
        </Link>

        <Link to="/app/archive">
            <div class="p-2 h gap-2 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200 flex" >
                <p class="material-symbols-outlined">inventory_2</p>

                <p >
                    Archive
                </p>
            </div>
        </Link>
    </Listgroup>
</div>
