import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import ReactPlayer from "react-player";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Play, Loader2, X } from "lucide-react";

export default function Portfolio() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const filterParam = searchParams.get('filter');
  
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'video'>(
    (filterParam as 'all' | 'photo' | 'video') || 'all'
  );
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { data: items, isLoading } = usePortfolio();

  // Placeholder data for when API is empty during development
  const placeholderItems = [
    { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', title: 'Editorial Portrait', category: 'Portrait' },
    { id: 2, type: 'photo', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', title: 'Mountain Landscapes', category: 'Landscape' },
    { id: 3, type: 'video', url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&q=80', title: 'Cinematic Reel 2024', category: 'Commercial' },
    { id: 4, type: 'photo', url: 'https://images.unsplash.com/photo-1551316679-1c6a7b7e05e2?w=800&q=80', title: 'Urban Stories', category: 'Street' },
    { id: 5, type: 'photo', url: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=800&q=80', title: 'Fashion Week', category: 'Fashion' },
    { id: 6, type: 'video', url: 'https://www.youtube.com/watch?v=ysz5S6P_24M', thumbnailUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80', title: 'Brand Campaign', category: 'Commercial' },
    { id: 7, type: 'photo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', title: 'Studio Session', category: 'Portrait' },
    { id: 8, type: 'photo', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', title: 'Nature\'s Fury', category: 'Landscape' },
  ];

  const displayItems = items?.length ? items : placeholderItems;
  
  const filteredItems = displayItems.filter(item => 
    activeTab === 'all' ? true : item.type === activeTab
  );

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-12 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">PORTFOLIO</h1>
          
          <div className="flex justify-center gap-8">
            {['all', 'photo', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-all ${
                  activeTab === tab 
                    ? 'text-white border-white' 
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {tab === 'photo' ? 'Photography' : tab === 'video' ? 'Videography' : 'All Work'}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 group relative cursor-pointer overflow-hidden bg-secondary/20"
                onClick={() => setSelectedItem(item)}
              >
                {item.type === 'video' ? (
                  <div className="relative aspect-video">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={item.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={item.url} 
                      alt=""
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>

      <Footer />

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'video' ? (
                <div className="aspect-video w-full bg-black">
                  <ReactPlayer 
                    url={selectedItem.url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                  />
                </div>
              ) : (
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[90vh] object-contain"
                />
              )}
              <div className="mt-4 text-white">
                <h3 className="text-2xl font-display">{selectedItem.title}</h3>
                <p className="text-white/50">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
