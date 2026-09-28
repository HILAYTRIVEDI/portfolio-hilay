import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <OpenSource />
      <Writing />
      <Contact />
    </main>
  );
}
