import { Swords } from "lucide-react"

export default function HeaderBar() {
  return (
    <div className="custom-headerbar p-6 shadow-2xl shadow-emerald-950/80 rounded-b-4xl">
      <span className="inline-flex flex-row items-center p-2">
        <Swords className="text-amber-400"/>
        <span className="font-bold text-2xl text-stone-100">Arcane Anvil</span>
        <Swords className="text-amber-400"/>
      </span>
    </div>
  )
}
