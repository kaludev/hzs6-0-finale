import Map from "@/components/Map/Map"
import HeroSection from "@/components/Hero/Hero"
import SponsorsSection from "@/components/Sponsors/Sponsors"
import AboutSection from "@/components/About/About"

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <AboutSection />
      <Map />
    </>
  )
}
