"use client";

import { useEffect, useRef } from "react";
import IMask, { type FactoryArg } from "imask";

export interface InputMaskProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue"
  > {
  /**
   * Mask definition. Strings like `"+52 (000) 000-0000"` or iMask config
   * objects (regex, numeric ranges, etc.) are accepted.
   */
  mask: FactoryArg;
  /** Controlled value. */
  value?: string;
  /** Fires with both the unmasked + masked value on every change. */
  onAccept?: (value: string, masked: string) => void;
}

const base =
  "block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 font-mono text-sm transition-colors " +
  "placeholder:text-neutral-400 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 " +
  "dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

export function InputMask({
  mask,
  value,
  onAccept,
  className = "",
  ...rest
}: InputMaskProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const maskRef = useRef<ReturnType<typeof IMask> | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const instance = IMask(inputRef.current, mask);
    maskRef.current = instance;
    instance.on("accept", () => {
      onAccept?.(instance.unmaskedValue, instance.value);
    });
    return () => {
      instance.destroy();
      maskRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!maskRef.current || value === undefined) return;
    if (maskRef.current.value !== value) {
      maskRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      className={[base, className].filter(Boolean).join(" ")}
      defaultValue={value}
      {...rest}
    />
  );
}
