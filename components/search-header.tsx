"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { SearchModal } from "@/components/search-modal"

export function SearchHeader() {
  const searchParams = useSearchParams()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const locationParam = searchParams?.get("location") || "Rotterdam"
  const moveInParam = searchParams?.get("moveIn")
  const moveOutParam = searchParams?.get("moveOut")

  // Format the display text for the search input
  const searchDisplayText =
    moveInParam && moveOutParam
      ? `${locationParam}, ${moveInParam} - ${moveOutParam}`
      : `${locationParam}, 1 Jul - 31 Dec 2023`

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Housing Anywhere" width={150} height={40} className="h-8 w-auto" />
        </Link>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <button
              type="button"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-left text-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              onClick={() => setIsSearchModalOpen(true)}
            >
              {searchDisplayText}
            </button>

            <SearchModal
              isOpen={isSearchModalOpen}
              onClose={() => setIsSearchModalOpen(false)}
              initialLocation={locationParam}
              initialMoveIn={moveInParam ? new Date(moveInParam) : undefined}
              initialMoveOut={moveOutParam ? new Date(moveOutParam) : undefined}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hidden md:block">
            How it works
          </Link>
          <Link href="/signup" className="text-sm font-medium text-gray-700 hidden md:block">
            Sign up
          </Link>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700" aria-label="Language">
            <span className="font-medium">🌐</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
