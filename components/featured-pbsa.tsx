import Link from "next/link"
import { PropertyCard } from "@/components/property-card"

export function FeaturedPBSA() {
  const pbsaListings = [
    {
      id: "pbsa1",
      images: ["/property-images/student-common-area-1.png"],
      price: "€650",
      period: "/month",
      isPBSA: true,
      bills: "(bills included)",
      tags: ["Co-living", "Popular"],
      type: "Student residence",
      title: "Modern student residence in Barcelona with shared facilities",
      location: "Barcelona",
      sizeRange: "20 m² - 45 m²",
      roomTypes: ["Private room", "Studio"],
      genderPolicy: "Any gender",
      facilitiesShort: ["Gym", "Study room"],
      placesLeft: 15,
      hasFlexibleCancellation: true,
      thumbnails: ["/property-images/student-room-thumbnail-1.png", "/property-images/student-room-thumbnail-2.png"],
      pbsaProvider: {
        name: "La Fabrica & Co Barcelona",
        logo: "/pbsa-logos/la-fabrica-logo.png",
      },
      rating: 4.8,
      reviews: 124,
      landlordType: "Student housing provider",
      priceValue: 650,
      billsIncluded: true,
    },
    {
      id: "pbsa2",
      images: ["/property-images/pbsa-1.png"],
      price: "€580",
      period: "/month",
      isPBSA: true,
      bills: "(bills included)",
      tags: ["Co-living"],
      type: "Student residence",
      title: "Contemporary student housing in Rotterdam with fitness center",
      location: "Rotterdam",
      sizeRange: "18 m² - 35 m²",
      roomTypes: ["Private room", "Shared room"],
      genderPolicy: "Any gender",
      facilitiesShort: ["Gym", "Cinema"],
      placesLeft: 8,
      hasFlexibleCancellation: false,
      thumbnails: ["/property-images/student-room-thumbnail-1.png", "/property-images/student-room-thumbnail-2.png"],
      pbsaProvider: {
        name: "Student Castle",
        logo: "/pbsa-logos/student-castle-logo.png",
      },
      rating: 4.6,
      reviews: 98,
      landlordType: "Student housing provider",
      priceValue: 580,
      billsIncluded: true,
    },
    {
      id: "pbsa3",
      images: ["/property-images/apartment-11.jpeg"],
      price: "€720",
      period: "/month",
      isPBSA: true,
      bills: "(bills excluded)",
      tags: ["Co-living", "Popular"],
      type: "Student residence",
      title: "Premium student living space in Berlin with community spaces",
      location: "Berlin",
      sizeRange: "25 m² - 50 m²",
      roomTypes: ["Studio", "Apartment"],
      genderPolicy: "Any gender",
      facilitiesShort: ["Study area", "Laundry"],
      placesLeft: 22,
      hasFlexibleCancellation: true,
      thumbnails: ["/property-images/student-room-thumbnail-1.png", "/property-images/student-room-thumbnail-2.png"],
      pbsaProvider: {
        name: "Urban Student",
        logo: "/pbsa-logos/la-fabrica-logo.png",
      },
      rating: 4.7,
      reviews: 156,
      landlordType: "Student housing provider",
      priceValue: 720,
      billsIncluded: false,
    },
  ]

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured student residences</h2>
        <Link href="/search?type=student-residence" className="text-[#FF4B27] font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {pbsaListings.map((listing) => (
          <PropertyCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  )
}
