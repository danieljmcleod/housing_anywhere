"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, Heart, Share2, MapPin, Star, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchHeader } from "@/components/search-header"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyRules } from "@/components/property-rules"
import { PropertySafety } from "@/components/property-safety"
import { PropertyDocuments } from "@/components/property-documents"
import { PropertyContract } from "@/components/property-contract"
import { PropertyCancellation } from "@/components/property-cancellation"
import { PropertyFAQ } from "@/components/property-faq"
import { SimilarProperties } from "@/components/similar-properties"
import { Footer } from "@/components/footer"
import { PaymentPanel } from "@/components/payment-panel"
import { DatePicker } from "@/components/date-picker"
import { format, addMonths } from "date-fns"

interface PropertyData {
  id: string
  price: number
  type: string
  depositType: string
  billsIncluded: boolean
  images: string[]
  title: string
  landlordType: string
  rating: number
  reviews: number
  location?: string
  moveInDate?: Date
  moveOutDate?: Date
}

interface PropertyListingProps {
  id: string
  propertyData?: PropertyData
}

export function PropertyListing({ id, propertyData }: PropertyListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFavorite, setIsFavorite] = useState(false)

  // Set default dates if not provided
  const defaultMoveInDate = new Date(2025, 4, 16) // 16 May 2025
  const defaultMoveOutDate = new Date(2025, 5, 30) // 30 Jun 2025

  // Use dates from propertyData or defaults
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(propertyData?.moveInDate || defaultMoveInDate)
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>(propertyData?.moveOutDate || defaultMoveOutDate)

  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false)

  // Handle date changes
  const handleMoveInDateChange = (date: Date | undefined) => {
    setMoveInDate(date)

    // If move-out date is before move-in date, update it
    if (date && moveOutDate && date > moveOutDate) {
      setMoveOutDate(addMonths(date, 1))
    }
  }

  const handleMoveOutDateChange = (date: Date | undefined) => {
    setMoveOutDate(date)

    // If move-in date is after move-out date, update it
    if (date && moveInDate && date < moveInDate) {
      setMoveInDate(date)
    }
  }

  // Calculate fees based on property price
  const calculateFees = (price: number) => {
    const tenantProtectionFee = Math.round(price * 0.15)
    const rentGuaranteeFee = Math.round(price * 0.03)
    const totalPrice = price + tenantProtectionFee + rentGuaranteeFee

    return {
      tenantProtectionFee,
      rentGuaranteeFee,
      totalPrice,
    }
  }

  // Use the provided property data or fallback to default values
  const property = {
    id,
    title: propertyData?.title || "Carrer de Puigcerdà",
    location: propertyData?.location || "Rotterdam",
    type: propertyData?.type || "Apartment",
    price: propertyData?.price || 950,
    size: 65,
    furnished: true,
    bedrooms: 2,
    bathrooms: 1,
    depositType: propertyData?.depositType || "Deposit Saver",
    billsIncluded: propertyData?.billsIncluded || false,
    landlord: {
      name: "Alejandra",
      rating: propertyData?.rating || 4.8,
      reviews: propertyData?.reviews || 24,
      image: "/diverse-group.png",
    },
    description:
      "This great selected studio in our residence located in the middle of Barcelona is ideal for any new student that is arriving in our sunny city and is for a private space. The studio includes closets and storage space, study desk and chair, your own bathroom and small kitchen, AC, shelf for books and high speed Wi-Fi.",
    additionalInfo:
      "Included in the price there is access to our gym, rooftop pool and all of our common and study areas!",
    disclaimer: "Please be aware that HousingAnywhere is an online booking platform.",
    images: propertyData?.images || [
      "/property-images/apartment-1.jpeg",
      "/property-images/apartment-2.jpeg",
      "/property-images/apartment-3.jpeg",
      "/property-images/apartment-4.jpeg",
      "/property-images/apartment-5.jpeg",
    ],
    facilities: ["Private living room", "Private Toilet", "Private kitchen", "Private bathroom"],
    amenities: ["Flooring", "Central heating", "Kitchenware", "WiFi"],
    rules: {
      minimumAge: 18,
      tenantType: "Business Only",
      couplesAllowed: false,
      smokingAllowed: false,
      petsAllowed: false,
    },
  }

  // Calculate fees based on the property price
  const { tenantProtectionFee, rentGuaranteeFee, totalPrice } = calculateFees(property.price)

  // Calculate stay duration in months
  const calculateStayDuration = () => {
    if (!moveInDate || !moveOutDate) return 0

    const months =
      (moveOutDate.getFullYear() - moveInDate.getFullYear()) * 12 + moveOutDate.getMonth() - moveInDate.getMonth()
    return months
  }

  const stayDuration = calculateStayDuration()

  // Update URL when dates change
  useEffect(() => {
    if (moveInDate && moveOutDate) {
      const currentParams = new URLSearchParams(searchParams.toString())
      currentParams.set("moveIn", format(moveInDate, "d-MMM-yyyy"))
      currentParams.set("moveOut", format(moveOutDate, "d-MMM-yyyy"))

      // Update URL without refreshing the page
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`
      window.history.replaceState({ path: newUrl }, "", newUrl)
    }
  }, [moveInDate, moveOutDate, searchParams])

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader />

      <main className="flex-grow">
        {/* Breadcrumb navigation */}
        <div className="container mx-auto px-4 py-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/search?location=${property.location}`} className="hover:text-gray-900">
              {property.location}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/search?location=${property.location}&type=${property.type}`} className="hover:text-gray-900">
              {property.type}s
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Property details */}
            <div className="lg:col-span-2">
              {/* Property gallery */}
              <PropertyGallery images={property.images} />

              {/* Property title and basic info */}
              <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-2xl font-bold">{property.title}</h1>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => setIsFavorite(!isFavorite)}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-[#FF4B27] text-[#FF4B27]" : ""}`} />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Property details */}
              <div className="mt-6 flex flex-wrap gap-4 border-t border-b py-4">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">€{property.price}</span>
                  <span className="text-gray-600">
                    per month, {property.billsIncluded ? "bills included" : "bills excluded"}, eligible for{" "}
                    {property.depositType}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
                  <div>{property.type}</div>
                  <div>{property.size} m²</div>
                  <div>{property.furnished ? "Furnished" : "Unfurnished"}</div>
                  <div>{property.bedrooms} bedrooms</div>
                </div>
              </div>

              {/* Property description */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">{property.description}</p>
                  <p className="text-gray-700 mb-4">{property.additionalInfo}</p>
                  <p className="text-gray-500 text-sm">{property.disclaimer}</p>
                </div>
              </div>

              {/* Rent guarantee section */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-[#002630] p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">No guarantor? Choose HousingAnywhere Rent Guarantee</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  This landlord may ask for a guarantor. HousingAnywhere Rent Guarantee saves you the hassle of finding
                  one and costs only 3% of your total rent.
                </p>
              </div>

              {/* Amenities section */}
              <PropertyAmenities facilities={property.facilities} amenities={property.amenities} />

              {/* Rules section */}
              <PropertyRules rules={property.rules} />

              {/* Safety section */}
              <PropertySafety />

              {/* Required documents section */}
              <PropertyDocuments />

              {/* Contract type section */}
              <PropertyContract
                property={{
                  price: property.price,
                  depositType: property.depositType,
                  landlord: property.landlord,
                }}
                moveInDate={moveInDate || defaultMoveInDate}
                moveOutDate={moveOutDate || defaultMoveOutDate}
              />

              {/* Cancellation policy section */}
              <PropertyCancellation />

              {/* FAQ section */}
              <PropertyFAQ />
            </div>

            {/* Right column - Booking details */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-white rounded-lg border shadow-sm overflow-hidden">
                {/* Landlord info */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={property.landlord.image || "/placeholder.svg"}
                        alt={property.landlord.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <div className="text-gray-600 text-sm">Advertised by</div>
                        <div className="flex items-center">
                          <span className="font-bold text-xl">{property.landlord.name}</span>
                          <div className="ml-2 text-white bg-[#FF4B27] p-1 rounded">
                            <Star className="h-4 w-4 fill-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-700 fill-yellow-700 mr-1" />
                      <span className="font-bold text-xl">{property.landlord.rating}</span>
                      <span className="text-gray-500 text-lg">/5</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  {/* Move-in/out dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Move-in date</label>
                      <div className="relative">
                        <DatePicker
                          date={moveInDate}
                          onDateChange={handleMoveInDateChange}
                          placeholder="Select move-in date"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Move-out date</label>
                      <div className="relative">
                        <DatePicker
                          date={moveOutDate}
                          onDateChange={handleMoveOutDateChange}
                          placeholder="Select move-out date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-lg text-gray-700 font-medium">
                        <span>First month's rent</span>
                        <Info className="h-5 w-5 text-gray-400 ml-2" />
                      </div>
                      <span className="text-lg font-bold">€{property.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-lg text-gray-700 font-medium">
                        <span>Tenant Protection</span>
                        <Info className="h-5 w-5 text-gray-400 ml-2" />
                      </div>
                      <span className="text-lg font-bold">€{tenantProtectionFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-lg text-gray-700 font-medium">
                        <span>Rent Guarantee</span>
                        <Info className="h-5 w-5 text-gray-400 ml-2" />
                      </div>
                      <span className="text-lg font-bold">€{rentGuaranteeFee}</span>
                    </div>
                    {/* Deposit comparison - only show for Deposit Saver */}
                    {property.depositType === "Deposit Saver" && (
                      <>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-lg text-gray-700 font-medium">
                            <span className="line-through text-gray-400">Deposit</span>
                            <Info className="h-5 w-5 text-gray-400 ml-2" />
                          </div>
                          <span className="text-lg font-bold line-through text-gray-400">
                            €{Math.round(property.price * 2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-lg text-gray-700 font-medium">
                            <span className="ml-6">Deposit Saver</span>
                          </div>
                          <span className="text-lg font-bold text-green-600">€{Math.round(property.price * 0.05)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Deposit badge - only show for No Deposit or Deposit Saver */}
                  {(property.depositType === "No Deposit" || property.depositType === "Deposit Saver") && (
                    <div className="bg-green-50 p-4 rounded-md relative group">
                      <div className="flex items-center">
                        <div className="mr-3 text-green-600">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-6.823L7.775 12.13a.75.75 0 10-1.06 1.06l3.578 3.579a.75.75 0 001.06 0l6.294-6.293a.75.75 0 00-1.06-1.06l-5.764 5.764z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="text-lg font-medium text-green-800">
                          {property.depositType === "No Deposit"
                            ? "No deposit — Rent without a deposit."
                            : "Deposit Saver — Pay less to move in."}
                        </span>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute left-0 bottom-full mb-2 w-full max-w-md bg-white rounded-lg p-4 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <p className="text-gray-700">
                          This small one-time fee protects the landlord and replaces a traditional deposit. So you pay less upfront and stay in control of your money — that’s a win-win.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t pt-4">
                    {/* Total price */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-xl">To book</span>
                      <span className="text-2xl font-bold">€{totalPrice}</span>
                    </div>

                    {/* View all payments button */}
                    <button
                      className="flex items-center text-[#002630] font-medium mb-4 hover:underline"
                      onClick={() => setIsPaymentPanelOpen(true)}
                    >
                      <svg
                        className="mr-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 7H21V17H3V7Z"
                          stroke="#002630"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 11H21"
                          stroke="#002630"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      View all payments
                    </button>

                    {/* Contact button */}
                    <Button className="w-full bg-[#FF4B27] hover:bg-[#e63e1c] text-white text-lg py-6 font-medium">
                      Contact {property.landlord.name}
                    </Button>

                    <div className="text-center text-gray-500 mt-4">You won't be charged yet.</div>
                  </div>

                  {/* How to book */}
                  <div className="border-t pt-4">
                    <button className="flex items-center text-[#002630] font-medium hover:underline">
                      <svg
                        className="mr-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" stroke="#002630" strokeWidth="2" />
                        <path d="M12 17V11" stroke="#002630" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="8" r="1" fill="#002630" />
                      </svg>
                      How to book this property
                    </button>
                  </div>
                </div>

                {/* Tenant protection */}
                <div className="bg-blue-50 p-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="mr-3 text-blue-600"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.97485 24.9218C8.72812 23.4408 9.8765 22.1971 11.2929 21.3284C12.7093 20.4598 14.3384 20 16 20C17.6615 20 19.2906 20.4598 20.707 21.3284C22.1234 22.1971 23.2718 23.4408 24.0251 24.9218"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h4 className="font-bold text-xl text-blue-700">Covered by Tenant Protection</h4>
                  </div>
                  <p className="text-blue-700 mb-2 ml-9">You're guaranteed a stress-free move in or your money back.</p>
                  <button className="text-blue-700 underline ml-9 font-medium">How you're protected</button>
                </div>

                <PaymentPanel
                  isOpen={isPaymentPanelOpen}
                  onClose={() => setIsPaymentPanelOpen(false)}
                  property={{
                    price: property.price,
                    depositType: property.depositType,
                    landlord: property.landlord,
                  }}
                  moveInDate={moveInDate || defaultMoveInDate}
                  moveOutDate={moveOutDate || defaultMoveOutDate}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Similar properties section */}
        <SimilarProperties city={property.location} />
      </main>

      <Footer />
    </div>
  )
}
