"use client";

import { useEffect, useRef, useState } from "react";
import { VideoLayerProps } from "./types";
import styles from "./VideoLayer.module.css";

export function VideoLayer({ progress, duration, sources, poster }: VideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(progress);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const targetTime = progress * duration;

    const updateTime = () => {
      if (!video) return;
      const targetTime = progress * duration;
      const diff = Math.abs(video.currentTime - targetTime);

      if (diff > 0.1) {
        video.currentTime = targetTime;
      }

      rafRef.current = requestAnimationFrame(updateTime);
    };

    if (isLoaded && video.readyState >= 2) {
      updateTime();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [progress, duration, isLoaded]);

  useEffect(() => {
    lastProgressRef.current = progress;
  }, [progress]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setError(null);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setError(video.error?.message || "Failed to load video");
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video && Math.abs(video.currentTime - progress * duration) > 0.1) {
      video.currentTime = progress * duration;
    }
  };

  return (
    <div className={styles.videoContainer} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.video}
        src={sources.webm}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        onError={handleError}
        onCanPlay={handleCanPlay}
        style={{ objectFit: "cover" }}
      >
        <source src={sources.mp4} type="video/mp4" />
        <source src={sources.webm} type="video/webm" />
      </video>
      {error && <div className={styles.error} role="alert">{error}</div>}
      {!isLoaded && !error && <div className={styles.loading} aria-label="Loading video" />}
    </div>
  );
}