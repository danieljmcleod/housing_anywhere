"use client"

import { useState, useRef, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface PropertyTypeDropdownProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: PropertyTypeFilters) => void
  initialFilters?: PropertyTypeFilters
}

export interface PropertyTypeFilters {
  sharedRoom: boolean
  privateRoom: boolean
  studio: boolean
  apartment: boolean
  oneBedroom: boolean
  twoBedrooms: boolean
  threeBedrooms: boolean
  fourPlusBedrooms: boolean
  studentResidence: boolean
}

export function PropertyTypeDropdown({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {
    sharedRoom: false,
    privateRoom: false,
    studio: false,
    apartment: false,
    oneBedroom: false,
    twoBedrooms: false,
    threeBedrooms: false,
    fourPlusBedrooms: false,
    studentResidence: false,
  },
}: PropertyTypeDropdownProps) {
  const [filters, setFilters] = useState<PropertyTypeFilters>(initialFilters)
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
  const handleCheckboxChange = (key: keyof PropertyTypeFilters, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sharedRoom: false,
      privateRoom: false,
      studio: false,
      apartment: false,
      oneBedroom: false,
      twoBedrooms: false,
      threeBedrooms: false,
      fourPlusBedrooms: false,
      studentResidence: false,
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="shared-room"
              checked={filters.sharedRoom}
              onCheckedChange={(checked) => handleCheckboxChange("sharedRoom", checked as boolean)}
            />
            <label
              htmlFor="shared-room"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Shared room
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="private-room"
              checked={filters.privateRoom}
              onCheckedChange={(checked) => handleCheckboxChange("privateRoom", checked as boolean)}
            />
            <label
              htmlFor="private-room"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Private room
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="studio"
              checked={filters.studio}
              onCheckedChange={(checked) => handleCheckboxChange("studio", checked as boolean)}
            />
            <label
              htmlFor="studio"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Studio
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="apartment"
              checked={filters.apartment}
              onCheckedChange={(checked) => handleCheckboxChange("apartment", checked as boolean)}
            />
            <label
              htmlFor="apartment"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apartment
            </label>
          </div>

          {/* Indented bedroom options */}
          <div className="pl-6 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="one-bedroom"
                checked={filters.oneBedroom}
                onCheckedChange={(checked) => handleCheckboxChange("oneBedroom", checked as boolean)}
              />
              <label
                htmlFor="one-bedroom"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                1 bedroom
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="two-bedrooms"
                checked={filters.twoBedrooms}
                onCheckedChange={(checked) => handleCheckboxChange("twoBedrooms", checked as boolean)}
              />
              <label
                htmlFor="two-bedrooms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                2 bedrooms
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="three-bedrooms"
                checked={filters.threeBedrooms}
                onCheckedChange={(checked) => handleCheckboxChange("threeBedrooms", checked as boolean)}
              />
              <label
                htmlFor="three-bedrooms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                3 bedrooms
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="four-plus-bedrooms"
                checked={filters.fourPlusBedrooms}
                onCheckedChange={(checked) => handleCheckboxChange("fourPlusBedrooms", checked as boolean)}
              />
              <label
                htmlFor="four-plus-bedrooms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                4+ bedrooms
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="student-residence"
              checked={filters.studentResidence}
              onCheckedChange={(checked) => handleCheckboxChange("studentResidence", checked as boolean)}
            />
            <label
              htmlFor="student-residence"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Student residence
            </label>
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
