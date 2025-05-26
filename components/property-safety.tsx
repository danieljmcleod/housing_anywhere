export function PropertySafety() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Safety</h2>

      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">We safeguard your money up to 48-hours after move-in</h3>
        <p className="mb-4">
          If you move-in and find that the property doesn't match its listing description, let us know within 48 hours
          and you could get a full refund.
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="h-2 w-2 bg-white rounded-full mx-auto mb-1"></div>
            <div className="text-xs">Day of confirmation</div>
          </div>

          <div className="flex-1 h-0.5 bg-white/30 mx-2 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-white rounded-full"></div>
          </div>

          <div className="text-center">
            <div className="h-2 w-2 bg-white rounded-full mx-auto mb-1"></div>
            <div className="text-xs">Day of move-in</div>
          </div>

          <div className="flex-1 h-0.5 bg-white/30 mx-2"></div>

          <div className="text-center">
            <div className="h-2 w-2 bg-white rounded-full mx-auto mb-1"></div>
            <div className="text-xs">48 hours after move-in</div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-white/20 rounded-full px-4 py-1 mb-3">
            <span className="text-sm">Your money is safe</span>
          </div>
        </div>

        <button className="text-sm text-white underline">Learn more</button>
      </div>
    </div>
  )
}
