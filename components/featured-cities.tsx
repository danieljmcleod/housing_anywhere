import Image from "next/image"
import Link from "next/link"

interface FeaturedCityProps {
  name: string
  country: string
  image: string
  listingCount: number
}

function FeaturedCity({ name, country, image, listingCount }: FeaturedCityProps) {
  return (
    <Link
      href={`/search?location=${encodeURIComponent(name)}`}
      className="group relative flex-shrink-0 overflow-hidden rounded-xl w-[280px] h-[320px] shadow-md transition-transform hover:scale-[1.02]"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={`${name}, ${country}`}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-white/90">{country}</p>
        <p className="mt-1 text-sm font-medium">{listingCount}+ properties</p>
      </div>
    </Link>
  )
}

export function FeaturedCities() {
  const cities = [
    {
      name: "Amsterdam",
      country: "Netherlands",
      image: "/city-images/amsterdam.jpeg",
      listingCount: 1240,
    },
    {
      name: "Barcelona",
      country: "Spain",
      image: "/city-images/barcelona.jpeg",
      listingCount: 980,
    },
    {
      name: "Berlin",
      country: "Germany",
      image: "/city-images/berlin.jpeg",
      listingCount: 1450,
    },
    {
      name: "London",
      country: "United Kingdom",
      image: "/city-images/london.jpeg",
      listingCount: 2100,
    },
    {
      name: "Paris",
      country: "France",
      image: "/city-images/paris.jpeg",
      listingCount: 1680,
    },
  ]

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Popular cities</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {cities.map((city) => (
          <FeaturedCity key={city.name} {...city} />
        ))}
      </div>
    </div>
  )
}
