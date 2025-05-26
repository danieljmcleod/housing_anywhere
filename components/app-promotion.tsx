import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AppPromotion() {
  return (
    <div className="py-12 bg-[#FF4B27] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Take HousingAnywhere with you</h2>
            <p className="text-lg mb-6">
              Download our app to search, book, and manage your accommodation on the go. Get instant notifications and
              stay connected with your landlord.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-[#FF4B27] hover:bg-gray-100">
                <Image src="/apple-logo-minimalist.png" alt="App Store" width={24} height={24} className="mr-2" />
                App Store
              </Button>
              <Button className="bg-white text-[#FF4B27] hover:bg-gray-100">
                <Image src="/google-play-logo.png" alt="Google Play" width={24} height={24} className="mr-2" />
                Google Play
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[400px]">
              <Image
                src="/mobile-app-mockup.png"
                alt="HousingAnywhere Mobile App"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
