import { setRequestLocale } from "next-intl/server";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";
import { Steps } from "@/components/Steps";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.contacts.email,
  sameAs: site.contacts.team.map(({ telegram }) => `https://t.me/${telegram}`),
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Results />
        <Services />
        <Steps />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
