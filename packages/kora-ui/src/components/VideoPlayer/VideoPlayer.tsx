"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type VideoHTMLAttributes,
} from "react";

export interface VideoPlayerProps
  extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "controls"> {
  /** Video source URL. Supports direct media files (mp4, webm) and YouTube URLs. */
  src: string;
  /** Optional poster image. Falls back to YouTube's maxres thumbnail for YouTube URLs. */
  poster?: string;
  /** Accent color for progress/volume (native player only). Default: theme accent. */
  accent?: string;
  /** Autoplay on first click. Default: true. For YouTube, starts the embed on click. */
  autoplayOnClick?: boolean;
  className?: string;
}

type YouTubeInfo = { id: string; list?: string; start?: number };

function parseYouTube(url: string): YouTubeInfo | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const list = u.searchParams.get("list") ?? undefined;
    const start = u.searchParams.get("t") ?? u.searchParams.get("start");
    const startSec = start
      ? parseInt(start.replace(/[^\d]/g, ""), 10) || undefined
      : undefined;
    if (host === "youtu.be") {
      return { id: u.pathname.slice(1), list, start: startSec };
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id ? { id, list, start: startSec } : null;
      }
      if (u.pathname.startsWith("/embed/")) {
        return { id: u.pathname.slice(7), list, start: startSec };
      }
      if (u.pathname.startsWith("/shorts/")) {
        return { id: u.pathname.slice(8), list, start: startSec };
      }
    }
    return null;
  } catch {
    return null;
  }
}

function youTubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function youTubeEmbedUrl(info: YouTubeInfo, autoplay: boolean) {
  const params = new URLSearchParams();
  params.set("autoplay", autoplay ? "1" : "0");
  params.set("rel", "0");
  params.set("modestbranding", "1");
  if (info.list) params.set("list", info.list);
  if (info.start) params.set("start", String(info.start));
  return `https://www.youtube.com/embed/${info.id}?${params.toString()}`;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function VideoPlayer({
  src,
  poster,
  accent = "var(--color-accent, #2563eb)",
  autoplayOnClick = true,
  className = "",
  ...videoProps
}: VideoPlayerProps) {
  const youtube = useMemo(() => parseYouTube(src), [src]);
  if (youtube) {
    return (
      <YouTubePlayer
        info={youtube}
        poster={poster ?? youTubeThumbnail(youtube.id)}
        autoplayOnClick={autoplayOnClick}
        className={className}
      />
    );
  }
  return (
    <NativeVideoPlayer
      src={src}
      poster={poster}
      accent={accent}
      className={className}
      videoProps={videoProps}
    />
  );
}

function YouTubePlayer({
  info,
  poster,
  autoplayOnClick,
  className,
}: {
  info: YouTubeInfo;
  poster: string;
  autoplayOnClick: boolean;
  className: string;
}) {
  const [activated, setActivated] = useState(false);
  const embedUrl = useMemo(
    () => youTubeEmbedUrl(info, autoplayOnClick),
    [info, autoplayOnClick],
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-black ${className}`}
    >
      {activated ? (
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label="Play video"
          className="group/play block h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            className="block h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover/play:bg-black/30">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-xl transition-transform group-hover/play:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            YouTube
          </span>
        </button>
      )}
    </div>
  );
}

function NativeVideoPlayer({
  src,
  poster,
  accent,
  className,
  videoProps,
}: {
  src: string;
  poster: string | undefined;
  accent: string;
  className: string;
  videoProps: Omit<VideoHTMLAttributes<HTMLVideoElement>, "controls" | "src" | "poster">;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setCurrent(v.currentTime);
    const onLoaded = () => setDuration(v.duration);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  const seek = (value: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = value;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-black ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        className="block h-full w-full"
        {...videoProps}
      />

      {/* Big play overlay when paused */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition-opacity hover:bg-black/30"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-xl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {/* Controls bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <span className="font-mono text-xs tabular-nums">
          {formatTime(current)} / {formatTime(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          className="flex-1 appearance-none bg-transparent"
          style={{ accentColor: accent }}
          aria-label="Seek"
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
        >
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
