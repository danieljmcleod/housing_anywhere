"use client"

import { useState, useEffect } from "react"
import { PropertyCard } from "@/components/property-card"
import { FilterCard } from "@/components/filter-card"
import Image from "next/image"
import type { PropertyTypeFilters } from "@/components/property-type-dropdown"
import type { PriceFilters } from "@/components/price-filter-dropdown"
import type { FurnishingFilters } from "@/components/furnishing-filter-dropdown"

interface PropertyGridProps {
  view: string
  currentPage: number
  depositFilters?: {
    noDeposit: boolean
    depositSaver: boolean
  }
  propertyTypeFilters?: PropertyTypeFilters
  priceFilters?: PriceFilters
  furnishingFilters?: FurnishingFilters
  onFilteredListingsCountChange?: (count: number) => void
}

export function PropertyGrid(props: PropertyGridProps) {
  // Use props directly instead of destructuring to avoid potential TypeScript issues
  const [activeFilter, setActiveFilter] = useState<"no-deposit" | "deposit-saver" | null>(null)

  // Reset filter when page changes
  useEffect(() => {
    setActiveFilter(null)
  }, [props.currentPage])

  // Available images to use (reusing them across properties)
  const imageOptions = [
    "/property-images/apartment-1.jpeg",
    "/property-images/apartment-2.jpeg",
    "/property-images/apartment-3.jpeg",
    "/property-images/apartment-4.jpeg",
    "/property-images/apartment-5.jpeg",
    "/property-images/apartment-6.jpeg",
    "/property-images/apartment-7.jpeg",
    "/property-images/apartment-8.jpeg",
    "/property-images/apartment-9.jpeg",
    "/property-images/apartment-10.jpeg",
    "/property-images/apartment-11.jpeg",
    "/property-images/apartment-12.jpeg",
    "/property-images/apartment-13.jpeg",
    "/property-images/apartment-14.jpeg",
    "/property-images/apartment-15.jpeg",
    "/property-images/apartment-16.jpeg",
  ]

  // PBSA images - using different images for the main listing
  const pbsaImages = [
    "/property-images/apartment-8.jpeg", // Blue sofa with yellow chairs
    "/property-images/apartment-11.jpeg", // High-rise with city views
    "/property-images/apartment-4.jpeg", // Modern with balcony
    "/property-images/apartment-9.jpeg", // Luxury with city view
  ]

  // Room thumbnails for PBSA cards
  const studentRoomThumbnails = ["/property-images/room-thumbnail-1.png", "/property-images/room-thumbnail-2.png"]

  // Property types
  const propertyTypes = ["Studio", "Apartment", "Private room", "Luxury apartment", "Penthouse", "Loft"]

  // Landlord types
  const landlordTypes = ["Rental company", "Private landlord", "Student housing", "Corporate housing"]

  // Features for standard listings
  const featureOptions = [
    "Open kitchen",
    "Fully equipped kitchen",
    "Balcony",
    "City view",
    "Private bathroom",
    "Shared bathroom",
    "Desk",
    "Work space",
    "TV",
    "High-speed internet",
    "Wooden floors",
    "Floor-to-ceiling windows",
    "Modern furniture",
    "Bright interior",
    "Dining area",
    "Kitchenette",
    "Air conditioning",
    "Washing machine",
    "Dishwasher",
    "Elevator",
  ]

  // Amenities for PBSA/Co-living
  const amenityOptions = [
    "Single rooms",
    "Shared rooms",
    "Gym",
    "Pool",
    "Study area",
    "Meal plans available",
    "Laundry facilities",
    "Bike storage",
    "24/7 security",
    "Common areas",
    "Rooftop terrace",
    "Cinema room",
    "Game room",
    "Co-working space",
  ]

  // Tags
  const tagOptions = ["Popular", "New", "Luxury", "Student friendly", "Co-living", "Pet friendly"]

  // Generate properties (19 per page for 3 pages, plus filter card)
  const generateProperties = () => {
    const allProperties = []

    for (let i = 1; i <= 57; i++) {
      // Determine if this is a PBSA/Co-living property (25% chance)
      const isPBSA = Math.random() < 0.25

      // Randomly select image
      const imageIndex = Math.floor(Math.random() * (isPBSA ? pbsaImages.length : imageOptions.length))

      // Randomly determine if property has deposit info (30% chance)
      const hasDepositInfo = Math.random() < 0.3
      const depositInfo = hasDepositInfo ? (Math.random() < 0.5 ? "Deposit Saver" : "No Deposit") : undefined

      // Random price between €600 and €1800
      const price = Math.floor(Math.random() * (isPBSA ? 600 : 1000)) + (isPBSA ? 600 : 800)

      // Random size between 20 and 100 m²
      const size = Math.floor(Math.random() * 80) + 20

      // Random number of bedrooms (1-3)
      const bedroomCount = Math.floor(Math.random() * 3) + 1

      // Random property type
      const typeIndex = Math.floor(Math.random() * propertyTypes.length)

      // Random landlord type
      const landlordIndex = Math.floor(Math.random() * landlordTypes.length)

      // Random rating between 3.5 and 5.0
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

      // Random number of reviews between 1 and 50
      const reviews = Math.floor(Math.random() * 50) + 1

      // Random availability month
      const months = ["Jun", "Jul", "Aug", "Sep", "Oct"]
      const monthIndex = Math.floor(Math.random() * months.length)
      const day = Math.floor(Math.random() * 28) + 1

      // Random features (3-5) for standard listings
      const featureCount = Math.floor(Math.random() * 3) + 3
      const features = []
      for (let j = 0; j < featureCount; j++) {
        const feature = featureOptions[Math.floor(Math.random() * featureOptions.length)]
        if (!features.includes(feature)) {
          features.push(feature)
        }
      }

      // Random amenities (2-4) for PBSA/Co-living
      const amenityCount = Math.floor(Math.random() * 3) + 2
      const amenities = []
      for (let j = 0; j < amenityCount; j++) {
        const amenity = amenityOptions[Math.floor(Math.random() * amenityOptions.length)]
        if (!amenities.includes(amenity)) {
          amenities.push(amenity)
        }
      }

      // Random tags (0-2)
      const tagCount = isPBSA ? 2 : Math.floor(Math.random() * 2)
      const tags = []

      // Always add Co-living tag for PBSA properties
      if (isPBSA) {
        tags.push("Co-living")

        // 50% chance to add Popular tag for PBSA
        if (Math.random() < 0.5) {
          tags.push("Popular")
        }
      } else {
        for (let j = 0; j < tagCount; j++) {
          // Filter out Co-living tag for non-PBSA properties
          const availableTags = tagOptions.filter((tag) => tag !== "Co-living")
          const tag = availableTags[Math.floor(Math.random() * availableTags.length)]
          if (!tags.includes(tag)) {
            tags.push(tag)
          }
        }
      }

      // Bills included or excluded
      const billsIncluded = Math.random() > 0.5

      // Random furnishing type
      const furnishingType = Math.random() < 0.33 ? "Shell" : Math.random() < 0.5 ? "Upholstered" : "Furnished"

      // PBSA specific properties
      let title = ""
      let location = ""
      let sizeRange = ""
      const roomTypes = []
      let genderPolicy = "Any gender"
      const facilitiesShort = []
      // Always set placesLeft to a non-zero value for PBSA properties
      const placesLeft = Math.floor(Math.random() * 15) + 1
      let hasFlexibleCancellation = false
      const thumbnails = []

      if (isPBSA) {
        // Generate PBSA specific data
        const neighborhoods = ["Schiebroek", "Kralingen", "Blijdorp", "Delfshaven", "Prins Alexander"]
        const neighborhoodIndex = Math.floor(Math.random() * neighborhoods.length)

        // Generate longer PBSA titles
        const residenceTypes = [
          "Modern student residence",
          "Luxury student accommodation",
          "Contemporary student housing",
          "Comfortable student residence",
          "Premium student living space",
        ]
        const residenceType = residenceTypes[Math.floor(Math.random() * residenceTypes.length)]
        const amenityHighlights = [
          "with shared facilities",
          "with private bathrooms",
          "with study areas",
          "with fitness center",
          "with community spaces",
        ]
        const amenityHighlight = amenityHighlights[Math.floor(Math.random() * amenityHighlights.length)]
        title = `${residenceType} in ${neighborhoods[neighborhoodIndex]} ${amenityHighlight}`
        location = "Rotterdam"

        // Size range
        const minSize = Math.floor(Math.random() * 30) + 20 // 20-50
        const maxSize = minSize + Math.floor(Math.random() * 100) + 50 // min+50 to min+150
        sizeRange = `${minSize} m² - ${maxSize} m²`

        // Room types
        const possibleRoomTypes = ["Private room", "Shared room", "Studio", "Apartment"]
        const roomTypeCount = Math.floor(Math.random() * 2) + 1
        for (let j = 0; j < roomTypeCount; j++) {
          const roomType = possibleRoomTypes[Math.floor(Math.random() * possibleRoomTypes.length)]
          if (!roomTypes.includes(roomType)) {
            roomTypes.push(roomType)
          }
        }

        // Gender policy
        const genderPolicies = ["Any gender", "Female only", "Male only"]
        genderPolicy = genderPolicies[Math.floor(Math.random() * genderPolicies.length)]

        // Facilities short
        const possibleFacilities = ["Gym", "Locker", "Study room", "Laundry", "Bike storage", "Cinema"]
        const facilityCount = Math.floor(Math.random() * 2) + 1
        for (let j = 0; j < facilityCount; j++) {
          const facility = possibleFacilities[Math.floor(Math.random() * possibleFacilities.length)]
          if (!facilitiesShort.includes(facility)) {
            facilitiesShort.push(facility)
          }
        }

        // Flexible cancellation (50% chance)
        hasFlexibleCancellation = Math.random() < 0.5

        // Use the student room thumbnails
        thumbnails.push(...studentRoomThumbnails)
      }

      allProperties.push({
        id: i.toString(),
        images: isPBSA ? [pbsaImages[imageIndex]] : [imageOptions[imageIndex]],
        price: `€${price}`,
        priceValue: price, // Add numeric price for filtering
        period: "/ month",
        isPBSA: isPBSA,
        bills: billsIncluded ? "(bills included)" : "(bills excluded)",
        billsIncluded: billsIncluded,
        tags: tags,
        type: propertyTypes[typeIndex],
        size: `${size} m²`,
        bedrooms: `${bedroomCount} bedroom${bedroomCount > 1 ? "s" : ""}`,
        bedroomCount: bedroomCount,
        availableFrom: `Available from ${day} ${months[monthIndex]} 2025`,
        landlordType: landlordTypes[landlordIndex],
        rating: Number.parseFloat(rating),
        reviews: reviews,
        features: features,
        amenities: amenities,
        depositInfo: depositInfo,
        furnishingType: furnishingType,
        // PBSA specific fields
        title: title,
        location: location,
        sizeRange: sizeRange,
        roomTypes: roomTypes,
        genderPolicy: genderPolicy,
        facilitiesShort: facilitiesShort,
        placesLeft: placesLeft,
        hasFlexibleCancellation: hasFlexibleCancellation,
        thumbnails: thumbnails,
      })
    }

    return allProperties
  }

  const properties = generateProperties()

  // Filter properties based on current page (19 items per page)
  const itemsPerPage = 19
  const startIndex = (props.currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Get deposit filters from props or use defaults
  const depositFilters = props.depositFilters || { noDeposit: false, depositSaver: false }

  // Get property type filters from props or use defaults
  const propertyTypeFilters = props.propertyTypeFilters || {
    sharedRoom: false,
    privateRoom: false,
    studio: false,
    apartment: false,
    oneBedroom: false,
    twoBedrooms: false,
    threeBedrooms: false,
    fourPlusBedrooms: false,
    studentResidence: false,
  }

  // Get price filters from props or use defaults
  const priceFilters = props.priceFilters || {
    minPrice: "",
    maxPrice: "",
    billsIncluded: false,
    currency: "eur",
  }

  // Get furnishing filters from props or use defaults
  const furnishingFilters = props.furnishingFilters || {
    shell: false,
    upholstered: false,
    furnished: false,
  }

  // Apply all filters to the full property list first
  let filteredProperties = [...properties]

  // Apply deposit filter from filter card if active
  if (activeFilter) {
    filteredProperties = filteredProperties.filter(
      (property) => property.depositInfo === (activeFilter === "no-deposit" ? "No Deposit" : "Deposit Saver"),
    )
  }
  // Apply deposit filter from filter panel if active
  else if (depositFilters.noDeposit || depositFilters.depositSaver) {
    filteredProperties = filteredProperties.filter((property) => {
      if (depositFilters.noDeposit && property.depositInfo === "No Deposit") {
        return true
      }
      if (depositFilters.depositSaver && property.depositInfo === "Deposit Saver") {
        return true
      }
      return false
    })
  }

  // Apply property type filters
  const isPropertyTypeFilterActive = Object.values(propertyTypeFilters).some((value) => value)
  if (isPropertyTypeFilterActive) {
    filteredProperties = filteredProperties.filter((property) => {
      // Check for shared room
      if (propertyTypeFilters.sharedRoom && property.type.toLowerCase().includes("shared room")) {
        return true
      }

      // Check for private room
      if (propertyTypeFilters.privateRoom && property.type.toLowerCase().includes("private room")) {
        return true
      }

      // Check for studio
      if (propertyTypeFilters.studio && property.type.toLowerCase().includes("studio")) {
        return true
      }

      // Check for apartment types
      if (propertyTypeFilters.apartment) {
        // General apartment check
        if (property.type.toLowerCase().includes("apartment")) {
          // Check for specific bedroom counts if those filters are active
          if (propertyTypeFilters.oneBedroom && property.bedroomCount === 1) {
            return true
          }
          if (propertyTypeFilters.twoBedrooms && property.bedroomCount === 2) {
            return true
          }
          if (propertyTypeFilters.threeBedrooms && property.bedroomCount === 3) {
            return true
          }
          if (propertyTypeFilters.fourPlusBedrooms && property.bedroomCount >= 4) {
            return true
          }
          // If no specific bedroom count is selected, return all apartments
          return (
            !propertyTypeFilters.oneBedroom &&
            !propertyTypeFilters.twoBedrooms &&
            !propertyTypeFilters.threeBedrooms &&
            !propertyTypeFilters.fourPlusBedrooms
          )
        }
      }

      // Check for student residence
      if (propertyTypeFilters.studentResidence && property.isPBSA) {
        return true
      }

      return false
    })
  }

  // Apply price filters
  const isPriceFilterActive = priceFilters.minPrice !== "" || priceFilters.maxPrice !== "" || priceFilters.billsIncluded
  if (isPriceFilterActive) {
    filteredProperties = filteredProperties.filter((property) => {
      // Extract numeric price value
      const priceValue = property.priceValue

      // Check min price
      if (priceFilters.minPrice && priceValue < Number.parseInt(priceFilters.minPrice)) {
        return false
      }

      // Check max price
      if (priceFilters.maxPrice && priceValue > Number.parseInt(priceFilters.maxPrice)) {
        return false
      }

      // Check bills included
      if (priceFilters.billsIncluded && !property.billsIncluded) {
        return false
      }

      return true
    })
  }

  // Apply furnishing filters
  const isFurnishingFilterActive = Object.values(furnishingFilters).some((value) => value)
  if (isFurnishingFilterActive) {
    filteredProperties = filteredProperties.filter((property) => {
      if (furnishingFilters.shell && property.furnishingType === "Shell") {
        return true
      }
      if (furnishingFilters.upholstered && property.furnishingType === "Upholstered") {
        return true
      }
      if (furnishingFilters.furnished && property.furnishingType === "Furnished") {
        return true
      }
      return false
    })
  }

  // Update the parent component with the total count of filtered properties
  useEffect(() => {
    if (props.onFilteredListingsCountChange) {
      props.onFilteredListingsCountChange(filteredProperties.length)
    }
  }, [filteredProperties.length, props.onFilteredListingsCountChange])

  // Get the properties for the current page
  const currentPageProperties = filteredProperties.slice(startIndex, endIndex)

  // Determine filter card type and position for this page
  const filterCardType = "deposit-saver" // Always use deposit-saver, never no-deposit

  // Position is semi-random but fixed for each page
  const filterCardPosition = ((props.currentPage * 7) % 5) + 3

  // Create final grid items with filter card inserted
  const gridItems = []

  // Only show filter card if no filter is active
  const showFilterCard =
    !activeFilter && !depositFilters.noDeposit && !depositFilters.depositSaver && filterCardType === "deposit-saver"

  // Create the active filter indicator message
  const getActiveFilterMessage = () => {
    const messages = []

    // Deposit filter messages
    if (activeFilter) {
      messages.push(`${activeFilter === "no-deposit" ? "No Deposit" : "Deposit Saver"} properties`)
    } else if (depositFilters.noDeposit && depositFilters.depositSaver) {
      messages.push("No Deposit and Deposit Saver properties")
    } else if (depositFilters.noDeposit) {
      messages.push("No Deposit properties")
    } else if (depositFilters.depositSaver) {
      messages.push("Deposit Saver properties")
    }

    // Price filter messages
    if (priceFilters.minPrice && priceFilters.maxPrice) {
      messages.push(`€${priceFilters.minPrice} - €${priceFilters.maxPrice}`)
    } else if (priceFilters.minPrice) {
      messages.push(`From €${priceFilters.minPrice}`)
    } else if (priceFilters.maxPrice) {
      messages.push(`Up to €${priceFilters.maxPrice}`)
    }

    if (priceFilters.billsIncluded) {
      messages.push("Bills included")
    }

    // Property type filter messages
    const propertyTypesList = []
    if (propertyTypeFilters.sharedRoom) propertyTypesList.push("Shared room")
    if (propertyTypeFilters.privateRoom) propertyTypesList.push("Private room")
    if (propertyTypeFilters.studio) propertyTypesList.push("Studio")
    if (propertyTypeFilters.apartment) propertyTypesList.push("Apartment")
    if (propertyTypeFilters.studentResidence) propertyTypesList.push("Student residence")

    if (propertyTypesList.length > 0) {
      if (propertyTypesList.length === 1) {
        messages.push(propertyTypesList[0])
      } else {
        messages.push(`${propertyTypesList.length} property types`)
      }
    }

    // Furnishing filter messages
    const furnishingTypesList = []
    if (furnishingFilters.shell) furnishingTypesList.push("Shell")
    if (furnishingFilters.upholstered) furnishingTypesList.push("Upholstered")
    if (furnishingFilters.furnished) furnishingTypesList.push("Furnished")

    if (furnishingTypesList.length > 0) {
      if (furnishingTypesList.length === 1) {
        messages.push(furnishingTypesList[0])
      } else {
        messages.push(`${furnishingTypesList.length} furnishing types`)
      }
    }

    return messages.length > 0 ? `Showing ${messages.join(", ")}` : ""
  }

  // Get the appropriate icon for the active filter message
  const getActiveFilterIcon = () => {
    if (activeFilter) {
      return activeFilter === "no-deposit" ? "/no_deposit_icon.svg" : "/deposit_saver_icon.svg"
    } else if (depositFilters.noDeposit && !depositFilters.depositSaver) {
      return "/no_deposit_icon.svg"
    } else if (!depositFilters.noDeposit && depositFilters.depositSaver) {
      return "/deposit_saver_icon.svg"
    }
    return "/no_deposit_icon.svg" // Default icon
  }

  // Handle clearing filters
  const clearFilters = () => {
    setActiveFilter(null)

    // Create and dispatch custom events to clear all filters
    if (typeof window !== "undefined") {
      // Clear deposit filters
      if (depositFilters.noDeposit || depositFilters.depositSaver) {
        const event = new CustomEvent("clearDepositFilters", {
          detail: { noDeposit: false, depositSaver: false },
        })
        window.dispatchEvent(event)
      }

      // Clear property type filters
      if (isPropertyTypeFilterActive) {
        const event = new CustomEvent("clearPropertyTypeFilters")
        window.dispatchEvent(event)
      }

      // Clear price filters
      if (isPriceFilterActive) {
        const event = new CustomEvent("clearPriceFilters")
        window.dispatchEvent(event)
      }

      // Clear furnishing filters
      if (isFurnishingFilterActive) {
        const event = new CustomEvent("clearFurnishingFilters")
        window.dispatchEvent(event)
      }
    }
  }

  // Add event listener for the custom event
  useEffect(() => {
    const handleClearFilters = () => {
      setActiveFilter(null)
    }

    window.addEventListener("clearDepositFilters", handleClearFilters)

    return () => {
      window.removeEventListener("clearDepositFilters", handleClearFilters)
    }
  }, [])

  const isAnyFilterActive =
    activeFilter ||
    depositFilters.noDeposit ||
    depositFilters.depositSaver ||
    isPropertyTypeFilterActive ||
    isPriceFilterActive ||
    isFurnishingFilterActive

  if (showFilterCard) {
    currentPageProperties.forEach((property, index) => {
      // Insert the filter card at the determined position
      if (index === filterCardPosition) {
        gridItems.push(
          <div key="filter-card" className="transition-all duration-500 ease-in-out transform">
            <FilterCard key="filter-card" type={filterCardType} onClick={() => setActiveFilter(filterCardType)} />
          </div>,
        )
      }

      // Add the property card
      gridItems.push(
        <div key={property.id} className="transition-all duration-500 ease-in-out transform">
          <PropertyCard
            key={property.id}
            id={property.id}
            images={property.images}
            price={property.price}
            period={property.period}
            isPBSA={property.isPBSA}
            bills={property.bills}
            tags={property.tags}
            type={property.type}
            size={property.size}
            bedrooms={property.bedrooms}
            availableFrom={property.availableFrom}
            landlordType={property.landlordType}
            rating={property.rating}
            reviews={property.reviews}
            features={property.features}
            amenities={property.amenities}
            depositInfo={property.depositInfo}
            priceValue={property.priceValue}
            billsIncluded={property.billsIncluded}
            title={property.title}
            location={property.location}
            sizeRange={property.sizeRange}
            roomTypes={property.roomTypes}
            genderPolicy={property.genderPolicy}
            facilitiesShort={property.facilitiesShort}
            placesLeft={property.placesLeft}
            hasFlexibleCancellation={property.hasFlexibleCancellation}
            thumbnails={property.thumbnails}
          />
        </div>,
      )
    })
  } else {
    // If filter is active, just show the filtered properties
    currentPageProperties.forEach((property) => {
      gridItems.push(
        <div key={property.id} className="transition-all duration-500 ease-in-out transform">
          <PropertyCard
            key={property.id}
            id={property.id}
            images={property.images}
            price={property.price}
            period={property.period}
            isPBSA={property.isPBSA}
            bills={property.bills}
            tags={property.tags}
            type={property.type}
            size={property.size}
            bedrooms={property.bedrooms}
            availableFrom={property.availableFrom}
            landlordType={property.landlordType}
            rating={property.rating}
            reviews={property.reviews}
            features={property.features}
            amenities={property.amenities}
            depositInfo={property.depositInfo}
            priceValue={property.priceValue}
            billsIncluded={property.billsIncluded}
            title={property.title}
            location={property.location}
            sizeRange={property.sizeRange}
            roomTypes={property.roomTypes}
            genderPolicy={property.genderPolicy}
            facilitiesShort={property.facilitiesShort}
            placesLeft={property.placesLeft}
            hasFlexibleCancellation={property.hasFlexibleCancellation}
            thumbnails={property.thumbnails}
          />
        </div>,
      )
    })
  }

  return (
    <>
      {isAnyFilterActive && (
        <div className="mb-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center">
            <Image
              src={getActiveFilterIcon() || "/placeholder.svg"}
              alt="Filter icon"
              width={16}
              height={16}
              className="mr-2"
            />
            <span className="font-medium">{getActiveFilterMessage()}</span>
          </div>
          <button onClick={clearFilters} className="text-sm text-gray-600 hover:text-gray-900 underline">
            Clear filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 transition-all duration-500 ease-in-out">
        {gridItems}
      </div>
    </>
  )
}
