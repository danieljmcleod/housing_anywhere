"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage === 1}
          aria-label="Previous page"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, current page, and pages around current
          const shouldShow = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1

          if (!shouldShow && page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-gray-500">
                ...
              </span>
            )
          }

          if (!shouldShow && page === currentPage - 2) {
            return (
              <span key={page} className="px-2 text-gray-500">
                ...
              </span>
            )
          }

          if (!shouldShow) return null

          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className={`h-8 w-8 ${page === currentPage ? "bg-[#FF4B27] hover:bg-[#e63e1c]" : ""}`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage === totalPages}
          aria-label="Next page"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
