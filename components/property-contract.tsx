"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { PaymentPanel } from "@/components/payment-panel"

interface PropertyContractProps {
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

export function PropertyContract({ property, moveInDate, moveOutDate }: PropertyContractProps) {
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false)

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Contract type</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex mb-4">
          <div className="mr-4 text-gray-700">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Fortnightly</h3>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          This listing has a Fortnightly contract type. In a month, if you stay for 14 days or less, you pay half that
          month's rent. If you stay for more than 14 days, you pay the full month's rent. Any excess rent you pay in the
          first month will be reduced from the rent of the next month.
        </p>

        <h3 className="font-medium mb-2">Payment details</h3>
        <p className="text-gray-700 mb-4">Look what you will pay to book the property, before and after your stay.</p>

        <button
          className="text-blue-600 hover:underline text-sm font-medium"
          onClick={() => setIsPaymentPanelOpen(true)}
        >
          View what you'll pay
        </button>

        <PaymentPanel
          isOpen={isPaymentPanelOpen}
          onClose={() => setIsPaymentPanelOpen(false)}
          property={property}
          moveInDate={moveInDate}
          moveOutDate={moveOutDate}
        />
      </div>
    </div>
  )
}
