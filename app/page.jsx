import Map from "@/components/Map/Map"
import HeroSection from "@/components/Hero/Hero"
import SponsorsSection from "@/components/Sponsors/Sponsors"
import AboutSection from "@/components/About/About"
import FinalSection from "@components/FinalSection/FinalSection"
import CommentsSection from "@components/Comments/Comments"

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <AboutSection />
      <CommentsSection />
      <FinalSection />
    </>
  )
}
