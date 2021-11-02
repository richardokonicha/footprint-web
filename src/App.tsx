import { getFirestore } from 'firebase/firestore';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import NavSigned from './components/NavSigned';
import MainLayout from './layouts/MainLayout';
import ProjectDetail from './projects/projects-detail';
import Projects from './projects/projects-list';

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
