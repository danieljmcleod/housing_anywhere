import { FileText, GraduationCap, DollarSign } from "lucide-react"

export function PropertyDocuments() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Required documents</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600 mb-4">Below mentioned documents are required to request booking:</p>

        <div className="space-y-6">
          <div className="flex border-b pb-4">
            <div className="mr-4 text-gray-700">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Proof of Identity</h3>
              <p className="text-sm text-gray-600">Government issued ID, passport, driver's license.</p>
            </div>
          </div>

          <div className="flex border-b pb-4">
            <div className="mr-4 text-gray-700">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Proof of enrollment or occupation</h3>
              <p className="text-sm text-gray-600">
                University enrollment certificate, internship or employment contract.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-gray-700">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Proof of income</h3>
              <p className="text-sm text-gray-600">Salary slip or bank statements from you or your sponsor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
