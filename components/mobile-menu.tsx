"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
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
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4 py-4" aria-label="Mobile navigation">
            <Link href="/how-it-works" className="px-2 py-1 text-lg" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="/pricing" className="px-2 py-1 text-lg" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/help" className="px-2 py-1 text-lg" onClick={() => setOpen(false)}>
              Help
            </Link>
            <Link href="/login" className="px-2 py-1 text-lg" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" className="px-2 py-1 text-lg" onClick={() => setOpen(false)}>
              Sign up
            </Link>
            <Link
              href="/landlord"
              className="px-2 py-1 text-lg border border-gray-300 rounded-md text-center mt-2"
              onClick={() => setOpen(false)}
            >
              I'm a landlord
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
