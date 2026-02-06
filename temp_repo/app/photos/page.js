"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";

const PhotosPage = () => {
  const photos = Array.from({ length: 65 }, (_, i) => `/photos/${i + 1}.jpg`);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto px-2 sm:px-3 lg:px-4 w-full pt-8 pb-20">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Projects</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 dark:text-neutral-100 mb-8 tracking-tight">Photo Gallery</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl">A curated collection of photography work showcasing creative vision and technical skill.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 aspect-square">
                <Image
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={75}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer homepage={false} />
    </>
  );
};

export default PhotosPage;
