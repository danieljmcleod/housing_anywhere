import Image from "next/image"
import Link from "next/link"
import { Globe, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#f5f8fa] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and language selector */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/logo.svg" alt="HousingAnywhere" width={180} height={48} />
            </Link>

            <div className="flex items-center text-gray-700">
              <Globe className="h-5 w-5 mr-2" />
              <span className="mr-2">English</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* HousingAnywhere links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">HousingAnywhere</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-700 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-700 hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-700 hover:text-gray-900">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-700 hover:text-gray-900">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-700 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-700 hover:text-gray-900">
                  Cookie policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-700 hover:text-gray-900">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Tenants links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Tenants</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-700 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/pay-rent" className="text-gray-700 hover:text-gray-900">
                  Pay rent online
                </Link>
              </li>
            </ul>

            <h3 className="font-bold text-gray-800 mt-6 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-700 hover:text-gray-900">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Landlords links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Landlords</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/landlords/how-it-works" className="text-gray-700 hover:text-gray-900">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/landlords/pricing" className="text-gray-700 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/become-landlord" className="text-gray-700 hover:text-gray-900">
                  Become a landlord
                </Link>
              </li>
              <li>
                <Link href="/collect-rent" className="text-gray-700 hover:text-gray-900">
                  Collect rent online
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-700 hover:text-gray-900">
                  How-to guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                  Landlord blog
                </Link>
              </li>
              <li>
                <Link href="/rentradar" className="text-gray-700 hover:text-gray-900">
                  RentRadar
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-700 hover:text-gray-900">
                  HousingAnywhere API
                </Link>
              </li>
              <li>
                <Link href="/contracts" className="text-gray-700 hover:text-gray-900">
                  Sample rental contracts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media links */}
        <div className="flex justify-end mt-8 space-x-4">
          <Link href="https://facebook.com" className="text-gray-700 hover:text-gray-900">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="https://twitter.com" className="text-gray-700 hover:text-gray-900">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://linkedin.com" className="text-gray-700 hover:text-gray-900">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://youtube.com" className="text-gray-700 hover:text-gray-900">
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link href="https://instagram.com" className="text-gray-700 hover:text-gray-900">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
