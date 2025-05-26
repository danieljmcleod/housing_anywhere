import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialProps {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
}

function Testimonial({ quote, name, role, avatar, rating }: TestimonialProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <Image src={avatar || "/placeholder.svg"} alt={name} width={48} height={48} className="rounded-full mr-4" />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Finding my student accommodation was so easy with HousingAnywhere. The no deposit option really helped me save money for my studies.",
      name: "Emma Johnson",
      role: "International Student",
      avatar: "/diverse-group.png",
      rating: 5,
    },
    {
      quote:
        "As a professional relocating to a new city, I needed a reliable platform. HousingAnywhere made the process seamless and stress-free.",
      name: "David Chen",
      role: "Software Engineer",
      avatar: "/diverse-group.png",
      rating: 5,
    },
    {
      quote:
        "The verified listings gave me peace of mind when booking from abroad. I found the perfect apartment without any surprises.",
      name: "Sophie Martin",
      role: "Exchange Student",
      avatar: "/diverse-group.png",
      rating: 4,
    },
  ]

  return (
    <>
      <h2 className="text-2xl font-bold mb-8 text-center">What our users say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </>
  )
}
