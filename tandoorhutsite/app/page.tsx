import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { OnlineOrdering } from "@/components/online-ordering"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"
import { PageViewTracker } from "@/components/page-view-tracker"

export default function Home() {
  return (
    <>
      <PageViewTracker page="/" />
      <Navigation />
      <main>
        <Hero />
        <About />
        <OnlineOrdering />
        <ContactInfo />
      </main>
      <Footer />
    </>
  )
}
