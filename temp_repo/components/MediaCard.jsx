import React from "react";
import Image from "next/image";

const MediaCard = ({ media, index }) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
      <Image
        src={media.src}
        alt={`Photo ${index + 1}`}
        width={400}
        height={400}
        className="w-full h-full object-contain"
        loading="lazy"
        quality={75}
      />
    </div>
  );
};

export default MediaCard;