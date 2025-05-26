import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { TenantProtection } from "@/components/tenant-protection"
import { MobileMenu } from "@/components/mobile-menu"
import { HeaderLogo } from "@/components/header-logo"
import { CategoryNav } from "@/components/category-nav"
import { FeaturedCities } from "@/components/featured-cities"
import { FeaturedPBSA } from "@/components/featured-pbsa"
import { PropertyCollections } from "@/components/property-collections"
import { TrendingProperties } from "@/components/trending-properties"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Housing Anywhere" width={150} height={40} priority className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/how-it-works" className="text-gray-800 hover:text-gray-600 text-sm font-medium">
            How it works
          </Link>
          <Link href="/pricing" className="text-gray-800 hover:text-gray-600 text-sm font-medium">
            Pricing
          </Link>
          <Link href="/help" className="text-gray-800 hover:text-gray-600 text-sm font-medium">
            Help
          </Link>
          <Link href="/login" className="text-gray-800 hover:text-gray-600 text-sm font-medium">
            Log in
          </Link>
          <Link href="/signup" className="text-gray-800 hover:text-gray-600 text-sm font-medium">
            Sign up
          </Link>
          <Link
            href="/landlord"
            className="text-gray-800 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            I'm a landlord
          </Link>
        </nav>

        <MobileMenu />
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#FF4B27] pt-16 pb-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center text-white">
            <HeaderLogo className="mb-4" />
            <p className="text-xl md:text-2xl mb-6">Rent a place, stay for months.</p>

            <TenantProtection />

            <div className="max-w-4xl mx-auto mt-8 relative z-10">
              <SearchBar />
            </div>

            <div className="mt-4 text-white relative z-10">
              <p>
                Looking for tenants?{" "}
                <Link href="/rent-out" className="underline hover:no-underline">
                  Rent out
                </Link>
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 80"
              fill="#ffffff"
              preserveAspectRatio="none"
              className="w-full"
            >
              <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z"></path>
            </svg>
          </div>
        </section>

        {/* Category Navigation */}
        <div className="container mx-auto px-4">
          <CategoryNav />

          {/* Featured Cities */}
          <FeaturedCities />

          {/* Featured PBSA */}
          <FeaturedPBSA />

          {/* Property Collections */}
          <PropertyCollections />

          {/* Trending Properties */}
          <TrendingProperties />
        </div>
      </main>

      <Footer />
    </div>
  )
}
