import { Instagram, Twitter, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold tracking-widest text-white mb-2">
              TAHIR<span className="text-white/50">ADAMU</span>
            </h3>
            <p className="text-white/40 text-sm max-w-md">
              Capturing moments, telling stories, and creating visual experiences through photography and cinematography.
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <MapPin className="w-3 h-3" />
            <span>Based in Nigeria, Available Worldwide</span>
          </div>
          <p>© {new Date().getFullYear()} Tahir Abdullahi Adamu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
