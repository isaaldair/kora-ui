"use client";

import EmojiPickerReact, {
  EmojiStyle,
  Theme,
  type EmojiClickData,
} from "emoji-picker-react";

export interface EmojiPickerProps {
  /** Called when an emoji is selected. */
  onEmojiClick?: (emoji: EmojiClickData) => void;
  /** Search placeholder. Default: "Search emoji". */
  searchPlaceholder?: string;
  /** Follow light/dark or force. Default: `"auto"`. */
  theme?: "light" | "dark" | "auto";
  /** Visual style. Default: `"native"` (system emoji, smallest). */
  emojiStyle?: "native" | "apple" | "google" | "twitter" | "facebook";
  /** Width of the picker. Default: 320. */
  width?: number;
  /** Height of the picker. Default: 400. */
  height?: number;
  className?: string;
}

const THEME: Record<string, Theme> = {
  light: Theme.LIGHT,
  dark: Theme.DARK,
  auto: Theme.AUTO,
};

const STYLE: Record<string, EmojiStyle> = {
  native: EmojiStyle.NATIVE,
  apple: EmojiStyle.APPLE,
  google: EmojiStyle.GOOGLE,
  twitter: EmojiStyle.TWITTER,
  facebook: EmojiStyle.FACEBOOK,
};

export function EmojiPicker({
  onEmojiClick,
  searchPlaceholder = "Search emoji",
  theme = "auto",
  emojiStyle = "native",
  width = 320,
  height = 400,
  className = "",
}: EmojiPickerProps) {
  return (
    <div className={className}>
      <EmojiPickerReact
        onEmojiClick={onEmojiClick}
        searchPlaceHolder={searchPlaceholder}
        theme={THEME[theme]}
        emojiStyle={STYLE[emojiStyle]}
        width={width}
        height={height}
      />
    </div>
  );
}
