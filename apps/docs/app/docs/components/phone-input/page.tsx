import type { Metadata } from "next";
import { PhoneInputDemo } from "./phone-input-demo";

export const metadata: Metadata = {
  title: "Phone input",
  description:
    "International phone input with country picker, live formatting, and E.164 validation.",
};

export default function PhoneInputPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Phone input</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          International phone input backed by{" "}
          <code>libphonenumber-js</code>. Country picker with flag, live
          as-you-type formatting, and E.164 output.
        </p>
      </header>

      <PhoneInputDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { PhoneInput } from "kora-ui/client";

const [phone, setPhone] = useState("");
const [valid, setValid] = useState(false);

<PhoneInput
  defaultCountry="MX"
  countries={["MX", "US", "CA", "ES"]}
  onChange={(e164, isValid) => {
    setPhone(e164);
    setValid(isValid);
  }}
/>`}</code>
        </pre>
      </section>
    </article>
  );
}
