import { HeroV2 } from "@/components/hero-v2/HeroV2";
import { UnifiedGrid } from "@/components/hero-v2/UnifiedGrid";
import { AboutSection } from "@/components/about/AboutSection";
import { Footer } from "@/components/about/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroV2 />
        <UnifiedGrid />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}