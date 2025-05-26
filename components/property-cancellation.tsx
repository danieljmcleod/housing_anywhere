import { Calendar } from "lucide-react"

export function PropertyCancellation() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex mb-4">
          <div className="mr-4 text-gray-700">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Standard cancellation</h3>
          </div>
        </div>

        <p className="mb-4">If you cancel this booking</p>

        <div className="space-y-3 text-gray-700 mb-6">
          <div className="flex pl-4">
            <span className="text-gray-500 mr-2">•</span>
            <p>Within 24 hours of confirmation – Full refund of first month's rent</p>
          </div>

          <div className="flex pl-4">
            <span className="text-gray-500 mr-2">•</span>
            <p>After 24 hours of confirmation – No refund</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm">The HousingAnywhere service fee is non-refundable.</p>
      </div>
    </div>
  )
}
