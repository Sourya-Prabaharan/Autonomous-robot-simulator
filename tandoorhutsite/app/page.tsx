import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Menu } from "@/components/menu"
import { FeaturedDishes } from "@/components/featured-dishes"
import { LunchSpecials } from "@/components/lunch-specials"
import { OnlineOrdering } from "@/components/online-ordering"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"
import { PageViewTracker } from "@/components/page-view-tracker"

/**
 * Home Page Component - Main landing page for Tandoor Hut
 *
 * Features:
 * - Complete restaurant website with all sections
 * - Analytics tracking for page views and interactions
 * - Responsive design for all devices
 * - SEO optimized content
 */
export default function HomePage() {
  return (
    <>
      {/* Analytics tracking component */}
      <PageViewTracker />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <FeaturedDishes />
        <Menu />
        <LunchSpecials />
        <OnlineOrdering />
        <ContactInfo />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
