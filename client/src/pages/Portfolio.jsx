import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, LoaderCircle, Play, Volume2, VolumeX, X } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const ASSET_ROOT = "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public";
const fallbackManifest = {
  photos: Array.from({ length: 65 }, (_, index) => `${index + 1}.jpg`),
  videos: ["FTS.MP4", "Outfit_3_Redo.mp4", "Outfit_4.mp4", "Reel.MP4", "Rubix.MP4", "Scribble.MP4", "Walima_Second.mp4", "beeh final.mp4", "culverin.MP4", "gold final.mp4", "gold2.mp4", "guards vid.mp4", "pastry reels - HD 1080p.mp4", "reel_5.mp4", "shanty main.mp4", "titan.MP4"],
};
const titleFromFilename = (filename) => filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
const assetUrl = (type, name) => `${ASSET_ROOT}/${type}/${encodeURIComponent(name)}`;

function VideoCard({ item, orientation, onOrientation, onOpen }) {
  const videoRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: "220px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (nearViewport) video.play().catch(() => {});
    else video.pause();
  }, [nearViewport]);

  return <button className={`video-tile video-${orientation}`} onClick={() => onOpen(item)} aria-label={`Play ${item.title}`}>
    <video ref={videoRef} src={item.url} poster={`${ASSET_ROOT}/photos/1.jpg`} autoPlay={nearViewport} loop muted playsInline preload={nearViewport ? "auto" : "none"} onLoadedMetadata={(event) => onOrientation(item.id, event.currentTarget.videoWidth >= event.currentTarget.videoHeight ? "horizontal" : "vertical")} onError={() => onOrientation(item.id, "unavailable")} />
    <span className="video-play-mark"><Play size={17} fill="currentColor" /></span>
    <span className="video-tile-caption"><span>{item.title}</span><small>{orientation === "vertical" ? "9:16 / PORTRAIT" : "16:9 / LANDSCAPE"}</small></span>
  </button>;
}

function ExpandedVideo({ item }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) video.play().catch(() => {});
  }

  return <div className="expanded-video-wrap">
    <video ref={videoRef} src={item.url} controls autoPlay muted loop playsInline />
    <button className="video-sound-toggle" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Enable video sound" : "Mute video"}>
      {muted ? <><VolumeX size={17} /> Enable sound</> : <><Volume2 size={17} /> Sound on</>}
    </button>
  </div>;
}

