import { Swords } from "lucide-react"

export default function HeaderBar() {
  return (
    <div className=" bg-amber-900/60 p-6 shadow-2xl rounded-b-lg text-white ">
      <span className="inline-flex flex-row items-center bg-gray-600 rounded-xl p-2 shadow-2xl">
        <Swords />
        <span className="font-bold text-2xl">Arcane Anvil</span>
        <Swords />
      </span>
    </div>
  )
}
