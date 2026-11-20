"use client";

import { useMemo, useCallback, useEffect, useState } from "react";
import { OverlayLayerProps } from "./types";
import styles from "./OverlayLayer.module.css";

// Only import Player on client side to avoid SSR issues
let Player: React.ComponentType<any> | null = null;
let remotionLicenseAcknowledged = false;

async function loadPlayer() {
  if (Player) return Player;
  if (typeof window === "undefined") return null;

  try {
    const mod = await import("@remotion/player");
    Player = mod.Player;
    // Acknowledge Remotion license
    remotionLicenseAcknowledged = true;
    return Player;
  } catch {
    return null;
  }
}

export function OverlayLayer({
  progress,
  totalFrames,
  fps,
  composition: Composition,
  compositionProps = {},
}: OverlayLayerProps) {
  const [PlayerComponent, setPlayerComponent] = useState<React.ComponentType<any> | null>(null);
  const frame = useMemo(() => Math.round(progress * totalFrames), [progress, totalFrames]);

  const handleCompositionMount = useCallback(() => {
    // Player is mounted and ready
  }, []);

  useEffect(() => {
    loadPlayer().then(setPlayerComponent);
  }, []);

  if (!PlayerComponent) {
    return (
      <div className={styles.overlayContainer} aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <div className={styles.loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-secondary)" }}>
          Loading Remotion Player...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlayContainer} aria-hidden="true">
      <PlayerComponent
        component={Composition}
        durationInFrames={totalFrames}
        fps={fps}
        onCompositionMount={handleCompositionMount}
        showAudioControls={false}
        showTimeline={false}
        style={styles.player}
        loop={false}
        muted={true}
        playing={false}
        defaultFrame={frame}
        onFrameChange={() => {}}
        width={1920}
        height={1080}
        className={styles.playerWrapper}
        acknowledgeRemotionLicense={true}
      />
    </div>
  );
}