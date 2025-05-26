"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Info, ChevronRight, ChevronUp } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { format, differenceInDays, differenceInMonths, addMonths, isSameMonth, isBefore } from "date-fns"

interface PaymentPanelProps {
  isOpen: boolean
  onClose: () => void
  property: {
    price: number
    depositType: string
    landlord: {
      name: string
      image: string
    }
  }
  moveInDate: Date
  moveOutDate: Date
}

export function PaymentPanel({ isOpen, onClose, property, moveInDate, moveOutDate }: PaymentPanelProps) {
  const [isLandlordPaymentsExpanded, setIsLandlordPaymentsExpanded] = useState(true)

  // Calculate rental duration and payments
  const rentalCalculations = useMemo(() => {
    // Calculate total duration in months (rounded up for partial months)
    const totalMonths = differenceInMonths(moveOutDate, moveInDate) + 1

    // Calculate tenant protection fee (15% of first month's rent)
    const tenantProtectionFee = Math.round(property.price * 0.15)

    // Calculate rent guarantee fee (3% of total rent for the entire period)
    const totalRentEstimate = property.price * totalMonths
    const rentGuaranteeFee = Math.round(totalRentEstimate * 0.03)

    // Calculate initial payment
    const initialPayment = property.price + tenantProtectionFee + rentGuaranteeFee

    // Calculate traditional deposit (2x monthly rent)
    const traditionalDeposit = property.price * 2

    // Calculate deposit saver fee (5% of monthly rent)
    const depositSaverFee = Math.round(property.price * 0.05)

    // Generate monthly payment schedule
    const paymentSchedule = []
    let currentDate = new Date(moveInDate)

    while (isBefore(currentDate, moveOutDate) || isSameMonth(currentDate, moveOutDate)) {
      const paymentMonth = new Date(currentDate)
      const nextMonth = addMonths(currentDate, 1)

      // Check if this is a partial month
      let amount = property.price
      let isPartial = false
      const daysInMonth = differenceInDays(isBefore(nextMonth, moveOutDate) ? nextMonth : moveOutDate, currentDate)

      // For first month
      if (isSameMonth(currentDate, moveInDate) && currentDate.getDate() > 1) {
        isPartial = true
        // If using fortnightly contract
        if (daysInMonth <= 14) {
          amount = Math.round(property.price / 2)
        }
      }

      // For last month
      if (isSameMonth(currentDate, moveOutDate) && moveOutDate.getDate() < 28) {
        isPartial = true
        // If using fortnightly contract
        if (daysInMonth <= 14) {
          amount = Math.round(property.price / 2)
        }
      }

      paymentSchedule.push({
        startDate: new Date(currentDate),
        endDate: isBefore(nextMonth, moveOutDate) ? new Date(nextMonth) : new Date(moveOutDate),
        amount,
        isPartial,
        daysInMonth,
      })

      currentDate = nextMonth
    }

    return {
      totalMonths,
      tenantProtectionFee,
      rentGuaranteeFee,
      initialPayment,
      paymentSchedule,
      traditionalDeposit,
      depositSaverFee,
    }
  }, [moveInDate, moveOutDate, property.price])

  // Utility costs (static for this example, but could be made dynamic)
  const utilities = {
    water: 50,
    wifi: 30,
    electricity: 30,
    gas: 50,
  }

  // Payment methods logos
  const paymentMethods = [
    { name: "American Express", logo: "/amex-logo.png" },
    { name: "Mastercard", logo: "/mastercard-logo.png" },
    { name: "Visa", logo: "/visa-logo-generic.png" },
    { name: "Sofort", logo: "/sofort-logo.png" },
    { name: "iDEAL", logo: "/ideal-logo.png" },
  ]

  // Format date range for display
  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "d MMM yyyy")} - ${format(end, "d MMM yyyy")}`
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg p-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl font-bold">Payment details</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Payment to HousingAnywhere */}
            <div className="p-6 border-b">
              <div className="flex items-center mb-6">
                <span className="text-lg font-semibold">You</span>
                <ChevronRight className="mx-3 text-gray-400" />
                <span className="text-lg font-semibold">HousingAnywhere</span>
                <span className="text-sm text-gray-500 ml-2">(Pay to secure the property)</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>First month's rent</span>
                  <span className="font-semibold">€{property.price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center group relative">
                  <div className="flex items-center">
                    <span>Tenant Protection fee</span>
                    <button className="ml-1">
                      <Info className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <span className="font-semibold">€{rentalCalculations.tenantProtectionFee.toFixed(2)}</span>

                  {/* Tooltip */}
                  <div className="absolute left-0 bottom-full mb-2 w-72 bg-white border border-gray-200 rounded-md p-3 shadow-lg hidden group-hover:block z-10">
                    <p className="text-sm text-gray-700">
                      Similar listings ask for a damage deposit of up to 2x the monthly rent. With this place, you'll
                      pay less upfront and stay in control of your money. It's a win-win!
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>HousingAnywhere Rent Guarantee</span>
                    <button className="ml-1">
                      <Info className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <span className="font-semibold">€{rentalCalculations.rentGuaranteeFee.toFixed(2)}</span>
                </div>

                {/* Deposit comparison for Deposit Saver properties */}
                {property.depositType === "Deposit Saver" && (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="line-through text-gray-500">Deposit</span>
                        <button className="ml-1">
                          <Info className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <span className="font-semibold line-through text-gray-500">
                        €{rentalCalculations.traditionalDeposit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <div className="flex items-center">
                        <span className="text-green-700">Deposit Saver</span>
                        <button className="ml-1">
                          <Info className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <span className="font-semibold text-green-700">
                        €{rentalCalculations.depositSaverFee.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {(property.depositType === "No Deposit" || property.depositType === "Deposit Saver") && (
                <div className="bg-green-50 p-4 rounded-md my-6 relative group">
                  <div className="flex items-center">
                    <div className="mr-3 text-green-600">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-6.823L7.775 12.13a.75.75 0 10-1.06 1.06l3.578 3.579a.75.75 0 001.06 0l6.294-6.293a.75.75 0 00-1.06-1.06l-5.764 5.764z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="text-green-800">
                      {property.depositType === "No Deposit"
                        ? "No deposit — Rent without a deposit."
                        : "Deposit Saver — Move in for less."}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 bottom-full mb-2 w-full max-w-md bg-white rounded-lg p-4 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    <p className="text-gray-700">
                      This small one-time fee protects the landlord and replaces a traditional deposit. So you pay less
                      upfront and stay in control of your money.
                    </p>
                  </div>
                </div>
              )}

              {/* Tenant protection message */}
              <div className="bg-blue-50 p-4 rounded-md mb-6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 text-blue-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-6.823L7.775 12.13a.75.75 0 10-1.06 1.06l3.578 3.579a.75.75 0 001.06 0l6.294-6.293a.75.75 0 00-1.06-1.06l-5.764 5.764z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-800">Covered by Tenant Protection.</span>
                  <a href="#" className="text-blue-600 underline ml-2">
                    Learn more
                  </a>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">Total:</div>
                  <div className="font-bold text-xl">€{rentalCalculations.initialPayment.toFixed(2)}</div>
                </div>
              </div>

              {/* Guarantor required */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Guarantor required</h3>
                <p className="text-gray-600 text-sm mb-2">
                  If you don't have a guarantor living in France, HousingAnywhere can help. Our Rent Guarantee costs
                  just 3% of your total rent.
                </p>
                <a href="#" className="text-blue-600 text-sm">
                  Learn more
                </a>
              </div>

              {/* Payment methods */}
              <div>
                <h3 className="font-semibold mb-3">Accepted payment methods</h3>
                <div className="flex flex-wrap gap-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="h-8 w-12 relative">
                      <Image
                        src={method.logo || "/placeholder.svg"}
                        alt={method.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment to Landlord */}
            <div className="p-6">
              <button
                className="flex items-center justify-between w-full mb-6"
                onClick={() => setIsLandlordPaymentsExpanded(!isLandlordPaymentsExpanded)}
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold">You</span>
                  <ChevronRight className="mx-3 text-gray-400" />
                  <div className="flex items-center">
                    <div className="h-8 w-8 relative rounded-full overflow-hidden mr-2">
                      <Image
                        src={property.landlord.image || "/placeholder.svg"}
                        alt={property.landlord.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-lg font-semibold">{property.landlord.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(Pay on agreed terms and timelines)</span>
                </div>
                <ChevronUp className={`transition-transform ${isLandlordPaymentsExpanded ? "" : "rotate-180"}`} />
              </button>

              {isLandlordPaymentsExpanded && (
                <div className="space-y-6">
                  {/* Cleaning fee */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Cleaning</span>
                      <span className="text-gray-500 ml-2">one time</span>
                    </div>
                    <span className="font-semibold">€50.00</span>
                  </div>

                  {/* Utilities */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span>Utilities</span>
                        <span className="text-gray-500 ml-2">paid separately</span>
                      </div>
                    </div>

                    <div className="space-y-3 pl-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span>Water</span>
                          <span className="text-gray-500 ml-2">monthly</span>
                        </div>
                        <span className="font-semibold">€{utilities.water.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span>Wifi</span>
                          <span className="text-gray-500 ml-2">monthly</span>
                        </div>
                        <span className="font-semibold">€{utilities.wifi.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span>Electricity</span>
                          <span className="text-gray-500 ml-2">monthly</span>
                        </div>
                        <span className="font-semibold">€{utilities.electricity.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span>Gas</span>
                          <span className="text-gray-500 ml-2">monthly</span>
                        </div>
                        <span className="font-semibold">€{utilities.gas.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rental payments */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span>Rental payments</span>
                        <span className="text-gray-500 ml-2">paid monthly</span>
                      </div>
                    </div>

                    <div className="space-y-3 pl-6">
                      {rentalCalculations.paymentSchedule.map((payment, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span>{formatDateRange(payment.startDate, payment.endDate)}</span>
                            <button className="ml-1">
                              <Info className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                          <span className="font-semibold">€{payment.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total rent for the period */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total rent for {rentalCalculations.totalMonths} months</span>
                      <span className="font-bold">
                        €
                        {rentalCalculations.paymentSchedule
                          .reduce((sum, payment) => sum + payment.amount, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
