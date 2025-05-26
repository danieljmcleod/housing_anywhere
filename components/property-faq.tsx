import { ChevronDown } from "lucide-react"

export function PropertyFAQ() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">How to book this property</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <button className="flex justify-between items-center w-full text-left">
              <h3 className="font-medium">I like this property, how do I book it?</h3>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="border-b pb-4">
            <button className="flex justify-between items-center w-full text-left">
              <h3 className="font-medium">Can I view this property?</h3>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="border-b pb-4">
            <button className="flex justify-between items-center w-full text-left">
              <h3 className="font-medium">What happens after the booking?</h3>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
