import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Camera, Film, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="/about-profile.jpg" 
                alt="Tahir Abdullahi Adamu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-white/20 -z-10 hidden md:block" />
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              ABOUT <span className="text-white/30">ME</span>
            </h1>
            
            <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
              <p>
                My name is <span className="text-white font-medium">Tahir Abdullahi Adamu</span>. 
                I am a visual storyteller driven by the desire to capture the unseen and document the fleeting.
              </p>
              <p>
                With a background in both photography and cinematography, I approach every project with a cinematic eye, looking for the perfect interplay of light, composition, and emotion. Whether it's a commercial campaign, a documentary film, or a portrait session, my goal is to create visuals that resonate deeply.
              </p>
              <p>
                My work explores the intersection of human emotion and the environment, finding beauty in both the chaotic and the serene.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex gap-4 items-start">
                <Camera className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-display text-lg mb-1">Photography</h3>
                  <p className="text-white/50 text-sm">Portrait, Editorial, Lifestyle</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Film className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-display text-lg mb-1">Cinematography</h3>
                  <p className="text-white/50 text-sm">Commercial, Documentary, Music Video</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Award className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-display text-lg mb-1">Experience</h3>
                  <p className="text-white/50 text-sm">5+ Years Professional Work</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-display text-lg mb-1">Location</h3>
                  <p className="text-white/50 text-sm">Available Worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-display text-white mb-8">MY PHILOSOPHY</h2>
          <p className="text-2xl md:text-3xl text-white/80 font-display italic leading-relaxed">
            "Photography is the story I fail to put into words."
          </p>
          <p className="mt-6 text-white/40 uppercase tracking-widest text-sm">— Destin Sparks</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
