"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Star, ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  id: string
  images: string[]
  price: string
  period: string
  isPBSA?: boolean
  bills?: string
  tags?: string[]
  type: string
  size?: string
  bedrooms?: string
  availableFrom?: string
  landlordType?: string
  rating?: number
  reviews?: number
  features?: string[]
  amenities?: string[]
  depositInfo?: string
  additionalInfo?: string
  priceValue?: number
  billsIncluded?: boolean
  // PBSA specific props
  title?: string
  location?: string
  sizeRange?: string
  roomTypes?: string[]
  genderPolicy?: string
  facilitiesShort?: string[]
  placesLeft?: number
  hasFlexibleCancellation?: boolean
  thumbnails?: string[]
  // New PBSA provider props
  pbsaProvider?: {
    name: string
    logo: string
  }
}

export function PropertyCard(props: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const searchParams = useSearchParams()
  const [isVideoHovered, setIsVideoHovered] = useState(false)

  // Get the current search location or default to Rotterdam
  const currentLocation = searchParams?.get("location") || "Rotterdam"

  // Extract numeric price if not provided
  const numericPrice = props.priceValue || Number.parseInt(props.price.replace(/[^0-9]/g, ""))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % props.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + props.images.length) % props.images.length)
  }

  // Create query params for property details
  const queryParams = new URLSearchParams()
  queryParams.set("price", numericPrice.toString())
  queryParams.set("type", props.type)
  queryParams.set("depositType", props.depositInfo || "Standard")
  queryParams.set("billsIncluded", (props.billsIncluded || props.bills?.includes("included")).toString())
  queryParams.set("images", props.images.join(","))
  queryParams.set(
    "title",
    props.isPBSA ? props.title || `Student residence in ${currentLocation}` : `${props.type} in ${currentLocation}`,
  )
  queryParams.set("landlordType", props.landlordType || "Private landlord")
  queryParams.set("rating", (props.rating || 4.5).toString())
  queryParams.set("reviews", (props.reviews || 10).toString())
  queryParams.set("location", props.location || currentLocation)

  const propertyQueryParams = queryParams.toString()

  // Function to determine which badge to show (priority order) - only for non-PBSA cards
  const getPriorityBadge = () => {
    if (props.isPBSA) {
      return null // No badges for PBSA cards
    }

    if (props.depositInfo) {
      // Only show Deposit Saver badges, hide No Deposit badges
      if (props.depositInfo === "Deposit Saver") {
        return (
          <div className="px-3 py-1.5 text-sm font-medium rounded-md bg-white text-gray-800 flex items-center">
            <Image src="/deposit_saver_icon.svg" alt={props.depositInfo} width={16} height={16} className="mr-2" />
            {props.depositInfo}
          </div>
        )
      }
      return null // Hide No Deposit badges completely
    } else if (props.hasFlexibleCancellation) {
      return (
        <div className="px-3 py-1.5 text-sm font-medium rounded-md bg-white text-gray-800">Flexible cancellation</div>
      )
    } else if (props.tags && props.tags.length > 0) {
      const tag = props.tags[0]
      return (
        <span
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md bg-white",
            tag === "Co-living" ? "text-gray-800" : "",
            tag === "Popular" ? "text-gray-800" : "",
            tag === "New" ? "text-gray-800" : "",
          )}
        >
          {tag === "Popular" && <span className="mr-1">🔥</span>}
          {tag}
        </span>
      )
    }
    return null
  }

  // Generate PBSA provider data
  const getPBSAProvider = () => {
    if (props.pbsaProvider) {
      return props.pbsaProvider
    }

    // Default PBSA providers
    const providers = [
      { name: "La Fabrica & Co Barcelona", logo: "/pbsa-logos/la-fabrica-logo.png" },
      { name: "Student Castle", logo: "/pbsa-logos/student-castle-logo.png" },
      { name: "Urbanest", logo: "/pbsa-logos/urbanest-logo.png" },
      { name: "Chapter", logo: "/pbsa-logos/chapter-logo.png" },
    ]

    // Use a deterministic selection based on property ID
    const index = Number.parseInt(props.id) % providers.length
    return providers[index]
  }

  // Render PBSA card (new design)
  if (props.isPBSA) {
    // Use thumbnails if provided, otherwise use the first two images
    const cardThumbnails =
      props.thumbnails && props.thumbnails.length > 0
        ? props.thumbnails
        : props.images.slice(0, Math.min(2, props.images.length))

    const pbsaProvider = getPBSAProvider()

    return (
      <Link href={`/property/${props.id}?${propertyQueryParams}`}>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow property-card cursor-pointer">
          <div className="relative">
            {/* Main image with video hover */}
            <div
              className="relative h-[220px] w-full"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              {/* Static image */}
              <Image
                src={props.images[currentImageIndex] || "/placeholder.svg?height=300&width=400&query=student residence"}
                alt={props.title || `Student residence in ${currentLocation}`}
                fill
                className={`object-cover transition-opacity duration-300 ${isVideoHovered ? "opacity-0" : "opacity-100"}`}
              />

              {/* Video overlay */}
              <video
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoHovered ? "opacity-100" : "opacity-0"}`}
                muted
                loop
                playsInline
                onLoadedData={(e) => {
                  if (isVideoHovered) {
                    e.currentTarget.play()
                  }
                }}
                ref={(video) => {
                  if (video) {
                    if (isVideoHovered) {
                      video.currentTime = 0
                      video.play()
                    } else {
                      video.pause()
                      video.currentTime = 0
                      video.currentTime = 0
                    }
                  }
                }}
              >
                <source src="/videos/la-fabrica-co-barcelona.mp4" type="video/mp4" />
              </video>

              {/* Gradient overlay at bottom of image/video */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* PBSA Provider overlay at bottom of image/video */}
              <div className="absolute bottom-3 left-3 flex items-center z-10">
                <div className="w-10 h-10 pbsa-logo overflow-hidden mr-2 flex-shrink-0">
                  <Image
                    src={pbsaProvider.logo || "/placeholder.svg"}
                    alt={pbsaProvider.name}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-white font-medium truncate text-base">{pbsaProvider.name}</span>
              </div>
            </div>
          </div>

          {/* Image navigation */}
          {props.images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                onClick={(e) => {
                  e.preventDefault()
                  prevImage()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                onClick={(e) => {
                  e.preventDefault()
                  nextImage()
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </>
          )}

          <div className="p-4">
            {/* Title */}
            <h2 className="font-semibold text-[#002630] mb-1 line-clamp-2 min-h-[48px]" style={{ fontSize: "16px" }}>
              {props.title ||
                `Student residence in ${props.location || currentLocation} - Modern accommodation for students`}
            </h2>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-1 truncate" style={{ fontSize: "16px" }}>
              <span className="font-medium">{props.sizeRange || props.size || "35 m² - 145 m²"}</span>
              <span>•</span>
              <span className="truncate">{props.genderPolicy || "Any gender"}</span>
              {props.facilitiesShort && props.facilitiesShort.length > 0 && (
                <>
                  <span>•</span>
                  <span className="truncate">{props.facilitiesShort.join(", ")}</span>
                </>
              )}
            </div>

            {/* Bottom card with thumbnails and price */}
            <div className="flex items-center gap-1 mt-4">
              {/* Thumbnails with hover animation */}
              <div className="thumbnails-wrapper">
                {cardThumbnails.length >= 2 && (
                  <>
                    <div className="thumbnail thumbnail-left">
                      <Image
                        src={cardThumbnails[0] || "/placeholder.svg"}
                        alt="Room thumbnail 1"
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="thumbnail thumbnail-right">
                      <Image
                        src={cardThumbnails[1] || "/placeholder.svg"}
                        alt="Room thumbnail 2"
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-start ml-2">
                {/* Places left badge - always show for PBSA cards if available */}
                {props.placesLeft !== undefined && (
                  <div className="bg-yellow-100 text-[#002630] px-3 py-1.5 rounded-full text-sm font-medium flex items-center mb-2">
                    <Zap className="h-4 w-4 mr-1 fill-current" />
                    {(() => {
                      // Use the property ID to get a deterministic but seemingly random message
                      const hash = Number(props.id.replace(/\D/g, "")) || 0
                      const messageIndex = hash % 2 // Changed from 3 to 2 options
                      const messages = ["Some units left", "Few units left"] // Updated message content
                      return messages[messageIndex]
                    })()}
                  </div>
                )}

                {/* Price */}
                <div className="font-bold text-[#002630] whitespace-nowrap" style={{ fontSize: "16px" }}>
                  From {props.price}
                  <span className="text-base font-normal">{props.period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Standard property card (updated design based on reference)
  return (
    <Link href={`/property/${props.id}?${propertyQueryParams}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <div className="relative h-[220px] w-full">
            <Image
              src={props.images[currentImageIndex] || "/placeholder.svg?height=300&width=400&query=apartment"}
              alt={`${props.bedrooms || ""} ${props.type} in ${currentLocation}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Single badge based on priority - only for non-PBSA cards */}
          <div className="absolute top-3 left-3">{getPriorityBadge()}</div>

          {/* Image navigation */}
          {props.images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                onClick={(e) => {
                  e.preventDefault()
                  prevImage()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                onClick={(e) => {
                  e.preventDefault()
                  nextImage()
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>

              {/* Image dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
                {props.images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 rounded-full ${index === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentImageIndex(index)
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          {/* Title */}
          <h2
            className="font-semibold text-[#002630] mb-4 line-clamp-2 min-h-[48px] overflow-hidden"
            style={{ fontSize: "16px" }}
          >
            {props.bedrooms ? `${props.bedrooms} bedroom` : ""} {props.type} in {currentLocation}
          </h2>

          {/* Property details */}
          <div className="flex items-center gap-2 text-gray-700 mb-1 truncate overflow-hidden">
            {props.size && <span>{props.size}</span>}
            {props.genderPolicy && (
              <>
                <span className="text-gray-400">•</span>
                <span className="truncate">{props.genderPolicy}</span>
              </>
            )}
            {props.features && props.features.length > 0 && (
              <>
                <span className="text-gray-400">•</span>
                <span className="truncate">{props.features[0]}</span>
              </>
            )}
          </div>

          {/* Availability */}
          {props.availableFrom && <div className="text-gray-700 mb-1 truncate">From {props.availableFrom}</div>}

          {/* Landlord and rating */}
          {props.landlordType && (
            <div className="flex items-center gap-2 text-gray-700 mb-1 mt-4 text-sm truncate">
              <span className="truncate">{props.landlordType}</span>
              {props.rating && props.reviews && (
                <div className="flex items-center flex-shrink-0">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1">
                    {props.rating} ({props.reviews})
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Price section */}
          <div className="flex items-center text-[#002630] truncate">
            <span className="font-bold flex-shrink-0" style={{ fontSize: "16px" }}>
              {props.price}
            </span>
            <span className="text-gray-600 ml-1 flex-shrink-0">{props.period}</span>
            {props.bills && <span className="text-gray-600 ml-2 truncate">• {props.bills}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
