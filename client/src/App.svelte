<script>
  import './app.css'
  import { Router, Route } from 'svelte-navigator'
  import Frontpage from './pages/front/frontpagePage/Frontpage.svelte'
  import Navbar from './components/Navbar.svelte'
  import Application from './pages/app/applicationRouter/ApplicationRouter.svelte'
  import SignupPage from './pages/front/signupPage/SignupPage.svelte'
</script>

<div>
  <Router>
    <Navbar />
    <Route path="/"><Frontpage /></Route>
    <Route path="/signup"><SignupPage /> </Route>
    <Route path="/app/*"> <Application/></Route>
  </Router>
</div>
