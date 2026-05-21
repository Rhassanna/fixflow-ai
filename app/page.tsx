import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import DemoSection from "@/components/sections/DemoSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DemoSection />
        <WorkflowSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
