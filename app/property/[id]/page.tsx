"use client"

import { PropertyListing } from "@/components/property-listing"
import { useSearchParams } from "next/navigation"
import { parse, isValid } from "date-fns"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const searchParams = useSearchParams()

  // Extract location from search parameters or use Rotterdam as default
  const location = searchParams.get("location") || "Rotterdam"

  // Extract and parse move-in and move-out dates
  const moveInParam = searchParams.get("moveIn")
  const moveOutParam = searchParams.get("moveOut")

  // Parse dates if they exist in the format "d-MMM-yyyy" (e.g., "16-May-2025")
  let moveInDate: Date | undefined
  let moveOutDate: Date | undefined

  if (moveInParam) {
    const parsedDate = parse(moveInParam, "d-MMM-yyyy", new Date())
    if (isValid(parsedDate)) {
      moveInDate = parsedDate
    }
  }

  if (moveOutParam) {
    const parsedDate = parse(moveOutParam, "d-MMM-yyyy", new Date())
    if (isValid(parsedDate)) {
      moveOutDate = parsedDate
    }
  }

  // Extract property data from query params
  const propertyData = {
    id: params.id,
    price: Number.parseInt(searchParams.get("price") || "950"),
    type: searchParams.get("type") || "Apartment",
    depositType: searchParams.get("depositType") || "Standard",
    billsIncluded: searchParams.get("billsIncluded") === "true",
    images: searchParams.get("images")?.split(",") || ["/property-images/apartment-1.jpeg"],
    title: searchParams.get("title") || `Property ${params.id}`,
    landlordType: searchParams.get("landlordType") || "Private landlord",
    rating: Number.parseFloat(searchParams.get("rating") || "4.5"),
    reviews: Number.parseInt(searchParams.get("reviews") || "10"),
    location: location,
    moveInDate: moveInDate,
    moveOutDate: moveOutDate,
  }

  return <PropertyListing id={params.id} propertyData={propertyData} />
}
