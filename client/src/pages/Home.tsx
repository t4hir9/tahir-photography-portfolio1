import { motion } from "framer-motion";
import { ArrowRight, Camera, Video, Instagram } from "lucide-react";
import { Link } from "wouter";
import { useInstagramFeed } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { data: instagramPosts } = useInstagramFeed();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {/* Using a sleek, looping cinematic placeholder video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="container relative z-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-sm md:text-base font-light tracking-[0.3em] uppercase mb-4 text-white/80">
              Visual Storyteller
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 tracking-tighter">
              TAHIR ADAMU
            </h1>
            <p className="max-w-xl mx-auto text-white/70 mb-10 text-lg font-light leading-relaxed">
              Capturing the raw essence of moments through the lens of photography and cinematography.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/portfolio">
                <button className="px-8 py-3 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-colors rounded-none w-full sm:w-auto">
                  VIEW WORK
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-3 border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-colors rounded-none w-full sm:w-auto">
                  GET IN TOUCH
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-50" />
        </motion.div>
      </section>

      {/* Disciplines Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <Link href="/portfolio?filter=photography">
              <motion.div 
                className="group relative h-[600px] overflow-hidden cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                {/* Placeholder: Cinematic Portrait */}
                <img 
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop" 
                  alt="Photography" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20">
                  <div className="flex items-center gap-4 mb-4 text-white/60">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm tracking-widest uppercase">01</span>
                  </div>
                  <h2 className="text-4xl font-display text-white mb-4">Photography</h2>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm tracking-wider uppercase mr-2">Explore Gallery</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/portfolio?filter=videography">
              <motion.div 
                className="group relative h-[600px] overflow-hidden cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                {/* Placeholder: Cinematic Film Set */}
                <img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
                  alt="Videography" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20">
                  <div className="flex items-center gap-4 mb-4 text-white/60">
                    <Video className="w-5 h-5" />
                    <span className="text-sm tracking-widest uppercase">02</span>
                  </div>
                  <h2 className="text-4xl font-display text-white mb-4">Videography</h2>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm tracking-wider uppercase mr-2">Watch Films</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Works - Latest from Instagram */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="text-sm font-light tracking-[0.2em] uppercase text-white/50 mb-2">Social Feed</h3>
              <h2 className="text-3xl font-display text-white">Latest on Instagram</h2>
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider">Follow Me</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Fallback to placeholders if API returns empty */}
            {(!instagramPosts || instagramPosts.length === 0) ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 relative group overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`} 
                    alt="Instagram Post"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white w-6 h-6" />
                  </div>
                </div>
              ))
            ) : (
              instagramPosts.slice(0, 4).map((post) => (
                <a 
                  key={post.id} 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="aspect-square bg-white/5 relative group overflow-hidden"
                >
                  <img 
                    src={post.thumbnail_url || post.media_url} 
                    alt={post.caption || "Instagram Post"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white w-6 h-6" />
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
