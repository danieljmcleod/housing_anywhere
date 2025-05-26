"use client"

import { useState, useRef, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface FurnishingFilterDropdownProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FurnishingFilters) => void
  initialFilters?: FurnishingFilters
}

export interface FurnishingFilters {
  shell: boolean
  upholstered: boolean
  furnished: boolean
}

export function FurnishingFilterDropdown({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {
    shell: false,
    upholstered: false,
    furnished: false,
  },
}: FurnishingFilterDropdownProps) {
  const [filters, setFilters] = useState<FurnishingFilters>(initialFilters)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle checkbox change
  const handleCheckboxChange = (key: keyof FurnishingFilters, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      shell: false,
      upholstered: false,
      furnished: false,
    })
  }

  // Apply filters and close dropdown
  const applyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-64"
    >
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shell"
                checked={filters.shell}
                onCheckedChange={(checked) => handleCheckboxChange("shell", checked as boolean)}
              />
              <label
                htmlFor="shell"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Shell (unfurnished)
              </label>
            </div>
            <span className="text-sm text-gray-500">142</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="upholstered"
                checked={filters.upholstered}
                onCheckedChange={(checked) => handleCheckboxChange("upholstered", checked as boolean)}
              />
              <label
                htmlFor="upholstered"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Upholstered
              </label>
            </div>
            <span className="text-sm text-gray-500">89</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={filters.furnished}
                onCheckedChange={(checked) => handleCheckboxChange("furnished", checked as boolean)}
              />
              <label
                htmlFor="furnished"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Furnished
              </label>
            </div>
            <span className="text-sm text-gray-500">412</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full text-gray-700 hover:bg-gray-100" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
