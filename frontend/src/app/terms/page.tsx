import type { Metadata } from "next";
import Link from "next/link";
import NavNew from "@/components/ui-new/NavNew";
import FooterNew from "@/components/ui-new/FooterNew";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Kryvazent website and services.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <NavNew />
      <main className="min-h-screen bg-background px-6 pb-16 pt-36 text-foreground">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-bold text-primary hover:underline">
          ← Back to Kryvazent
        </Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-primary font-syncopate">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold font-syncopate md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-muted">Last updated: July 9, 2026</p>

        <div className="mt-12 space-y-10 leading-relaxed text-muted">
          <TermsSection title="1. Agreement to these terms">
            <p>
              These Terms of Service govern your use of the Kryvazent website
              and any services provided under a proposal, statement of work, or
              other written agreement. By using this website, you agree to
              these terms. If you engage Kryvazent for a project, the signed
              project agreement will control where it conflicts with these
              website terms.
            </p>
          </TermsSection>

          <TermsSection title="2. About our services">
            <p>
              Kryvazent provides software planning, design, web and mobile
              development, backend and API engineering, cloud and DevOps work,
              AI integration, user-experience engineering, maintenance, and
              related technology services. Website descriptions and starting
              prices are informational and do not constitute a binding offer.
            </p>
          </TermsSection>

          <TermsSection title="3. Proposals, scope, and changes">
            <p>
              Project scope, deliverables, assumptions, schedule, fees, support,
              and acceptance criteria will be stated in a written proposal or
              statement of work. Requests outside the agreed scope may require
              a revised schedule and additional fees. Estimates may change when
              requirements, dependencies, or technical constraints change.
            </p>
          </TermsSection>

          <TermsSection title="4. Client responsibilities">
            <p>
              Clients must provide accurate requirements, timely feedback,
              required access, lawful content, appropriate personnel, and
              decisions needed to deliver the work. Clients are responsible for
              obtaining rights and permissions for materials, data, accounts,
              and third-party services they provide.
            </p>
          </TermsSection>

          <TermsSection title="5. Fees and payment">
            <p>
              Fees, payment milestones, taxes, expenses, deposits, and refund
              terms are defined in the applicable project agreement. Unless
              otherwise agreed, work may be paused when an invoice is overdue.
              Third-party hosting, API, licensing, app-store, advertising, and
              usage charges are the client&apos;s responsibility.
            </p>
          </TermsSection>

          <TermsSection title="6. Intellectual property">
            <p>
              Each party retains ownership of materials, tools, code, designs,
              data, trademarks, and know-how it owned before the project.
              Ownership or licensing of project deliverables will be specified
              in the project agreement and may depend on full payment.
              Kryvazent may continue using general skills, techniques,
              reusable components, and non-confidential knowledge.
            </p>
          </TermsSection>

          <TermsSection title="7. Third-party services">
            <p>
              Projects may rely on external platforms such as hosting
              providers, databases, payment processors, AI services, social
              networks, app stores, and automation tools. Their availability,
              pricing, policies, and data practices are controlled by those
              providers. Kryvazent is not responsible for third-party changes
              or outages outside its reasonable control.
            </p>
          </TermsSection>

          <TermsSection title="8. AI and automated content">
            <p>
              AI-generated strategies, text, images, scripts, or videos may
              contain errors, omissions, or unsuitable material. Users must
              review and approve generated content before publication and
              remain responsible for factual accuracy, intellectual-property
              clearance, disclosures, platform compliance, and final use.
            </p>
          </TermsSection>

          <TermsSection title="9. Social media automation">
            <p>
              Automated publishing requires authorized social accounts and
              compliance with each platform&apos;s terms. You must not use the
              service for spam, impersonation, deceptive content, unlawful
              advertising, harassment, or infringement. Access may be paused
              when credentials expire, provider limits are reached, or a
              platform rejects content.
            </p>
          </TermsSection>

          <TermsSection title="10. Acceptable website use">
            <p>
              You may not interfere with the website, attempt unauthorized
              access, introduce malicious code, scrape protected areas, misuse
              forms, bypass security or usage controls, or use the website in a
              way that violates applicable law or another person&apos;s rights.
            </p>
          </TermsSection>

          <TermsSection title="11. Confidentiality and data protection">
            <p>
              Confidentiality obligations for client projects will be
              specified in the applicable agreement. Personal information is
              handled as described in our{" "}
              <Link href="/privacy/" className="font-bold text-primary hover:underline">
                Privacy Policy
              </Link>
              . Clients remain responsible for ensuring that data supplied for
              a project may lawfully be processed.
            </p>
          </TermsSection>

          <TermsSection title="12. Warranties and disclaimers">
            <p>
              Kryvazent will perform agreed services with reasonable skill and
              care. Except for express commitments in a written agreement, the
              website and its content are provided on an “as available” basis.
              We do not guarantee uninterrupted operation, particular business
              results, search rankings, social engagement, or compatibility
              with every future third-party change.
            </p>
          </TermsSection>

          <TermsSection title="13. Limitation of liability">
            <p>
              To the extent permitted by applicable law, neither party will be
              liable for indirect, incidental, special, punitive, or
              consequential loss arising from website use. Any project-specific
              liability limits will be stated in the applicable agreement.
              Nothing in these terms excludes liability that cannot lawfully be
              excluded.
            </p>
          </TermsSection>

          <TermsSection title="14. Suspension and termination">
            <p>
              We may suspend website or service access to address security
              risks, unlawful activity, provider restrictions, or material
              breaches. Project termination rights, notice periods, payment for
              completed work, and handover obligations are governed by the
              relevant project agreement.
            </p>
          </TermsSection>

          <TermsSection title="15. Governing terms and changes">
            <p>
              Applicable law and dispute-resolution arrangements for paid work
              will be stated in the project agreement. We may update these
              website terms when our services or legal obligations change. The
              updated date above identifies the latest version.
            </p>
          </TermsSection>

          <TermsSection title="16. Contact">
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@kryvazent.com" className="font-bold text-primary hover:underline">
                info@kryvazent.com
              </a>
              .
            </p>
          </TermsSection>
        </div>
      </article>
      </main>
      <FooterNew />
    </>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-foreground font-syncopate">
        {title}
      </h2>
      {children}
    </section>
  );
}
