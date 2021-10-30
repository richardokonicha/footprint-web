import MainLayout from './layouts/MainLayout'
import NavSigned from './components/NavSigned'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Projects from './projects/projects-list'
import { doc, getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';
import {
  Link,
  useParams
} from "react-router-dom";
import ProjectDetail from './projects/projects-detail'

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <MainLayout>
        <RouteApp />
      </MainLayout>
    </FirestoreProvider>

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
          {/* <Route path="/projects">
            <Projects />
          </Route> */}

          <Route path="/projects/:projectId">
            <ProjectDetail />
          </Route>
          <Route path="/">
            <Projects />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


function Dashboard() {
  return <h2>Dashboard</h2>;
}
