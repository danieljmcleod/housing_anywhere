"use client"

import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  view: string
  setView: (view: string) => void
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={`text-sm ${view === "list" ? "bg-gray-100" : ""}`}
        onClick={() => setView("list")}
      >
        Recommended
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`text-sm ${view === "map" ? "bg-gray-100" : ""}`}
        onClick={() => setView("map")}
      >
        Map
      </Button>
    </div>
  )
}
