import { motion } from "framer-motion";
import { ArrowRight, Camera, Video } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source
              src="/videos/Reel.MP4"
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
                <img 
                  src="/photos/1.jpg" 
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
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src="/videos/Outfit_4.mp4" type="video/mp4" />
                </video>
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

      <Footer />
    </div>
  );
}
