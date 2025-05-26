import Image from "next/image"

interface HeaderLogoProps {
  className?: string
}

export function HeaderLogo({ className = "" }: HeaderLogoProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/header-title.svg"
        alt="FIND YOUR NEXT HOME"
        width={627}
        height={62}
        className="w-full max-w-[627px] h-auto"
        priority
      />
    </div>
  )
}
