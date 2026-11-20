import { Hero } from "@/components/hero";
import { FilmSection } from "@/components/film";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FilmSection />
    </main>
  );
}