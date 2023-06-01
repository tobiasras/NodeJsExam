<script>
  import { Card } from 'flowbite-svelte'
  import { Link } from 'svelte-navigator'

</script>

<div class="col-start-1 col-span-5 p-5">

    <div class="grid grid-cols-3 gap-3">

            <Link to="/app/import-csv">
                <Card class="hover:underline ">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Import from csv</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Use this when u want to import many from other sources
                    </p>
                </Card>
            </Link>

    </div>

</div>
