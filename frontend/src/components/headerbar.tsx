import { Swords } from "lucide-react"
import { useEffect, useState } from "react"

const breakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}

function getBreakpoint(width: number){
  if (width >= breakpoints["2xl"]) return "2xl"
  if (width >= breakpoints.xl) return "xl"
  if (width >= breakpoints.lg) return "lg"
  if (width >= breakpoints.md) return "md"
  if (width >= breakpoints.sm) return "sm"
  return "base"
}

export default function HeaderBar() {
  const[size, setSize] = useState(getBreakpoint(window.innerWidth))

  useEffect(()=>{
    const handleResize = () => setSize(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div className="custom-headerbar flex justify-center sm:justify-start p-6 rounded-b-2xl">
      <span className="inline-flex flex-row items-center p-2">
        <Swords className="text-amber-400"/>
        <span className="font-bold text-2xl text-stone-100">Arcane Anvil</span>
        <Swords className="text-amber-400"/>
      </span>
      {/* <span className="text-white">
      {size.toUpperCase()}
      </span>  */}
    </div>
  )
}
