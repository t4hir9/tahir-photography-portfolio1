import { Hero } from "@/components/hero";
import { FilmSection } from "@/components/film";
import { TechSection } from "@/components/tech";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FilmSection />
      <TechSection />
    </main>
  );
}