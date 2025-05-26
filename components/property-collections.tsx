import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CollectionProps {
  title: string
  description: string
  image: string
  link: string
}

function Collection({ title, description, image, link }: CollectionProps) {
  return (
    <Link
      href={link}
      className="group relative flex-shrink-0 overflow-hidden rounded-xl w-full h-[240px] shadow-md transition-transform hover:scale-[1.02]"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <div>
          <p className="mb-2">{description}</p>
          <div className="flex items-center font-medium">
            Explore <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function PropertyCollections() {
  const collections = [
    {
      title: "Deposit Saver Options",
      description: "Pay less upfront with our deposit saver program",
      image: "/filter-card-illustration.png",
      link: "/search?depositType=deposit-saver",
    },
    {
      title: "Luxury Apartments",
      description: "Premium living spaces with high-end amenities",
      image: "/property-images/apartment-9.jpeg",
      link: "/search?type=luxury",
    },
  ]

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Collection key={collection.title} {...collection} />
        ))}
      </div>
    </div>
  )
}
