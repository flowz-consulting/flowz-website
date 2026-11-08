import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.registeredName} handles review requests, messages, company data, and cookies.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy · Flowz",
    description: `How ${site.registeredName} handles review requests, messages, company data, and cookies.`,
    url: "/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy · Flowz",
    description: `How ${site.registeredName} handles review requests, messages, company data, and cookies.`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Privacy</h1>
        <div className="mt-10 space-y-10 text-base leading-7 text-muted">
          <p>
            {site.registeredName}, CVR {site.cvr}, {site.address}, is responsible for the personal
            data described here. Write to{" "}
            <a
              href={site.mailto}
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              {site.email}
            </a>{" "}
            if you have a question about it.
          </p>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">
              The review form
            </h2>
            <p className="mt-3">
              If you request a savings review on this site, we collect your name, work email, and
              company name. You can also tell us an approximate annual software spend, an
              approximate number of software vendors, when the next major renewal is, and a short
              message. We use that to reply and to suggest a next step. We do not ask for contracts
              or vendor pricing files on this form. Please do not include them in the message.
            </p>
            <p className="mt-3">
              The form is posted to a private Flowz Discord channel through Discord. Discord
              processes the content in order to deliver it to that channel. We keep the
              correspondence while it is active, and for up to 24 months after the last message,
              unless a contract or a legal duty means we have to keep it longer.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">
              Messages you send us
            </h2>
            <p className="mt-3">
              If you email us, we use your address and what you write to reply. If the note turns
              into a piece of work, we use it for that work. We keep the correspondence while it is
              active, and for up to 24 months after the last message, unless a contract or a legal
              duty means we have to keep it longer.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Company data</h2>
            <p className="mt-3">
              When a company asks us to review its software stack or put AI into its work, we
              handle the material it gives us for that job. That can include contracts, what it
              pays, renewal dates, and the names and contact details of people at the company. We
              use it only for the work, and we store that engagement material in the EU. We do not
              move that stored engagement material outside the EU. This storage note does not
              describe delivery of the public form, which is posted to a private Discord channel.
              The company remains responsible for the data about its own people, and we follow its
              instructions. We keep the material for the engagement and for as long as the contract
              requires after that.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">
              The cookie that remembers your choice
            </h2>
            <p className="mt-3">
              We store one cookie, named flowz_consent, for a year. It records only whether you
              accepted or rejected analytics, so we do not ask on every page. It is needed for that
              choice to stick, and it does not identify you.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Google Analytics</h2>
            <p className="mt-3">
              If you accept, Google Analytics, from Google Ireland Limited, counts visits and shows
              us which pages are read. Google receives the page you viewed and general information
              about the browser. We do not use it to find out who you are. Nothing is measured
              until you accept, and the measurement stays off until we switch it on. You can reject
              it, or change your mind, from Cookies in the footer. Google may process the
              information outside the EU under its standard contractual clauses.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Your rights</h2>
            <p className="mt-3">
              You can ask for a copy of what we hold about you, and ask us to correct it, delete
              it, or limit how we use it. Where we rely on consent, you can withdraw it at any
              time. You can also complain to the Danish Data Protection Agency, Datatilsynet, at
              datatilsynet.dk.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
