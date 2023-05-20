<script>
  import { Link } from "svelte-navigator";
</script>

<main
  class="grid grid-cols-8 py-24 px-10 bg-primary-200 text-secondary-400 h-[calc(100vh-4rem)]"
>
  <div class=" col-start-1 col-span-3 rounded-md">
    <h1 class="font-extrabold focus:outline-none text-7xl mb-5">COLDCANVAS</h1>

    <p class="mt-2 w-4/5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
      amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
      libero molestiae. Laboriosam delectus quos accusantium odit.
    </p>
    <p class="mt-2 w-4/5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
      amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
      libero molestiae. Laboriosam delectus quos accusantium odit.
    </p>

    <div class="grid my-5 grid-cols-3 gap-5 h-32">
      <div
        class=" bg-secondary-400 rounded-md flex flex-col justify-center items-center"
      >
        <p class="text-primary-200 font-extrabold text-3xl">1-5 teams</p>
        <p class=" text-primary-200">500 kr</p>
      </div>

      <div
        class="bg-secondary-400 rounded-md flex flex-col justify-center items-center"
      >
        <p class="text-primary-200 font-extrabold text-3xl">6-15 teams</p>
        <p class=" text-primary-200">1500 kr</p>
      </div>

      <div
        class="bg-secondary-400 rounded-md flex flex-col justify-center items-center"
      >
        <p class=" text-primary-200 font-extrabold text-3xl">&lt 16 teams</p>
        <p class=" text-primary-200">contact for price kr</p>
      </div>
    </div>

    <button
      class=" bg-secondary-300 hover:bg-secondary-400 text-primary-100 font-bold py-2 px-4 rounded mt-3"
    >
      <Link to="/login">Go to pricing</Link>
    </button>

    <hr class=" border-secondary-200 mt-5" />

    <div class="my-3 w-4/5">
      <h2 class="font-bold text-secondary-400 text-2xl">
        Having trouble with the application?
      </h2>
      <p class="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde earum
        amet ab illum quae voluptates in, nihil qui vel ea similique, aperiam
        libero molestiae. Laboriosam delectus quos accusantium odit.
      </p>

      <button
        class="bg-secondary-300 hover:bg-secondary-400 text-primary-100 font-bold py-2 px-4 rounded mt-3"
      >
        <Link to="/login">Go to docs</Link>
      </button>
    </div>
  </div>

  <div class="col-start-5 col-span-3">
    <img src="/images/frontpage_picture.png" alt="" />
  </div>
</main>
