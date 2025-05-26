"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
  initialFilters?: {
    noDeposit?: boolean
    depositSaver?: boolean
  }
}

export function FilterPanel({ isOpen, onClose, onApplyFilters, initialFilters = {} }: FilterPanelProps) {
  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([800, 1800])
  const [minPrice, setMinPrice] = useState("800")
  const [maxPrice, setMaxPrice] = useState("1800")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    billsIncluded: false,
    noDeposit: initialFilters.noDeposit || false,
    depositSaver: initialFilters.depositSaver || false,
    studio: false,
    apartment: false,
    oneBedroom: false,
    twoBedroom: false,
    threeBedroom: false,
    fourPlusBedrooms: false,
    studentResidence: false,
  })

  // Update selected filters when initialFilters change
  useEffect(() => {
    setSelectedFilters((prev) => ({
      ...prev,
      noDeposit: initialFilters.noDeposit || false,
      depositSaver: initialFilters.depositSaver || false,
    }))
  }, [initialFilters])

  // Neighborhoods
  const neighborhoods = [
    "Dreta de l'Eixample",
    "El Raval",
    "l'Antiga Esquerra de l'Eixample",
    "El Gòtic",
    "Sant Gervasi-Galvany",
  ]

  // Amenities
  const facilities = ["Private bathroom", "Balcony/terrace"]
  const amenities = ["Dishwasher", "Washing machine"]
  const additionalAmenities = [
    "Garden",
    "Kitchen",
    "Pets allowed",
    "Parking",
    "Wheelchair accessible",
    "Basement",
    "Dryer",
    "Air conditioning",
    "Heating",
  ]

  // Handle checkbox change
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [id]: checked,
    }))

    // If this is a deposit filter, apply it immediately
    if (id === "noDeposit" || id === "depositSaver") {
      const updatedFilters = {
        ...selectedFilters,
        [id]: checked,
      }

      onApplyFilters({
        ...updatedFilters,
        depositFilters: {
          noDeposit: id === "noDeposit" ? checked : updatedFilters.noDeposit,
          depositSaver: id === "depositSaver" ? checked : updatedFilters.depositSaver,
        },
      })
    }
  }

  // Handle price slider change
  const handlePriceSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
    setMinPrice(value[0].toString())
    setMaxPrice(value[1].toString())
  }

  // Handle min price input change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value)
    if (value && !isNaN(Number(value))) {
      setPriceRange([Number(value), priceRange[1]])
    }
  }

  // Handle max price input change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value)
    if (value && !isNaN(Number(value))) {
      setPriceRange([priceRange[0], Number(value)])
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setPriceRange([800, 1800])
    setMinPrice("800")
    setMaxPrice("1800")

    const resetFilters = Object.keys(selectedFilters).reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as Record<string, boolean>,
    )

    setSelectedFilters(resetFilters)

    // Apply the reset filters
    onApplyFilters({
      ...resetFilters,
      depositFilters: {
        noDeposit: false,
        depositSaver: false,
      },
    })

    onClose()
  }

  // Apply filters and close panel
  const applyFilters = () => {
    const filters = {
      priceRange,
      ...selectedFilters,
      depositFilters: {
        noDeposit: selectedFilters.noDeposit,
        depositSaver: selectedFilters.depositSaver,
      },
    }
    onApplyFilters(filters)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg p-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Monthly rent */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Monthly rent</h3>
                <Select defaultValue="eur">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dollar ($)</SelectItem>
                    <SelectItem value="gbp">Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="px-2 py-4">
                <div className="h-[60px] relative">
                  {/* Placeholder for histogram chart */}
                  <div className="w-full h-[40px] flex items-end">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const height = 5 + Math.random() * 35
                      return (
                        <div key={i} className="w-full bg-[#002630] mx-[1px]" style={{ height: `${height}px` }}></div>
                      )
                    })}
                  </div>
                </div>

                <Slider
                  defaultValue={[800, 1800]}
                  min={0}
                  max={5000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceSliderChange}
                  className="mt-6"
                />

                <div className="flex justify-between items-center mt-6 gap-4">
                  <div className="space-y-1 flex-1">
                    <label htmlFor="min-price" className="text-sm text-gray-500">
                      Minimum
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                      <Input
                        id="min-price"
                        type="text"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="pl-8"
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => {
                          setMinPrice("")
                          setPriceRange([0, priceRange[1]])
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <label htmlFor="max-price" className="text-sm text-gray-500">
                      Maximum
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                      <Input
                        id="max-price"
                        type="text"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="pl-8"
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => {
                          setMaxPrice("")
                          setPriceRange([priceRange[0], 5000])
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bills-included"
                      checked={selectedFilters.billsIncluded}
                      onCheckedChange={(checked) => handleCheckboxChange("billsIncluded", checked as boolean)}
                    />
                    <label
                      htmlFor="bills-included"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Bills included
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">494</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="no-deposit"
                      checked={selectedFilters.noDeposit}
                      onCheckedChange={(checked) => handleCheckboxChange("noDeposit", checked as boolean)}
                    />
                    <label
                      htmlFor="no-deposit"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      No deposit
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">340</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="deposit-saver"
                      checked={selectedFilters.depositSaver}
                      onCheckedChange={(checked) => handleCheckboxChange("depositSaver", checked as boolean)}
                    />
                    <label
                      htmlFor="deposit-saver"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Deposit Saver
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">340</span>
                </div>
              </div>
            </div>

            {/* Property type */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property type</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="studio"
                      checked={selectedFilters.studio}
                      onCheckedChange={(checked) => handleCheckboxChange("studio", checked as boolean)}
                    />
                    <label
                      htmlFor="studio"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Studio
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">538</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="apartment"
                      checked={selectedFilters.apartment}
                      onCheckedChange={(checked) => handleCheckboxChange("apartment", checked as boolean)}
                    />
                    <label
                      htmlFor="apartment"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apartment
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">425</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="one-bedroom"
                      checked={selectedFilters.oneBedroom}
                      onCheckedChange={(checked) => handleCheckboxChange("oneBedroom", checked as boolean)}
                    />
                    <label
                      htmlFor="one-bedroom"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      1 bedroom
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">210</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="two-bedroom"
                      checked={selectedFilters.twoBedroom}
                      onCheckedChange={(checked) => handleCheckboxChange("twoBedroom", checked as boolean)}
                    />
                    <label
                      htmlFor="two-bedroom"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      2 bedroom
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">107</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="three-bedroom"
                      checked={selectedFilters.threeBedroom}
                      onCheckedChange={(checked) => handleCheckboxChange("threeBedroom", checked as boolean)}
                    />
                    <label
                      htmlFor="three-bedroom"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      3 bedroom
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">65</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="four-plus-bedrooms"
                      checked={selectedFilters.fourPlusBedrooms}
                      onCheckedChange={(checked) => handleCheckboxChange("fourPlusBedrooms", checked as boolean)}
                    />
                    <label
                      htmlFor="four-plus-bedrooms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      4+ bedrooms
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">42</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="student-residence"
                      checked={selectedFilters.studentResidence}
                      onCheckedChange={(checked) => handleCheckboxChange("studentResidence", checked as boolean)}
                    />
                    <label
                      htmlFor="student-residence"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Student residence
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">156</span>
                </div>
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Neighborhoods</h3>
              <div className="space-y-2">
                {neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`neighborhood-${index}`}
                        checked={selectedFilters[`neighborhood-${index}`] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(`neighborhood-${index}`, checked as boolean)}
                      />
                      <label
                        htmlFor={`neighborhood-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {neighborhood}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 20}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="flex items-center text-sm text-gray-600">
                Show all <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Suitable for */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Suitable for</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">👤</span> Any gender
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">👩</span> Female
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">👨</span> Male
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="suitable-for-couples"
                    checked={selectedFilters.suitableForCouples || false}
                    onCheckedChange={(checked) => handleCheckboxChange("suitableForCouples", checked as boolean)}
                  />
                  <label
                    htmlFor="suitable-for-couples"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Suitable for couples
                  </label>
                </div>
                <span className="text-sm text-gray-500">124</span>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Size</h3>
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <label htmlFor="min-size" className="text-sm text-gray-500">
                    Minimum
                  </label>
                  <Select defaultValue="0">
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0m²</SelectItem>
                      <SelectItem value="20">20m²</SelectItem>
                      <SelectItem value="40">40m²</SelectItem>
                      <SelectItem value="60">60m²</SelectItem>
                      <SelectItem value="80">80m²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 flex-1">
                  <label htmlFor="max-size" className="text-sm text-gray-500">
                    Maximum
                  </label>
                  <Select defaultValue="no-max">
                    <SelectTrigger>
                      <SelectValue placeholder="Maximum size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-max">No maximum</SelectItem>
                      <SelectItem value="40">40m²</SelectItem>
                      <SelectItem value="60">60m²</SelectItem>
                      <SelectItem value="80">80m²</SelectItem>
                      <SelectItem value="100">100m²</SelectItem>
                      <SelectItem value="150">150m²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Furniture */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Furniture</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="furnished"
                      checked={selectedFilters.furnished || false}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unfurnished"
                      checked={selectedFilters.unfurnished || false}
                      onCheckedChange={(checked) => handleCheckboxChange("unfurnished", checked as boolean)}
                    />
                    <label
                      htmlFor="unfurnished"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Unfurnished
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">143</span>
                </div>
              </div>
            </div>

            {/* Landlord rating */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Landlord rating</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">⭐</span> Any rating
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">⭐</span> 4 or higher
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">⭐</span> 3 or higher
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">🆕</span> New landlords
                </Button>
              </div>
            </div>

            {/* Facilities and Amenities */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Facilities</h3>
                <div className="space-y-2">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`facility-${index}`}
                          checked={selectedFilters[`facility-${index}`] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(`facility-${index}`, checked as boolean)}
                        />
                        <label
                          htmlFor={`facility-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {facility}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Amenities</h3>
                <div className="space-y-2">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${index}`}
                          checked={selectedFilters[`amenity-${index}`] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(`amenity-${index}`, checked as boolean)}
                        />
                        <label
                          htmlFor={`amenity-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Amenities */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {additionalAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`additional-amenity-${index}`}
                        checked={selectedFilters[`additional-amenity-${index}`] || false}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(`additional-amenity-${index}`, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`additional-amenity-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract type */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contract type</h3>
              <p className="text-sm text-gray-600">
                This determines how much you'll pay in the first and last months of your stay.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Learn more
                </a>
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monthly"
                      checked={selectedFilters.monthly || false}
                      onCheckedChange={(checked) => handleCheckboxChange("monthly", checked as boolean)}
                    />
                    <label
                      htmlFor="monthly"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Monthly
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="daily"
                      checked={selectedFilters.daily || false}
                      onCheckedChange={(checked) => handleCheckboxChange("daily", checked as boolean)}
                    />
                    <label
                      htmlFor="daily"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Daily
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="every-two-weeks"
                      checked={selectedFilters.everyTwoWeeks || false}
                      onCheckedChange={(checked) => handleCheckboxChange("everyTwoWeeks", checked as boolean)}
                    />
                    <label
                      htmlFor="every-two-weeks"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Every 2 weeks
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t mt-auto sticky bottom-0 bg-white">
            <Button variant="outline" className="w-full" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
