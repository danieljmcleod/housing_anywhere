"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, X, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { searchCities, getPopularCities, type City } from "@/lib/city-data"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(new Date(2025, 4, 16)) // 16 May 2025
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>(new Date(2025, 5, 30)) // 30 Jun 2025
  const [suggestions, setSuggestions] = useState<City[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [showPopularCities, setShowPopularCities] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const debouncedLocation = useDebounce(location, 300)

  // Fetch suggestions when debounced input changes
  useEffect(() => {
    if (debouncedLocation.length >= 2) {
      setIsLoading(true)
      // Simulate API call with setTimeout
      const timer = setTimeout(() => {
        const results = searchCities(debouncedLocation)
        setSuggestions(results)
        setIsLoading(false)
        setShowSuggestions(true)
        setHighlightedIndex(-1)
      }, 100)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [debouncedLocation])

  // Handle clicks outside the suggestions box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setShowPopularCities(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Load popular cities when input is focused but empty
  useEffect(() => {
    if (showPopularCities && !location) {
      const popularCities = getPopularCities()
      setSuggestions(popularCities)
    }
  }, [showPopularCities, location])

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    setSelectedCity(null)
    setIsLoading(true)

    if (value.length < 2) {
      setIsLoading(false)
      if (value.length === 0) {
        setShowPopularCities(true)
      } else {
        setShowPopularCities(false)
        setShowSuggestions(false)
      }
    }
  }

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)
    setLocation(`${city.name}, ${city.country}`)
    setShowSuggestions(false)
    setShowPopularCities(false)
  }

  const clearLocation = () => {
    setLocation("")
    setSelectedCity(null)
    setSuggestions([])
    setShowSuggestions(false)
    setShowPopularCities(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions && !showPopularCities) return

    // Handle keyboard navigation
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleCitySelect(suggestions[highlightedIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        setShowSuggestions(false)
        setShowPopularCities(false)
        break
      default:
        break
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Format dates for URL
    const moveInFormatted = moveInDate ? format(moveInDate, "d-MMM-yyyy") : ""
    const moveOutFormatted = moveOutDate ? format(moveOutDate, "d-MMM-yyyy") : ""

    // Get city name from selection or input
    const cityName = selectedCity ? selectedCity.name : location.split(",")[0].trim()

    // Navigate to search results page with query parameters
    router.push(
      `/search?location=${encodeURIComponent(cityName)}&moveIn=${moveInFormatted}&moveOut=${moveOutFormatted}`,
    )
  }

  return (
    <div className="p-1 bg-white rounded-lg shadow-lg">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row rounded-lg overflow-hidden"
        role="search"
        aria-label="Find housing"
      >
        <div className="relative flex-grow bg-[#f5f5f5]">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={20} aria-hidden="true" />
          </div>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Where will you go?"
            className="w-full h-14 pl-10 pr-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-base bg-[#f5f5f5] text-gray-800 placeholder:text-gray-400"
            value={location}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (location.length >= 2) {
                setShowSuggestions(true)
              } else if (location.length === 0) {
                setShowPopularCities(true)
              }
            }}
            aria-label="Location"
            id="location-input"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="location-suggestions"
            aria-expanded={showSuggestions || showPopularCities}
            aria-activedescendant={highlightedIndex >= 0 ? `location-suggestion-${highlightedIndex}` : undefined}
          />
          {location && (
            <button
              type="button"
              onClick={clearLocation}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear location"
            >
              <X size={18} />
            </button>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span className="sr-only">Loading suggestions</span>
            </div>
          )}

          {/* City suggestions dropdown */}
          {(showSuggestions || showPopularCities) && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              id="location-suggestions"
              className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 overflow-hidden"
              role="listbox"
              aria-label={showPopularCities ? "Popular cities" : "City suggestions"}
            >
              {showPopularCities && !location && (
                <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
                  Popular destinations
                </div>
              )}
              <ul>
                {suggestions.map((city, index) => (
                  <li
                    key={city.id}
                    id={`location-suggestion-${index}`}
                    role="option"
                    aria-selected={highlightedIndex === index}
                    className={cn(
                      "px-4 py-3 hover:bg-gray-100 cursor-pointer",
                      highlightedIndex === index && "bg-gray-100",
                    )}
                    onClick={() => handleCitySelect(city)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-sm text-gray-500">
                          {city.country}
                          {city.region ? `, ${city.region}` : ""}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="h-14 w-px bg-white"></div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-14 border-0 rounded-none bg-[#f5f5f5] text-left font-normal justify-start px-4 text-base min-w-[180px] text-gray-800",
                !moveInDate && "text-gray-500",
              )}
              aria-label="Select move-in date"
              id="move-in-date"
            >
              {moveInDate ? format(moveInDate, "d MMM yyyy") : "Move-in date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={moveInDate}
              onSelect={setMoveInDate}
              initialFocus
              aria-label="Move-in date calendar"
            />
          </PopoverContent>
        </Popover>

        <div className="h-14 w-px bg-white"></div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-14 border-0 rounded-none bg-[#f5f5f5] text-left font-normal justify-start px-4 text-base min-w-[180px] text-gray-800",
                !moveOutDate && "text-gray-500",
              )}
              aria-label="Select move-out date"
              id="move-out-date"
            >
              {moveOutDate ? format(moveOutDate, "d MMM yyyy") : "Move-out date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={moveOutDate}
              onSelect={setMoveOutDate}
              initialFocus
              aria-label="Move-out date calendar"
            />
          </PopoverContent>
        </Popover>

        <div className="h-14 w-px bg-white"></div>

        <Button
          type="submit"
          className="h-14 px-8 rounded-none bg-[#FF4B27] hover:bg-[#e63e1c] text-white font-medium uppercase"
          aria-label="Search for housing"
        >
          SEARCH
        </Button>
      </form>
    </div>
  )
}
