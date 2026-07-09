import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Kryvazent collects, uses, stores, and protects personal information.",
  alternates: { canonical: "/privacy/" },
};

const updated = "July 9, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-6 pb-16 pt-36 text-foreground">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back to Kryvazent</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-primary font-syncopate">Legal</p>
        <h1 className="mt-3 text-3xl font-bold font-syncopate md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted">Last updated: {updated}</p>

        <div className="mt-12 space-y-10 leading-relaxed text-muted">
          <PolicySection title="1. Who we are">
            <p>Kryvazent Systems Inc. (“Kryvazent”, “we”, “us”) is a software and technology engineering company based in Colombo, Sri Lanka. This policy explains how we handle information collected through our website, contact forms, customer relationships, and administrative tools.</p>
          </PolicySection>
          <PolicySection title="2. Information we collect">
            <p>We may collect your name, email address, telephone number, company, project requirements, messages, and other information you choose to provide. Our systems may also receive basic technical information such as IP address, browser type, device type, referring page, timestamps, and security logs.</p>
          </PolicySection>
          <PolicySection title="3. How we use information">
            <p>We use information to respond to enquiries, scope and deliver services, manage customer relationships, operate and secure our systems, improve our website, comply with legal obligations, and communicate about relevant services where permitted.</p>
          </PolicySection>
          <PolicySection title="4. Contact forms and service providers">
            <p>Website enquiries are processed through Web3Forms. Website and administrative content may be stored in MongoDB. Hosting, email, analytics, infrastructure, and security providers may process limited information on our behalf under their own contractual and privacy obligations.</p>
          </PolicySection>
          <PolicySection title="5. AI and marketing automation">
            <p>Authorized administrators may use Google Gemini to create marketing strategies, captions, and creative briefs, and Json2Video to render approved video content. Campaign prompts and approved marketing material may be sent to these providers. We do not intentionally submit private customer information to these tools unless it is necessary, authorized, and appropriately protected.</p>
          </PolicySection>
          <PolicySection title="6. Social media publishing">
            <p>When social accounts are connected, approved content and media may be transmitted to the relevant platform or an authorized automation connector such as n8n, Make, or Zapier. Each platform processes information under its own privacy policy. Access credentials are encrypted in our database and are not exposed to the public website.</p>
          </PolicySection>
          <PolicySection title="7. Cookies and local storage">
            <p>The website may use browser storage required for content fallback and authenticated administration. The admin area uses session storage for its login token. We may introduce analytics or preference cookies in the future; where legally required, we will provide appropriate notice and consent controls.</p>
          </PolicySection>
          <PolicySection title="8. Sharing and international transfers">
            <p>We do not sell personal information. We may share information with service providers, professional advisers, authorities where legally required, or a successor in connection with a business transaction. Providers may process information outside Sri Lanka, subject to appropriate safeguards where required.</p>
          </PolicySection>
          <PolicySection title="9. Retention and security">
            <p>We retain information only as long as reasonably necessary for the purposes described above, contractual requirements, security, dispute resolution, and law. We use reasonable technical and organizational safeguards, but no internet service can guarantee absolute security.</p>
          </PolicySection>
          <PolicySection title="10. Your choices and rights">
            <p>Depending on applicable law, you may request access, correction, deletion, restriction, or a copy of your personal information, or object to certain processing. You may also withdraw consent where processing relies on consent. Some information may need to be retained for legal or legitimate business reasons.</p>
          </PolicySection>
          <PolicySection title="11. Children">
            <p>Our services are intended for businesses and are not directed to children. We do not knowingly collect personal information from children through this website.</p>
          </PolicySection>
          <PolicySection title="12. Changes and contact">
            <p>We may update this policy as our services or legal requirements change. The latest version will appear on this page. For privacy questions or requests, contact <a href="mailto:info@kryvazent.com" className="font-bold text-primary hover:underline">info@kryvazent.com</a>.</p>
          </PolicySection>
        </div>
      </article>
      </main>
      <Footer />
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-3 text-xl font-bold text-foreground font-syncopate">{title}</h2>{children}</section>;
}
