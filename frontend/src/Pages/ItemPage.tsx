import ItemCard from "@/components/Item/item-card"
import ItemDownload from "@/components/Item/item-download"
import type { ItemFeature } from "@/components/Item/item-feature-component"
import ItemForm from "@/components/Item/item-form"
//import ItemUpload from "@/components/Item/item-upload"
import { readItemFromPng } from "@/components/Item/itemMetadata"
import { useRef, useState } from "react"

export type ItemState = {
  name: string
  type: string
  file: string | null
  dmg: string
  dmgtype: string
  features: ItemFeature[]
  description: string
}

export default function ItemPage() {
  const [item, setItem] = useState<ItemState>({
    name: "",
    type: "",
    file: null,
    dmg: "",
    dmgtype: "",
    features: [],
    description: "",
  })

  const cardRef = useRef<HTMLDivElement>(null)

  function handleChange(field: string, value: string) {
    setItem((prev) => ({ ...prev, [field]: value }))
  }

  function addFeature(feature: ItemFeature) {
    setItem((prev) => ({
      ...prev,
      features: [...prev.features, feature],
    }))
  }

  function removeFeature(index: number) {
    setItem((prev) => ({
      ...prev,
      features: item.features.filter((_, i) => i !== index),
    }))
  }

  async function uploadItem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const itemData = await readItemFromPng(file)
    if (!itemData) return

    setItem(itemData)
  }

  return (
    <div className="flex flex-row gap-2 items-center flex-1 justify-center">
      <div className="flex flex-col gap-2">
        {/* <ItemUpload onItemUpload={uploadItem}></ItemUpload> */}
        <ItemForm
          item={item}
          onChange={handleChange}
          onAddFeature={addFeature}
          onRemoveFeature={removeFeature}
          onItemUpload={uploadItem}
        />
      </div>

      <ItemCard cardRef={cardRef} item={item} />
      <ItemDownload cardRef={cardRef} item={item} ></ItemDownload>
    </div>
  )
}
