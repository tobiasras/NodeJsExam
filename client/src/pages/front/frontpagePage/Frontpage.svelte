<script>
  import { Link } from 'svelte-navigator'
</script>

<main
  class="grid grid-cols-8 py-24 px-10 dark:bg-gray-700 bg-gray-200 dark:text-gray-300 text-gray-700 h-[calc(100vh-4rem)] "
>
  <div class=" col-start-1 col-span-4 rounded-md">

    <h1 class="font-extrabold focus:outline-none text-7xl dark:text-gray-300 text-gray-700 mb-5">Welcome to ColdCanvas</h1>

    <p class="mt-2 w-4/5 font-bold dark:text-gray-300 text-gray-700">
      The company that simplifies cold calling for businesses. We understand the challenges that come with reaching out to potential clients, and we're here to streamline the process for you.
    </p>

    <p class="mt-2 w-4/5 dark:text-gray-300 text-gray-700">
      At ColdCanvas, our mission is to provide you with the tools and resources you need to make your cold calling efforts more effective and efficient. We offer a range of innovative solutions designed to help you connect with your target audience and generate valuable leads.
    </p>

    <h2 class="font-bold  text-2xl dark:text-gray-300 mt-5 text-gray-700">
      Having trouble with generating sales?
    </h2>
    <p class="mt-2 w-4/5 dark:text-gray-300 text-gray-700">
      Our cutting-edge technology and intuitive platform make it easier than ever to manage your cold calling campaigns
    </p>

    <p class="mt-2 w-4/5 dark:text-gray-300 text-gray-700">
      Our team at ColdCanvas is dedicated to your success. We provide comprehensive training and support to ensure you have the skills and knowledge to make the most of our platform. Whether you're a seasoned sales professional or new to cold calling, we're here to guide you every step of the way.
    </p>

    <hr class="border border-white dark:border-gray-800 mt-5" />

    <div class="my-3 w-4/5">
      <h2 class="font-bold  text-2xl dark:text-gray-300 text-gray-700">
        Sign up your company know
      </h2>
      <p class="mt-2 dark:text-gray-300 text-gray-700">

        Signing up with ColdCanvas is a breeze. In just a few clicks, you can create an account and start optimizing your cold calling strategy. No complicated processes or lengthy forms – we've made it easy to get started and supercharge your sales efforts. Experience the simplicity of signing up with ColdCanvas today.
      </p>
      <Link to="/signup">
      <button
        class="bg-gray-700 dark:bg-gray-200 hover:bg-gray-900  dark:text-gray-700 text-gray-300 font-bold py-2 px-4 rounded mt-3">
        Sign up Company
      </button>
      </Link>
    </div>
  </div>

  <div class="col-start-5 col-span-3">
  </div>
</main>
