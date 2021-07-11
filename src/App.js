import MainLayout from './layouts/MainLayout'
import NavSigned from './components/NavSigned'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <MainLayout>
      <RouteApp />
    </MainLayout>
  )
}

export default App;

const RouteApp = () => {
  return (
    <Router>
      <div>
        <NavSigned />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


function Home() {
  return <h2>Home</h2>;
}

function Projects() {
  return <h2>Projects</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}
