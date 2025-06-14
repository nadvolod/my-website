import About from "../components/About";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Speaking from "../components/Speaking";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Speaking />
      <About />
    </main>
  );
}
