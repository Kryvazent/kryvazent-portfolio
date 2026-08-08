/**
 * PageNew — drop-in replacement for the root page.
 * Assembles all ui-new components in the same order as kryvazent-preview.html.
 *
 * Usage in app/page.tsx (swap import if desired):
 *   import PageNew from "@/components/ui-new/PageNew";
 *   export default function Home() { return <PageNew />; }
 */

import NavNew from "./NavNew";
import HeroNew from "./HeroNew";
import CapabilityStrip from "./CapabilityStrip";
import ServicesNew from "./ServicesNew";
import AboutNew from "./AboutNew";
import ProcessNew from "./ProcessNew";
import ProjectsNew from "./ProjectsNew";
import PartnersNew from "./PartnersNew";
import PricingNew from "./PricingNew";
import FAQNew from "./FAQNew";
import CTABannerNew from "./CTABannerNew";
import ContactNew from "./ContactNew";
import FooterNew from "./FooterNew";
import HomeStructuredData from "@/components/HomeStructuredData";

export default function PageNew() {
  return (
    <>
      <HomeStructuredData />
      {/* Nav also renders the back-to-top button and progress bar */}
      <NavNew />
      <main>
        <HeroNew />
        <CapabilityStrip />
        <ServicesNew />
        <AboutNew />
        <ProcessNew />
        <ProjectsNew />
        <PartnersNew />
        <PricingNew />
        <FAQNew />
        <CTABannerNew />
        <ContactNew />
      </main>
      <FooterNew />
    </>
  );
}
