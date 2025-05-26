"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  id: string
  image: string
  price: number
  period: string
  billsInfo: string
  propertyType: string
  size: number
  additionalInfo?: string
  availableFrom: string
  bedrooms?: number
}

function SimilarPropertyCard({
  id,
  image,
  price,
  period,
  billsInfo,
  propertyType,
  size,
  additionalInfo,
  availableFrom,
  bedrooms,
}: PropertyCardProps) {
  return (
    <Link href={`/property/${id}`} className="block">
      <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
        <div className="relative h-44 w-full">
          <Image src={image || "/placeholder.svg"} alt={propertyType} fill className="object-cover" />
        </div>
        <div className="p-3">
          <div className="flex items-baseline mb-2">
            <span className="text-lg font-bold">€{price}</span>
            <span className="text-sm text-gray-600 ml-1">{period}</span>
            <span className="text-sm text-gray-600 ml-1">({billsInfo})</span>
          </div>
          <div className="text-sm text-gray-700">
            <div className="flex flex-wrap gap-x-1">
              <span>{propertyType}</span>
              {bedrooms && (
                <>
                  <span>•</span>
                  <span>
                    {bedrooms} {bedrooms === 1 ? "bedroom" : "bedrooms"}
                  </span>
                </>
              )}
              <span>•</span>
              <span>{size} m²</span>
              {additionalInfo && (
                <>
                  <span>•</span>
                  <span>{additionalInfo}</span>
                </>
              )}
            </div>
            <div className="mt-1">{availableFrom}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function SimilarProperties({ city = "Rotterdam" }: { city?: string }) {
  // Mock data for similar properties
  const similarProperties = [
    {
      id: "101",
      image: "/property-images/apartment-1.jpeg",
      price: 1445,
      period: "/Month",
      billsInfo: "Bills included",
      propertyType: "Building",
      bedrooms: 1,
      size: 32,
      availableFrom: "From 7 Aug 2023",
    },
    {
      id: "102",
      image: "/property-images/apartment-2.jpeg",
      price: 1054,
      period: "/Month",
      billsInfo: "Bills included",
      propertyType: "Private room",
      size: 14,
      additionalInfo: "250 housemates",
      availableFrom: "From 7 Aug 2023",
    },
    {
      id: "103",
      image: "/property-images/apartment-3.jpeg",
      price: 1350,
      period: "/Month",
      billsInfo: "Bills excluded",
      propertyType: "Studio",
      size: 45,
      additionalInfo: "Space for 4 people",
      availableFrom: "From 20 Aug 2023",
    },
    {
      id: "104",
      image: "/property-images/apartment-4.jpeg",
      price: 1450,
      period: "/Month",
      billsInfo: "Some bills included",
      propertyType: "Apartment",
      bedrooms: 2,
      size: 65,
      availableFrom: "From 7 Aug 2023",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Similar places in {city}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProperties.map((property) => (
            <SimilarPropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-[#002630] text-[#002630] hover:bg-gray-100">
            FIND MORE ROOMS IN {city.toUpperCase()}
          </Button>
        </div>
      </div>
    </section>
  )
}
