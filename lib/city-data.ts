export interface City {
  id: string
  name: string
  country: string
  population?: number
  isPopular?: boolean
  region?: string
  aliases?: string[] // Alternative names or spellings
}

// More comprehensive city data
export const cities: City[] = [
  { id: "1", name: "Amsterdam", country: "Netherlands", population: 872680, isPopular: true, region: "North Holland" },
  {
    id: "2",
    name: "Barcelona",
    country: "Spain",
    population: 1620343,
    isPopular: true,
    region: "Catalonia",
    aliases: ["Barna", "BCN"],
  },
  { id: "3", name: "Berlin", country: "Germany", population: 3669491, isPopular: true },
  { id: "4", name: "Brussels", country: "Belgium", population: 1208542, isPopular: true },
  { id: "5", name: "Copenhagen", country: "Denmark", population: 794128, isPopular: true },
  { id: "6", name: "Dublin", country: "Ireland", population: 554554, isPopular: true },
  { id: "7", name: "Florence", country: "Italy", population: 382258, isPopular: true, region: "Tuscany" },
  { id: "8", name: "Lisbon", country: "Portugal", population: 505526, isPopular: true },
  { id: "9", name: "London", country: "United Kingdom", population: 8982000, isPopular: true },
  { id: "10", name: "Madrid", country: "Spain", population: 3223334, isPopular: true },
  { id: "11", name: "Milan", country: "Italy", population: 1396059, isPopular: true, region: "Lombardy" },
  { id: "12", name: "Munich", country: "Germany", population: 1471508, isPopular: true, region: "Bavaria" },
  { id: "13", name: "Paris", country: "France", population: 2161000, isPopular: true, region: "Île-de-France" },
  { id: "14", name: "Prague", country: "Czech Republic", population: 1309000, isPopular: true },
  { id: "15", name: "Rome", country: "Italy", population: 2873000, isPopular: true, region: "Lazio" },
  { id: "16", name: "Rotterdam", country: "Netherlands", population: 651446, isPopular: true, region: "South Holland" },
  { id: "17", name: "Stockholm", country: "Sweden", population: 975551, isPopular: true },
  { id: "18", name: "Valencia", country: "Spain", population: 791413, isPopular: true },
  { id: "19", name: "Vienna", country: "Austria", population: 1897491, isPopular: true },
  { id: "20", name: "Warsaw", country: "Poland", population: 1765000, isPopular: true },
  { id: "21", name: "Zurich", country: "Switzerland", population: 402762, isPopular: true },
  { id: "22", name: "Barcelos", country: "Portugal", population: 120391, region: "Braga" },
  { id: "23", name: "Barcelonnette", country: "France", population: 2851, region: "Provence-Alpes-Côte d'Azur" },
  { id: "24", name: "Bárcena Mayor", country: "Spain", population: 434, region: "Cantabria" },
  { id: "25", name: "Barcellona Pozzo di Gotto", country: "Italy", population: 41583, region: "Sicily" },
  // Additional cities
  { id: "26", name: "Utrecht", country: "Netherlands", population: 357597, region: "Utrecht" },
  {
    id: "27",
    name: "The Hague",
    country: "Netherlands",
    population: 545838,
    region: "South Holland",
    aliases: ["Den Haag"],
  },
  { id: "28", name: "Eindhoven", country: "Netherlands", population: 234394, region: "North Brabant" },
  { id: "29", name: "Groningen", country: "Netherlands", population: 233218, region: "Groningen" },
  { id: "30", name: "Maastricht", country: "Netherlands", population: 121565, region: "Limburg" },
  // More Spanish cities
  { id: "31", name: "Seville", country: "Spain", population: 688711, region: "Andalusia", aliases: ["Sevilla"] },
  { id: "32", name: "Granada", country: "Spain", population: 232462, region: "Andalusia" },
  { id: "33", name: "Malaga", country: "Spain", population: 574654, region: "Andalusia", aliases: ["Málaga"] },
  { id: "34", name: "Bilbao", country: "Spain", population: 345821, region: "Basque Country" },
  { id: "35", name: "Alicante", country: "Spain", population: 334887, region: "Valencia" },
]

/**
 * Search cities based on a query string
 * Uses a scoring system to rank results by relevance
 */
export function searchCities(query: string): City[] {
  if (!query || query.length < 2) return []

  const lowerCaseQuery = query.toLowerCase().trim()

  // Score and filter cities
  const scoredCities = cities
    .map((city) => {
      const cityName = city.name.toLowerCase()
      const countryName = city.country.toLowerCase()
      const regionName = city.region?.toLowerCase() || ""
      const aliases = city.aliases?.map((a) => a.toLowerCase()) || []

      let score = 0

      // Exact match gets highest score
      if (cityName === lowerCaseQuery) {
        score += 100
      }
      // Starts with query gets high score
      else if (cityName.startsWith(lowerCaseQuery)) {
        score += 75
      }
      // Contains query gets medium score
      else if (cityName.includes(lowerCaseQuery)) {
        score += 50
      }
      // Country match gets lower score
      else if (countryName.includes(lowerCaseQuery)) {
        score += 25
      }
      // Region match gets lower score
      else if (regionName.includes(lowerCaseQuery)) {
        score += 20
      }
      // Alias match
      else if (aliases.some((alias) => alias.includes(lowerCaseQuery))) {
        score += 40
      }

      // Boost popular cities
      if (city.isPopular && score > 0) {
        score += 10
      }

      return { city, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.city)
    .slice(0, 5) // Limit to 5 results

  return scoredCities
}

// Get popular cities for initial suggestions
export function getPopularCities(): City[] {
  return cities
    .filter((city) => city.isPopular)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 5)
}
