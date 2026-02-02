import VideoBackground from "./components/VideoBackground";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Tariffs from "./components/Tariffs";
import Team from "./components/Team";
import Cases from "./components/Cases";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Support from "./components/DrupalCoderSupport";
function App() {
  return (
    <div className="App">
      <VideoBackground>
        <Header />
        <HeroSection />
      </VideoBackground>
      <Services />
      <Support/>
      <Tariffs />
      <Team />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;