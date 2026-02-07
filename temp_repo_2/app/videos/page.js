"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const VideosPage = () => {
  const videos = [
    { src: "/videos/culverin.MP4", title: "Culverin" },
    { src: "/videos/FTS.MP4", title: "FTS" },
    { src: "/videos/Outfit_3_Redo.mp4", title: "Outfit 3 Redo" },
    { src: "/videos/Outfit_4.mp4", title: "Outfit 4" },
    { src: "/videos/Reel.MP4", title: "Reel" },
    { src: "/videos/Rubix.MP4", title: "Rubix" },
    { src: "/videos/Scribble.MP4", title: "Scribble" },
    { src: "/videos/titan.MP4", title: "Titan" },
    { src: "/videos/Walima_Second.mp4", title: "Walima Second" },
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto px-2 sm:px-3 lg:px-4 w-full pt-8 pb-20">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Projects</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 dark:text-neutral-100 mb-8 tracking-tight">Video Samples</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl">Professional video and cinematography work featuring creative storytelling and technical expertise.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full flex items-center justify-center">
                  <video 
                    src={video.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    controls 
                    className="max-w-full max-h-[80vh] w-auto h-auto block"
                    preload="metadata"
                    onClick={(e) => {
                      e.currentTarget.muted = !e.currentTarget.muted;
                    }}
                  />
                </div>
                <h3 className="text-neutral-800 dark:text-neutral-200 font-medium">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer homepage={false} />
    </>
  );
};

export default VideosPage;
