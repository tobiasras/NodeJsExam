<script>
    import { Link } from "svelte-routing"
</script>    

    <div class=" bg-Mine-200 p-8 rounded">
        <h2 class="text-2xl  text-Mine-400 font-bold mb-6">Login</h2>
        <form>
          <div class="mb-4">
            <label class="block  text-Mine-400 text-sm font-bold mb-2" for="username">Username</label>
            <input class="w-full px-3 py-2 border border-gray-300 rounded" id="username" type="text" placeholder="Enter your username" required>
          </div>
          <div class="mb-6  ">
            <label class="block text-Mine-400 text-sm font-bold mb-2" for="password">Password</label>
            <input class="w-full px-3 py-2 border border-gray-300 rounded" id="password" type="password" placeholder="Enter your password" required>
          </div>

        <div class="flex justify-between items-center">
            <button class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
            <Link to="/forgot-password">
                <p class="underline" >Forgot password</p>
            </Link>
        </div>
        
        
        </form>
      </div>
