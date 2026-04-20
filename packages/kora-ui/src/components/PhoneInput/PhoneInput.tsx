"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import {
  AsYouType,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";

export interface PhoneInputProps {
  /** Current value in E.164 format (`+525512345678`). */
  value?: string;
  /** Fires with `(e164, isValid)`. */
  onChange?: (value: string, valid: boolean) => void;
  /** Default ISO country code (uppercase). */
  defaultCountry?: CountryCode;
  /** Restrict the country picker to this allowlist. */
  countries?: CountryCode[];
  /** Placeholder for the number input. */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_COUNTRIES: CountryCode[] = [
  "US",
  "MX",
  "CA",
  "GB",
  "ES",
  "AR",
  "BR",
  "CL",
  "CO",
  "PE",
  "UY",
  "VE",
  "DE",
  "FR",
  "IT",
  "NL",
  "PT",
  "JP",
  "CN",
  "IN",
  "AU",
];

function countryFlag(code: string) {
  // ISO alpha-2 → regional indicator emoji
  return code
    .toUpperCase()
    .replace(/./g, (c) =>
      String.fromCodePoint(127397 + c.charCodeAt(0)),
    );
}

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "US",
  countries = DEFAULT_COUNTRIES,
  placeholder = "555 123 4567",
  disabled = false,
  className = "",
}: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [local, setLocal] = useState(() => value ?? "");

  const formatted = useMemo(
    () => new AsYouType(country).input(local),
    [country, local],
  );

  const e164 = useMemo(() => {
    const parser = new AsYouType(country);
    parser.input(local);
    return parser.getNumber()?.number ?? "";
  }, [country, local]);

  const valid = e164 ? isValidPhoneNumber(e164) : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setLocal(next);
    const parser = new AsYouType(country);
    parser.input(next);
    const nextE164 = parser.getNumber()?.number ?? "";
    const nextValid = nextE164 ? isValidPhoneNumber(nextE164) : false;
    onChange?.(nextE164, nextValid);
  };

  const handleCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as CountryCode;
    setCountry(next);
    const parser = new AsYouType(next);
    parser.input(local);
    const nextE164 = parser.getNumber()?.number ?? "";
    const nextValid = nextE164 ? isValidPhoneNumber(nextE164) : false;
    onChange?.(nextE164, nextValid);
  };

  return (
    <div
      className={[
        "flex items-stretch overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-background)] transition-colors focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-background)]",
        disabled ? "opacity-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-1 border-r border-[var(--color-border)] bg-[var(--color-background-secondary)] pl-2 pr-1 text-sm">
        <span className="text-lg leading-none" aria-hidden="true">
          {countryFlag(country)}
        </span>
        <select
          value={country}
          onChange={handleCountry}
          disabled={disabled}
          aria-label="Country"
          className="appearance-none bg-transparent py-2 pr-5 text-sm text-[var(--color-foreground)] outline-none"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c} +{getCountryCallingCode(c)}
            </option>
          ))}
        </select>
      </div>
      <input
        type="tel"
        value={formatted}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-foreground-subtle)]"
        aria-invalid={local && !valid ? true : undefined}
      />
    </div>
  );
}
