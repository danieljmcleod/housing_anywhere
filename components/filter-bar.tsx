"use client"

import { useState } from "react"
import { ChevronDown, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterPanel } from "@/components/filter-panel"
import { PropertyTypeDropdown, type PropertyTypeFilters } from "@/components/property-type-dropdown"
import { PriceFilterDropdown, type PriceFilters } from "@/components/price-filter-dropdown"
import { FurnishingFilterDropdown, type FurnishingFilters } from "@/components/furnishing-filter-dropdown"

interface FilterBarProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
  onDepositFilterChange?: (filters: { noDeposit: boolean; depositSaver: boolean }) => void
  onPropertyTypeFilterChange?: (filters: PropertyTypeFilters) => void
  onPriceFilterChange?: (filters: PriceFilters) => void
  onFurnishingFilterChange?: (filters: FurnishingFilters) => void
}

export function FilterBar({
  activeFilter,
  setActiveFilter,
  onDepositFilterChange,
  onPropertyTypeFilterChange,
  onPriceFilterChange,
  onFurnishingFilterChange,
}: FilterBarProps) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [depositFilters, setDepositFilters] = useState<{ noDeposit: boolean; depositSaver: boolean }>({
    noDeposit: false,
    depositSaver: false,
  })

  // Property type dropdown state
  const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] = useState(false)
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

  // Price filter dropdown state
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [priceFilters, setPriceFilters] = useState<PriceFilters>({
    minPrice: "",
    maxPrice: "",
    billsIncluded: false,
    currency: "eur",
  })

  // Furnishing filter dropdown state
  const [isFurnishingDropdownOpen, setIsFurnishingDropdownOpen] = useState(false)
  const [furnishingFilters, setFurnishingFilters] = useState<FurnishingFilters>({
    shell: false,
    upholstered: false,
    furnished: false,
  })

  // Calculate the display text for the property type button
  const getPropertyTypeButtonText = () => {
    const selectedTypes = Object.entries(propertyTypeFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        switch (key) {
          case "sharedRoom":
            return "Shared room"
          case "privateRoom":
            return "Private room"
          case "studio":
            return "Studio"
          case "apartment":
            return "Apartment"
          case "oneBedroom":
            return "1 bedroom"
          case "twoBedrooms":
            return "2 bedrooms"
          case "threeBedrooms":
            return "3 bedrooms"
          case "fourPlusBedrooms":
            return "4+ bedrooms"
          case "studentResidence":
            return "Student residence"
          default:
            return ""
        }
      })

    if (selectedTypes.length === 0) return "Any property"
    if (selectedTypes.length === 1) return selectedTypes[0]
    return `${selectedTypes.length} property types`
  }

  // Calculate the display text for the price button
  const getPriceButtonText = () => {
    const { minPrice, maxPrice, billsIncluded } = priceFilters
    const currencySymbol = priceFilters.currency === "eur" ? "€" : priceFilters.currency === "usd" ? "$" : "£"

    if (minPrice && maxPrice) {
      return `${currencySymbol}${minPrice} - ${currencySymbol}${maxPrice}`
    } else if (minPrice) {
      return `From ${currencySymbol}${minPrice}`
    } else if (maxPrice) {
      return `Up to ${currencySymbol}${maxPrice}`
    } else if (billsIncluded) {
      return "Bills included"
    }
    return "Any price"
  }

  // Calculate the display text for the furnishing button
  const getFurnishingButtonText = () => {
    const { shell, upholstered, furnished } = furnishingFilters
    const selectedOptions = []

    if (shell) selectedOptions.push("Shell")
    if (upholstered) selectedOptions.push("Upholstered")
    if (furnished) selectedOptions.push("Furnished")

    if (selectedOptions.length === 0) return "Any furnishing"
    if (selectedOptions.length === 1) return selectedOptions[0]
    return `${selectedOptions.length} furnishing types`
  }

  const filters = [
    {
      name: getPriceButtonText(),
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
      onClick: () => setIsPriceDropdownOpen(!isPriceDropdownOpen),
      isActive: isPriceDropdownOpen,
      hasFilters: priceFilters.minPrice !== "" || priceFilters.maxPrice !== "" || priceFilters.billsIncluded,
    },
    {
      name: getPropertyTypeButtonText(),
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
      onClick: () => setIsPropertyTypeDropdownOpen(!isPropertyTypeDropdownOpen),
      isActive: isPropertyTypeDropdownOpen,
      hasFilters: Object.values(propertyTypeFilters).some((value) => value),
    },
    {
      name: getFurnishingButtonText(),
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
      onClick: () => setIsFurnishingDropdownOpen(!isFurnishingDropdownOpen),
      isActive: isFurnishingDropdownOpen,
      hasFilters: Object.values(furnishingFilters).some((value) => value),
    },
  ]

  const userTypes = ["Anyone", "Students", "Professionals", "Families"]

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters)

    // Count active filters
    const activeCount = Object.values(filters).filter((value) => value === true).length
    setActiveFiltersCount(activeCount)

    // Update deposit filters
    if (filters.depositFilters) {
      setDepositFilters(filters.depositFilters)

      // Notify parent component about deposit filter changes
      if (onDepositFilterChange) {
        onDepositFilterChange(filters.depositFilters)
      }
    }
  }

  const handlePropertyTypeFilters = (filters: PropertyTypeFilters) => {
    setPropertyTypeFilters(filters)

    // Update active filters count
    const activeCount = Object.values(filters).filter((value) => value).length
    if (activeCount > 0) {
      setActiveFiltersCount((prev) => prev + activeCount)
    }

    // Notify parent component about property type filter changes
    if (onPropertyTypeFilterChange) {
      onPropertyTypeFilterChange(filters)
    }
  }

  const handlePriceFilters = (filters: PriceFilters) => {
    setPriceFilters(filters)

    // Update active filters count
    let activeCount = 0
    if (filters.minPrice) activeCount++
    if (filters.maxPrice) activeCount++
    if (filters.billsIncluded) activeCount++

    if (activeCount > 0) {
      setActiveFiltersCount((prev) => prev + activeCount)
    }

    // Notify parent component about price filter changes
    if (onPriceFilterChange) {
      onPriceFilterChange(filters)
    }
  }

  const handleFurnishingFilters = (filters: FurnishingFilters) => {
    setFurnishingFilters(filters)

    // Update active filters count
    const activeCount = Object.values(filters).filter((value) => value).length
    if (activeCount > 0) {
      setActiveFiltersCount((prev) => prev + activeCount)
    }

    // Notify parent component about furnishing filter changes
    if (onFurnishingFilterChange) {
      onFurnishingFilterChange(filters)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <div key={index} className="relative">
            <Button
              variant={filter.hasFilters ? "default" : "outline"}
              size="sm"
              className={`flex items-center text-sm font-medium ${
                filter.hasFilters ? "bg-[#002630] text-white hover:bg-[#00171d]" : ""
              } ${filter.isActive ? "border-[#002630] bg-gray-100" : ""}`}
              onClick={filter.onClick}
            >
              {filter.name}
              {filter.icon}
            </Button>

            {index === 0 && (
              <PriceFilterDropdown
                isOpen={isPriceDropdownOpen}
                onClose={() => setIsPriceDropdownOpen(false)}
                onApplyFilters={handlePriceFilters}
                initialFilters={priceFilters}
              />
            )}

            {index === 1 && (
              <PropertyTypeDropdown
                isOpen={isPropertyTypeDropdownOpen}
                onClose={() => setIsPropertyTypeDropdownOpen(false)}
                onApplyFilters={handlePropertyTypeFilters}
                initialFilters={propertyTypeFilters}
              />
            )}

            {index === 2 && (
              <FurnishingFilterDropdown
                isOpen={isFurnishingDropdownOpen}
                onClose={() => setIsFurnishingDropdownOpen(false)}
                onApplyFilters={handleFurnishingFilters}
                initialFilters={furnishingFilters}
              />
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-sm font-medium"
          onClick={() => setIsFilterPanelOpen(true)}
        >
          <span className="flex items-center">
            All filters
            <span className="ml-1 bg-[#FF4B27] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </span>
          </span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-sm font-medium bg-[#002630] text-white border-[#002630] hover:bg-[#00171d] hover:text-white"
        >
          <Bell className="h-4 w-4 mr-2" />
          Create alert
        </Button>
      </div>

      <div className="flex border-b pb-1">
        {userTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === type
                ? "text-[#FF4B27] border-b-2 border-[#FF4B27] -mb-[1px]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={depositFilters}
      />
    </div>
  )
}