export default function Portfolio() {
  const [manifest, setManifest] = useState(fallbackManifest);
  const requestedFilter = new URLSearchParams(window.location.search).get("filter");
  const [activeTab, setActiveTab] = useState(requestedFilter === "photo" || requestedFilter === "photography" ? "photo" : requestedFilter === "videography" || requestedFilter === "video" ? "vertical" : "all");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [orientations, setOrientations] = useState({});
  const [videoDetectionEnabled, setVideoDetectionEnabled] = useState(false);
  const lightboxCloseRef = useRef(null);

  useEffect(() => {
    fetch("/media-manifest.json").then((response) => response.ok ? response.json() : null).then((data) => {
      if (data?.photos?.length || data?.videos?.length) setManifest({ photos: data.photos || [], videos: data.videos || [] });
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (videoDetectionEnabled || activeTab === "photo") return;
    const sections = document.querySelectorAll(".video-section");
    if (!sections.length) return;
    if (!("IntersectionObserver" in window)) {
      setVideoDetectionEnabled(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVideoDetectionEnabled(true);
        observer.disconnect();
      }
    }, { rootMargin: "280px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeTab, videoDetectionEnabled]);

  const photos = useMemo(() => manifest.photos.map((filename, index) => ({ id: `photo-${index}`, title: titleFromFilename(filename), type: "photo", url: assetUrl("photos", filename) })), [manifest.photos]);
  const videos = useMemo(() => manifest.videos.map((filename, index) => ({ id: `video-${index}`, title: titleFromFilename(filename), type: "video", url: assetUrl("videos", filename) })), [manifest.videos]);
  const lightboxItems = activeTab === "photo" ? photos : activeTab === "vertical" ? videos.filter((item) => orientations[item.id] === "vertical") : activeTab === "horizontal" ? videos.filter((item) => orientations[item.id] === "horizontal") : [...photos, ...videos.filter((item) => orientations[item.id] === "vertical" || orientations[item.id] === "horizontal")];
  const selectedItem = selectedIndex >= 0 ? lightboxItems[selectedIndex] : null;
  const verticalVideos = videos.filter((item) => orientations[item.id] === "vertical");
  const horizontalVideos = videos.filter((item) => orientations[item.id] === "horizontal");

  useEffect(() => {
    if (selectedItem) lightboxCloseRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(-1);
      if (event.key === "ArrowRight" && selectedItem) setSelectedIndex((index) => (index + 1) % lightboxItems.length);
      if (event.key === "ArrowLeft" && selectedItem) setSelectedIndex((index) => (index - 1 + lightboxItems.length) % lightboxItems.length);
      if (event.key === "Tab" && selectedItem) {
        const dialog = document.querySelector(".lightbox");
        const focusable = dialog?.querySelectorAll('button:not([disabled]), video[controls]');
        if (focusable?.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItems.length, selectedItem]);

  const setOrientation = (id, value) => setOrientations((current) => current[id] ? current : { ...current, [id]: value });
  const openItem = (item, collection) => {
    const currentCollection = collection === "photo" ? photos : collection === "vertical" ? verticalVideos : horizontalVideos;
    const targetIndex = currentCollection.findIndex((entry) => entry.id === item.id);
    setActiveTab(collection);
    setSelectedIndex(Math.max(0, targetIndex));
  };

  return <div className="portfolio-site gallery-site">
    <SEO title="Selected Work — Tahir Adamu" description="Photography, vertical films, and landscape video work by Abuja-based media and technology specialist Tahir Adamu." path="/portfolio" />
    <Navigation />
    <main id="main-content" className="gallery-main">
      <section className="gallery-heading"><div><p className="eyebrow"><span className="availability-dot" /> 4T9 MEDIA / SELECTED WORK</p><h1>Made to be<br /><em>seen.</em></h1></div><p>A living archive of images and moving stories, made for people, places, and brands with something to say.</p></section>
      <nav className="gallery-tabs" aria-label="Portfolio categories">{[["all", "Everything"], ["photo", "Photography"], ["vertical", "Vertical film"], ["horizontal", "Landscape film"]].map(([key, label]) => <button key={key} className={activeTab === key ? "gallery-tab is-active" : "gallery-tab"} onClick={() => setActiveTab(key)}>{label}<span>{key === "photo" ? photos.length : key === "vertical" ? verticalVideos.length : key === "horizontal" ? horizontalVideos.length : photos.length + videos.length}</span></button>)}</nav>

      {(activeTab === "all" || activeTab === "photo") && <section className="gallery-section" aria-labelledby="photos-title"><div className="gallery-section-heading"><div><p className="section-label"><span>01</span> STILL IMAGES</p><h2 id="photos-title">Photography</h2></div><p>Tap any frame to open it full screen.</p></div><div className="photo-grid">{photos.map((item, index) => <button className={`photo-tile photo-tile-${index % 7}`} key={item.id} onClick={() => openItem(item, "photo")} aria-label={`Expand photograph ${index + 1}`}><img src={item.url} alt={`Photograph ${index + 1} in Tahir Adamu's portfolio`} loading={index < 4 ? "eager" : "lazy"} /><span className="photo-expand"><Expand size={18} /></span></button>)}</div></section>}

      {(activeTab === "all" || activeTab === "vertical") && <section className="gallery-section video-section" aria-labelledby="vertical-title"><div className="gallery-section-heading"><div><p className="section-label"><span>02</span> PORTRAIT FORMAT</p><h2 id="vertical-title">Vertical films</h2></div><p>Portrait-oriented stories for the small screen.</p></div><div className="video-grid video-grid-vertical">{verticalVideos.map((item) => <VideoCard key={item.id} item={item} orientation="vertical" onOrientation={setOrientation} onOpen={(selected) => openItem(selected, "vertical")} />)}</div>{verticalVideos.length === 0 && <p className="gallery-empty"><LoaderCircle size={16} /> Detecting video formats…</p>}</section>}

      {(activeTab === "all" || activeTab === "horizontal") && <section className="gallery-section video-section" aria-labelledby="horizontal-title"><div className="gallery-section-heading"><div><p className="section-label"><span>03</span> LANDSCAPE FORMAT</p><h2 id="horizontal-title">Landscape films</h2></div><p>Wide-frame commercial and documentary work.</p></div><div className="video-grid video-grid-horizontal">{horizontalVideos.map((item) => <VideoCard key={item.id} item={item} orientation="horizontal" onOrientation={setOrientation} onOpen={(selected) => openItem(selected, "horizontal")} />)}</div>{horizontalVideos.length === 0 && <p className="gallery-empty"><LoaderCircle size={16} /> Detecting video formats…</p>}</section>}
    </main>
    {videoDetectionEnabled && activeTab !== "photo" && <div className="video-metadata-probes" aria-hidden="true">{videos.filter((item) => !orientations[item.id]).map((item) => <video key={item.id} src={item.url} preload="metadata" muted playsInline onLoadedMetadata={(event) => setOrientation(item.id, event.currentTarget.videoWidth >= event.currentTarget.videoHeight ? "horizontal" : "vertical")} onError={() => setOrientation(item.id, "unavailable")} />)}</div>}
    <Footer />
    <AnimatePresence>{selectedItem && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedIndex(-1)} role="dialog" aria-modal="true" aria-label={selectedItem.title}>
      <button ref={lightboxCloseRef} className="lightbox-close" onClick={() => setSelectedIndex(-1)} aria-label="Close preview"><X size={22} /></button>
      <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); setSelectedIndex((index) => (index - 1 + lightboxItems.length) % lightboxItems.length); }} aria-label="Previous item"><ArrowLeft size={22} /></button>
      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>{selectedItem.type === "video" ? <ExpandedVideo key={selectedItem.id} item={selectedItem} /> : <img src={selectedItem.url} alt={selectedItem.title} />}</div>
      <div className="lightbox-caption"><span>{selectedItem.title}</span><small>{String(selectedIndex + 1).padStart(2, "0")} / {String(lightboxItems.length).padStart(2, "0")}</small></div>
      <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); setSelectedIndex((index) => (index + 1) % lightboxItems.length); }} aria-label="Next item"><ArrowRight size={22} /></button>
    </motion.div>}</AnimatePresence>
  </div>;
}
