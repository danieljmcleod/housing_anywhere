import { NextResponse } from "next/server"
import { searchCities, getPopularCities } from "@/lib/city-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  // Return popular cities if no query
  if (!query) {
    return NextResponse.json({ cities: getPopularCities() })
  }

  // Return search results for query
  if (query.length >= 2) {
    const results = searchCities(query)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json({ cities: results })
  }

  return NextResponse.json({ cities: [] })
}
