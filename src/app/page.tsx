import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServiceCards } from "@/components/home/ServiceCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Proof } from "@/components/home/Proof";
import { InsuranceBlock } from "@/components/home/InsuranceBlock";
import { Reviews } from "@/components/home/Reviews";
import { ContactBlock } from "@/components/home/ContactBlock";

/**
 * Homepage — the eight sections of CLAUDE.md §8, in order.
 * Dark/light rhythm: ink → steel → paper → ink → paper → ink → steel → paper.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceCards />
      <HowItWorks />
      <Proof />
      <InsuranceBlock />
      <Reviews />
      <ContactBlock />
    </>
  );
}
