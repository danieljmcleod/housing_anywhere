"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  isNew?: boolean
}

function CategoryItem({ icon, label, active, onClick, isNew }: CategoryProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-4 py-2 text-sm font-medium transition-colors group",
        active
          ? "text-[#FF4B27] border-b-2 border-[#FF4B27]"
          : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent",
      )}
    >
      <div className="relative w-20 h-20 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-1">
        {icon}
        {isNew && (
          <span className="absolute -top-1 -right-1 bg-[#FF4B27] text-white text-[10px] px-1 rounded-full">NEW</span>
        )}
      </div>
      <span className="transition-all duration-300 ease-in-out group-hover:font-medium">{label}</span>
    </button>
  )
}

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="flex items-center justify-center overflow-x-auto py-6 no-scrollbar">
      <div className="flex space-x-2">
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/all-SZboPBpOpckD8OrNGNY8eR41zYi3xr.png"
                alt="All"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="All"
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Student%20Housing-YRTHGy6GaGzwjtu3K9eqmHuNX6CbbC.png"
                alt="Student Housing"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="Student Housing"
          active={activeCategory === "student"}
          onClick={() => setActiveCategory("student")}
          isNew={true}
        />
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apartments-BvFzZc38HbArEDxXTE2Ph5fwVcy16D.png"
                alt="Apartments"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="Apartments"
          active={activeCategory === "apartments"}
          onClick={() => setActiveCategory("apartments")}
        />
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shared%20Rooms-OnVJByNgrOu5zA2wLJVUXEDZ5PF7Kc.png"
                alt="Shared Rooms"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="Shared Rooms"
          active={activeCategory === "shared"}
          onClick={() => setActiveCategory("shared")}
        />
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/For%20Professionals-GZqwyUhYNy43iMaJBbmFSnIifXaCaJ.png"
                alt="For Professionals"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="For Professionals"
          active={activeCategory === "professionals"}
          onClick={() => setActiveCategory("professionals")}
        />
        <CategoryItem
          icon={
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Near%20Universities-k9JRnktgxfJEaTiHwneVyH5uj7FFCI.png"
                alt="Near Universities"
                className="w-16 h-16 object-contain transition-transform duration-300"
              />
            </div>
          }
          label="Near Universities"
          active={activeCategory === "universities"}
          onClick={() => setActiveCategory("universities")}
        />
      </div>
    </div>
  )
}
