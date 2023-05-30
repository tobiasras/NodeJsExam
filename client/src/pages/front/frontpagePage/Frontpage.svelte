<script>
  import { Link } from "svelte-navigator";
</script>

<main
  class="grid grid-cols-8 py-24 px-10 dark:bg-gray-700 bg-gray-200 dark:text-gray-300 text-gray-700 h-[calc(100vh-4rem)] "
>
  <div class=" col-start-1 col-span-3 rounded-md">

    <h1 class="font-extrabold focus:outline-none text-7xl dark:text-gray-300 text-gray-700 mb-5">COLDCANVAS</h1>

    <p class="mt-2 w-4/5 dark:text-gray-300 text-gray-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
      amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
      libero molestiae. Laboriosam delectus quos accusantium odit.
    </p>
    <p class="mt-2 w-4/5 dark:text-gray-300 text-gray-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
      amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
      libero molestiae. Laboriosam delectus quos accusantium odit.
    </p>



    <hr class="border border-white dark:border-gray-800 mt-5" />

    <div class="my-3 w-4/5">
      <h2 class="font-bold  text-2xl dark:text-gray-300 text-gray-700">
        Having trouble with the application?
      </h2>
      <p class="mt-2 dark:text-gray-300 text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
        amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
        libero molestiae. Laboriosam delectus quos accusantium odit.
      </p>
      <Link to="/login">
      <button
        class="bg-gray-700 dark:bg-gray-200 hover:bg-gray-900  dark:text-gray-700 text-gray-300 font-bold py-2 px-4 rounded mt-3">
        Go to docs
      </button>
      </Link>
    </div>
  </div>

  <div class="col-start-5 col-span-3">
  </div>
</main>
