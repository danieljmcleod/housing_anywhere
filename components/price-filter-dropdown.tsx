"use client"

import { useState, useRef, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PriceFilterDropdownProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: PriceFilters) => void
  initialFilters?: PriceFilters
}

export interface PriceFilters {
  minPrice: string
  maxPrice: string
  billsIncluded: boolean
  currency: string
}

export function PriceFilterDropdown({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {
    minPrice: "400",
    maxPrice: "3040",
    billsIncluded: false,
    currency: "eur",
  },
}: PriceFilterDropdownProps) {
  const [filters, setFilters] = useState<PriceFilters>(initialFilters)
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

  // Handle input change
  const handleInputChange = (key: keyof PriceFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      billsIncluded: checked,
    }))
  }

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      currency: value,
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      billsIncluded: false,
      currency: "eur",
    })
  }

  // Apply filters and close dropdown
  const applyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  // Generate histogram data (mock data for visualization)
  const generateHistogramData = () => {
    // This would normally come from real data
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
  }

  const histogramData = generateHistogramData()
  const maxBarHeight = Math.max(...histogramData)

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-[350px]"
    >
      <div className="p-4 space-y-6">
        {/* Currency selector */}
        <div className="flex justify-end">
          <Select value={filters.currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eur">Euros (€)</SelectItem>
              <SelectItem value="usd">Dollars ($)</SelectItem>
              <SelectItem value="gbp">Pounds (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Histogram */}
        <div className="h-[100px] w-full flex items-end justify-between">
          {histogramData.map((value, index) => {
            const height = (value / maxBarHeight) * 100
            return <div key={index} className="w-[3px] bg-[#002630] mx-[1px]" style={{ height: `${height}%` }}></div>
          })}
        </div>

        {/* Price range inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">
              Minimum
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {filters.currency === "eur" ? "€" : filters.currency === "usd" ? "$" : "£"}
              </span>
              <input
                type="text"
                id="min-price"
                value={filters.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#002630] focus:border-[#002630]"
                placeholder="Min"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
              Maximum
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {filters.currency === "eur" ? "€" : filters.currency === "usd" ? "$" : "£"}
              </span>
              <input
                type="text"
                id="max-price"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#002630] focus:border-[#002630]"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Bills included checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bills-included"
            checked={filters.billsIncluded}
            onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
          />
          <label
            htmlFor="bills-included"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Bills included
          </label>
        </div>

        {/* Clear button */}
        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-auto text-gray-700 hover:bg-gray-100" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
