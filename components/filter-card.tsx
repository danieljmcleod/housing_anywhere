"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface FilterCardProps {
  type: "no-deposit" | "deposit-saver"
  onClick: () => void
}

export function FilterCard({ type, onClick }: FilterCardProps) {
  const isNoDeposit = type === "no-deposit"

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg border border-gray-200 active:scale-[0.98]"
      onClick={(e) => {
        e.currentTarget.classList.add("scale-[0.98]")
        setTimeout(() => {
          onClick()
        }, 150)
      }}
    >
      <div
        className={`p-5 h-full flex flex-col ${
          isNoDeposit ? "bg-gradient-to-b from-[#FFE4DC] to-[#D9E5FF]" : "bg-gradient-to-b from-[#E2F5E9] to-[#D9E5FF]"
        }`}
      >
        <div className="mb-3">
          <div className="inline-flex items-center px-3 py-1.5 bg-white rounded-lg">
            <Image
              src={isNoDeposit ? "/no_deposit_icon.svg" : "/deposit_saver_icon.svg"}
              alt={isNoDeposit ? "No Deposit" : "Deposit Saver"}
              width={16}
              height={16}
              className="mr-2"
            />
            <span className="text-base font-medium text-[#002630]">{isNoDeposit ? "No Deposit" : "Deposit Saver"}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold text-[#002630]">
            {isNoDeposit ? "No deposit, no worries." : "Save on your deposit."}
          </h3>
          <p className="text-lg font-bold text-[#002630]">
            {isNoDeposit
              ? "Move in and out stress-free, and stay in control."
              : "More flexibility with lower upfront costs."}
          </p>
        </div>

        <div className="flex items-center text-[#002630] font-medium mb-3">
          <span>View listings with {isNoDeposit ? "no deposit" : "deposit saver"}</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>

        <div className="mt-auto flex justify-center">
          <Image
            src="/filter-card-money-illustration.png"
            alt="Money savings illustration"
            width={360}
            height={240}
            className="h-auto max-h-[240px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
