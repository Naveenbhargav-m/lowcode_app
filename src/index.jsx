import { render } from "preact";
  import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import "./index.css";
import { NotFoundComponent } from "./components/not_found";
import { AppList } from "./apps_list/apps_list";


export function App() {

  return (
    <LocationProvider>
   <div className="flex bg-white">
  <main className="flex-grow bg-white">
    <Router>
      <Route path="/" component={AppList}/>
      <Route path="/home" component={NotFoundComponent}/>
      <Route default component={NotFoundComponent} />

    </Router>
  </main>
</div>

    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
