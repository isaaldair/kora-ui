"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export interface QRReaderProps {
  /** Called whenever a QR is decoded. */
  onDecode: (text: string) => void;
  /** Called on scanner errors (permission, no camera, etc.). */
  onError?: (error: Error) => void;
  /** Frames per second the scanner tries to decode. Default: 10. */
  fps?: number;
  /** Width (px) of the scanner viewport. Default: 320. */
  width?: number;
  /** Height (px) of the scanner viewport. Default: 320. */
  height?: number;
  className?: string;
}

const REGION_ID = "kora-qr-reader";

export function QRReader({
  onDecode,
  onError,
  fps = 10,
  width = 320,
  height = 320,
  className = "",
}: QRReaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const readerRef = useRef<Html5Qrcode | null>(null);
  const [status, setStatus] = useState<"idle" | "starting" | "running" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `${REGION_ID}-${Math.random().toString(36).slice(2, 7)}`;
    if (containerRef.current) containerRef.current.id = id;

    const start = async () => {
      if (!containerRef.current) return;
      setStatus("starting");
      const reader = new Html5Qrcode(id, { verbose: false });
      readerRef.current = reader;
      try {
        await reader.start(
          { facingMode: "environment" },
          { fps, qrbox: { width: width * 0.8, height: height * 0.8 } },
          (decoded) => {
            onDecode(decoded);
          },
          () => {
            /* decoding failures are emitted per-frame; ignore */
          },
        );
        if (!cancelled) setStatus("running");
      } catch (err) {
        if (cancelled) return;
        const e = err instanceof Error ? err : new Error(String(err));
        setErrorMsg(e.message);
        setStatus("error");
        onError?.(e);
      }
    };

    start();

    return () => {
      cancelled = true;
      if (readerRef.current && readerRef.current.isScanning) {
        readerRef.current.stop().catch(() => {
          /* ignore */
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-neutral-900"
        style={{ width, height }}
      />
      {status === "error" && errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}
      {status === "starting" && (
        <p className="text-sm text-[var(--color-foreground-subtle)]">Requesting camera…</p>
      )}
    </div>
  );
}
