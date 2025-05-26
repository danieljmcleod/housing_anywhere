"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { SearchHeader } from "@/components/search-header"
import { FilterBar } from "@/components/filter-bar"
import { PropertyGrid } from "@/components/property-grid"
import { Pagination } from "@/components/pagination"
import { ViewToggle } from "@/components/view-toggle"
// Add the imports
import type { PropertyTypeFilters } from "@/components/property-type-dropdown"
import type { PriceFilters } from "@/components/price-filter-dropdown"
import type { FurnishingFilters } from "@/components/furnishing-filter-dropdown"

export function SearchResultsPage() {
  const [activeFilter, setActiveFilter] = useState("Anyone")
  const [view, setView] = useState("list")
  const [currentPage, setCurrentPage] = useState(1)
  const [depositFilters, setDepositFilters] = useState<{ noDeposit: boolean; depositSaver: boolean }>({
    noDeposit: false,
    depositSaver: false,
  })
  const [propertyTypeFilters, setPropertyTypeFilters] = useState<PropertyTypeFilters>({
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
  // Add price filters state
  const [priceFilters, setPriceFilters] = useState<PriceFilters>({
    minPrice: "",
    maxPrice: "",
    billsIncluded: false,
    currency: "eur",
  })
  // Add furnishing filters state
  const [furnishingFilters, setFurnishingFilters] = useState<FurnishingFilters>({
    shell: false,
    upholstered: false,
    furnished: false,
  })
  const [filteredListingsCount, setFilteredListingsCount] = useState(0)
  const searchParams = useSearchParams()

  // Get location from search params
  const locationParam = searchParams.get("location") || ""

  // Format the location display
  // If location contains a comma (like "Amsterdam, Netherlands"), use it as is
  // Otherwise add the country for known cities
  const getLocationDisplay = () => {
    if (!locationParam) return ""

    if (locationParam.includes(",")) {
      return locationParam
    }

    // Add country for known cities
    const knownCities: Record<string, string> = {
      Berlin: "Germany",
      Amsterdam: "Netherlands",
      Barcelona: "Spain",
      Paris: "France",
      London: "United Kingdom",
      Rome: "Italy",
    }

    const country = knownCities[locationParam] || ""
    return country ? `${locationParam}, ${country}` : locationParam
  }

  const locationDisplay = getLocationDisplay()

  // Format the listings count text
  const getListingsCountText = () => {
    const count = 57 // Total available listings
    const locationText = locationDisplay ? ` in ${locationDisplay}` : ""
    return `${count} apartments and rooms for rent${locationText}`
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDepositFilterChange = (filters: { noDeposit: boolean; depositSaver: boolean }) => {
    setDepositFilters(filters)
  }

  const handlePropertyTypeFilterChange = (filters: PropertyTypeFilters) => {
    setPropertyTypeFilters(filters)
  }

  // Add handler for price filters
  const handlePriceFilterChange = (filters: PriceFilters) => {
    setPriceFilters(filters)
  }

  // Add handler for furnishing filters
  const handleFurnishingFilterChange = (filters: FurnishingFilters) => {
    setFurnishingFilters(filters)
  }

  // Handler to update the filtered listings count
  const handleFilteredListingsCountChange = (count: number) => {
    setFilteredListingsCount(count)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader />

      <main className="flex-grow container mx-auto px-4 py-6">
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onDepositFilterChange={handleDepositFilterChange}
          onPropertyTypeFilterChange={handlePropertyTypeFilterChange}
          onPriceFilterChange={handlePriceFilterChange}
          onFurnishingFilterChange={handleFurnishingFilterChange}
        />

        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-sm text-gray-700 mb-2 md:mb-0">{getListingsCountText()}</h1>
            <ViewToggle view={view} setView={setView} />
          </div>

          <PropertyGrid
            view={view}
            currentPage={currentPage}
            depositFilters={depositFilters}
            propertyTypeFilters={propertyTypeFilters}
            priceFilters={priceFilters}
            furnishingFilters={furnishingFilters}
            onFilteredListingsCountChange={handleFilteredListingsCountChange}
          />

          <Pagination currentPage={currentPage} totalPages={3} onPageChange={handlePageChange} />
        </div>
      </main>
    </div>
  )
}
