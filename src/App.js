import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import Footer from './components/Footer'
import NavSignIn from './components/NavSignIn'


function App() {
  return (
    <MainLayout>
      <NavSignIn />
      <Hero />
      <Footer />
    </MainLayout>
  );
}

export default App;
