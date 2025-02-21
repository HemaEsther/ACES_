
import {
  Header,
  Hero,
  Footer,
  Testimonial,
  FAQ
} from "../Components_Page";
import About from "../Components_Page/About";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About/>
      <FAQ />
      <Testimonial />
      <Footer />
    </>
  );
};

export default LandingPage;
