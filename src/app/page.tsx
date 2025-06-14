import Courses from "@/components/Courses";
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Speaking from "../components/Speaking";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="speaking">
        <Speaking />
      </section>
      <section id="courses">
        <Courses />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="about">
        <About />
      </section>
    </main>
  );
}
