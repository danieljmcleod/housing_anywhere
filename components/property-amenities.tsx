"use client"

import { useState } from "react"
import { Home, Tv, Thermometer, Coffee, Wifi } from "lucide-react"

interface PropertyAmenitiesProps {
  facilities: string[]
  amenities: string[]
}

export function PropertyAmenities({ facilities, amenities }: PropertyAmenitiesProps) {
  const [showMore, setShowMore] = useState(false)

  // Helper function to get icon for facility/amenity
  const getIcon = (name: string) => {
    const iconProps = { className: "h-5 w-5 mr-3 text-gray-500" }

    if (name.toLowerCase().includes("living")) return <Home {...iconProps} />
    if (name.toLowerCase().includes("wifi")) return <Wifi {...iconProps} />
    if (name.toLowerCase().includes("heating")) return <Thermometer {...iconProps} />
    if (name.toLowerCase().includes("kitchen")) return <Coffee {...iconProps} />

    return <Tv {...iconProps} />
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Facilities</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Facilities</h3>
            <ul className="space-y-3">
              {facilities.map((facility, index) => (
                <li key={index} className="flex items-center">
                  {getIcon(facility)}
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Amenities</h3>
            <ul className="space-y-3">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  {getIcon(amenity)}
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!showMore && (
          <button className="mt-4 text-blue-600 hover:underline text-sm" onClick={() => setShowMore(true)}>
            Show more
          </button>
        )}
      </div>
    </div>
  )
}
