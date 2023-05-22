<script>
  import "./app.css";
  import { Router, Route } from "svelte-navigator";
  import Frontpage from "./pages/front/frontpagePage/Frontpage.svelte";
  import LoginPage from "./pages/front/loginPage/LoginPage.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Pricing from "./pages/front/pricingPage/Pricing.svelte";
  import Application from "./pages/app/applicationRouter/ApplicationRouter.svelte";
</script>

<div>
  <Router>
    <Navbar />
    <Route path="/"><Frontpage /></Route>
    <Route path="/login"><LoginPage /></Route>
    <Route path="/pricing"><Pricing /></Route>

    <Route path="/app/*"> <Application/></Route>
  </Router>
</div>
