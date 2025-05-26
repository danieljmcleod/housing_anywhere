interface PropertyRulesProps {
  rules: {
    minimumAge: number
    tenantType: string
    couplesAllowed: boolean
    smokingAllowed: boolean
    petsAllowed: boolean
  }
}

export function PropertyRules({ rules }: PropertyRulesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Rules and preferences</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
          <div className="flex">
            <span className="text-gray-500 mr-2">•</span>
            <span className="text-gray-500">Minimum age:</span>
            <span className="ml-1">{rules.minimumAge}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 mr-2">•</span>
            <span className="text-gray-500">Tenant type:</span>
            <span className="ml-1">{rules.tenantType}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 mr-2">•</span>
            <span className="text-gray-500">Couples allowed:</span>
            <span className="ml-1">{rules.couplesAllowed ? "Yes" : "No"}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 mr-2">•</span>
            <span className="text-gray-500">Smoking allowed:</span>
            <span className="ml-1">{rules.smokingAllowed ? "Yes" : "No"}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 mr-2">•</span>
            <span className="text-gray-500">Pets allowed:</span>
            <span className="ml-1">{rules.petsAllowed ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
