"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)

  const handlePrevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
        <Image
          src={images[mainImageIndex] || "/placeholder.svg"}
          alt="Property"
          fill
          className="object-cover"
          priority
        />

        {/* Navigation buttons */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail gallery */}
      <div className="flex mt-2 space-x-2 overflow-x-auto pb-2">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
              index === mainImageIndex ? "ring-2 ring-[#FF4B27]" : ""
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
        {images.length > 5 && (
          <button
            onClick={() => setShowAllImages(true)}
            className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center"
          >
            <span className="text-sm font-medium">+{images.length - 5}</span>
          </button>
        )}
      </div>
    </div>
  )
}
