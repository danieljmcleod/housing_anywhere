"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, Calendar, Plus } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { searchCities, type City } from "@/lib/city-data"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  initialLocation?: string
  initialMoveIn?: Date
  initialMoveOut?: Date
}

export function SearchModal({ isOpen, onClose, initialLocation, initialMoveIn, initialMoveOut }: SearchModalProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for search parameters
  const [location, setLocation] = useState(initialLocation || "")
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(initialMoveIn || new Date(2025, 4, 23)) // 23 May 2025
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>(initialMoveOut || new Date(2025, 5, 16)) // 16 Jun 2025
  const [suggestions, setSuggestions] = useState<City[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isExactDates, setIsExactDates] = useState(true)
  const [flexibilityWeeks, setFlexibilityWeeks] = useState(1)

  // Calculate duration between dates
  const duration = moveInDate && moveOutDate ? differenceInDays(moveOutDate, moveInDate) : 0

  // Generate months for the calendar
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const months = [
    { name: "May 2025", month: 4, year: 2025 },
    { name: "June 2025", month: 5, year: 2025 },
    { name: "July 2025", month: 6, year: 2025 },
    { name: "August 2025", month: 7, year: 2025 },
    { name: "September 2025", month: 8, year: 2025 },
    { name: "October 2025", month: 9, year: 2025 },
  ]

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)

    if (value.length >= 2) {
      const results = searchCities(value)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Handle city selection from suggestions
  const handleCitySelect = (city: City) => {
    setLocation(`${city.name}, ${city.country}`)
    setShowSuggestions(false)
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (!moveInDate || (moveInDate && moveOutDate)) {
      // Start new selection
      setMoveInDate(date)
      setMoveOutDate(undefined)
    } else {
      // Complete selection
      if (date < moveInDate) {
        setMoveOutDate(moveInDate)
        setMoveInDate(date)
      } else {
        setMoveOutDate(date)
      }
    }
  }

  // Check if a date is the move-in date
  const isMoveInDate = (date: Date) => {
    return (
      moveInDate &&
      date.getDate() === moveInDate.getDate() &&
      date.getMonth() === moveInDate.getMonth() &&
      date.getFullYear() === moveInDate.getFullYear()
    )
  }

  // Check if a date is the move-out date
  const isMoveOutDate = (date: Date) => {
    return (
      moveOutDate &&
      date.getDate() === moveOutDate.getDate() &&
      date.getMonth() === moveOutDate.getMonth() &&
      date.getFullYear() === moveOutDate.getFullYear()
    )
  }

  // Check if a date is in the selected range
  const isInRange = (date: Date) => {
    return moveInDate && moveOutDate && date > moveInDate && date < moveOutDate
  }

  // Handle search submission
  const handleSearch = () => {
    // Format dates for URL
    const moveInFormatted = moveInDate ? format(moveInDate, "d-MMM-yyyy") : ""
    const moveOutFormatted = moveOutDate ? format(moveOutDate, "d-MMM-yyyy") : ""

    // Get city name from location
    const cityName = location.split(",")[0].trim()

    // Navigate to search results page with query parameters
    router.push(
      `/search?location=${encodeURIComponent(cityName)}&moveIn=${moveInFormatted}&moveOut=${moveOutFormatted}`,
    )

    onClose()
  }

  // Generate calendar days for a month
  const generateDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay() // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    // Add empty cells for days before the first day of the month
    // Adjust for Monday as first day of week (0 = Sunday, so Sunday should be positioned last)
    const emptyDays = firstDay === 0 ? 6 : firstDay - 1
    for (let i = 0; i < emptyDays; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Clear dates
  const clearDates = () => {
    setMoveInDate(undefined)
    setMoveOutDate(undefined)
  }

  // Set flexibility
  const setFlexibility = (weeks: number) => {
    setFlexibilityWeeks(weeks)
    setIsExactDates(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} className="bg-black/50">
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 bg-white max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4">
            <h2 className="text-2xl font-bold">Where&apos;s life taking you?</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="city-input" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <Input
                  id="city-input"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full p-3 text-base"
                  placeholder="Enter a city"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                    <ul>
                      {suggestions.map((city) => (
                        <li
                          key={city.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city.name}, {city.country}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="dates-input" className="block text-sm font-medium text-gray-700 mb-1">
                Dates
              </label>
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md p-3">
                  <span className="flex-grow">
                    {moveInDate && moveOutDate
                      ? `${format(moveInDate, "d MMM yyyy")} - ${format(moveOutDate, "d MMM yyyy")} ${
                          !isExactDates ? `(± ${flexibilityWeeks} week${flexibilityWeeks > 1 ? "s" : ""})` : ""
                        }`
                      : "Select dates"}
                  </span>
                  {moveInDate && moveOutDate && (
                    <Button variant="ghost" size="icon" onClick={clearDates} className="h-6 w-6 ml-2">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Button
              variant={isExactDates ? "default" : "outline"}
              size="sm"
              onClick={() => setIsExactDates(true)}
              className={isExactDates ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Exact dates
            </Button>

            <div className="flex gap-2">
              <Button
                variant={!isExactDates && flexibilityWeeks === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setFlexibility(1)}
                className={!isExactDates && flexibilityWeeks === 1 ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""}
              >
                <Plus className="h-4 w-4 mr-1" />1 week
              </Button>

              <Button
                variant={!isExactDates && flexibilityWeeks === 2 ? "default" : "outline"}
                size="sm"
                onClick={() => setFlexibility(2)}
                className={!isExactDates && flexibilityWeeks === 2 ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""}
              >
                <Plus className="h-4 w-4 mr-1" />2 weeks
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {months.map((monthData) => (
              <div key={monthData.name}>
                <h3 className="text-center font-medium mb-4">{monthData.name}</h3>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <div key={day} className="text-xs text-gray-500 py-1">
                      {day}
                    </div>
                  ))}

                  {generateDays(monthData.month, monthData.year).map((day, index) => (
                    <div key={index} className="relative">
                      {day ? (
                        <button
                          type="button"
                          onClick={() => handleDateSelect(day)}
                          className={cn(
                            "w-full h-8 rounded-full text-sm flex items-center justify-center",
                            isMoveInDate(day) && "bg-[#002630] text-white",
                            isMoveOutDate(day) && "bg-[#002630] text-white",
                            isInRange(day) && "bg-[#e2e9ee]",
                            !isMoveInDate(day) && !isMoveOutDate(day) && !isInRange(day) && "hover:bg-gray-100",
                          )}
                        >
                          {day.getDate()}
                        </button>
                      ) : (
                        <div className="w-full h-8"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t mt-auto bg-white">
          <div className="flex justify-end">
            <Button onClick={handleSearch} className="bg-[#FF4B27] hover:bg-[#e63e1c] text-white px-6">
              Show {Math.floor(Math.random() * 500) + 500}+ places
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
