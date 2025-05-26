"use client"

import { useState } from "react"
import { ChevronDown, Shield } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function TenantProtection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 mx-auto text-white"
          aria-label="Learn about tenant protection"
          aria-expanded={isOpen}
        >
          <Shield size={20} className="text-white" aria-hidden="true" />
          <span className="underline">Covered by Tenant Protection</span>
          <ChevronDown
            size={16}
            className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Tenant Protection</h3>
          <p className="text-sm text-gray-600">
            Our Tenant Protection program safeguards your booking and ensures a smooth rental experience.
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
            <li>Secure payments through our platform</li>
            <li>Verified listings to prevent scams</li>
            <li>24/7 customer support</li>
            <li>Assistance with move-in issues</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
