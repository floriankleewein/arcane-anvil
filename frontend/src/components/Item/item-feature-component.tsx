import type { ItemState } from "@/Pages/ItemPage"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Plus, X } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

type ItemFeatureComponentProps = {
  item: ItemState
  onAddFeature: (feature: ItemFeature) => void
  onRemoveFeature: (index: number) => void
}

type ItemFeatureListProps = {
  features: ItemFeature[]
  onRemoveFeature: (index: number) => void
}

type ItemFeatureProps = {
  onAddFeature: (feature: ItemFeature) => void
}

export type ItemFeature = {
  name: string
  description: string
}

function ItemFeature({ onAddFeature }: ItemFeatureProps) {
  const [feature, setFeature] = useState<ItemFeature>({
    name: "",
    description: "",
  })

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1">
        <Label htmlFor="feature-name" className="pb-1">
          Name
        </Label>
        <Input
          id="feature-name"
          value={feature.name}
          onChange={(e) => setFeature({ ...feature, name: e.target.value })}
          className="custom-input"
        ></Input>
      </div>
      <div className="flex-1">
        <Label className="pb-1">Description</Label>
        <Textarea
          id="feature-description"
          value={feature.description}
          onChange={(e) =>
            setFeature({ ...feature, description: e.target.value })
          }
          className="custom-input"
        ></Textarea>
      </div>
      <div className="flex flex-col justify-center">
        <Button
          variant="outline"
          disabled={feature.name === "" || feature.description === ""}
          onClick={() => {
            onAddFeature(feature)
            setFeature({ name: "", description: "" })
          }}
          className="custom-button"
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}

function ItemFeatureList({ features, onRemoveFeature }: ItemFeatureListProps) {
  return (
    <div>
      {features.map((f, index) => (
        <div
          key={index}
          className="flex flex-row border-1 p-2 mb-4 rounded-2xl justify-between items-center custom-feature"
        >
          <div>
            <p>
              <span className="text-l font-semibold">{f.name}: </span>
              {f.description}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onRemoveFeature(index)}
            className="custom-button"
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default function ItemFeatureComponent({
  item,
  onAddFeature,
  onRemoveFeature,
}: ItemFeatureComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-md font-medium">Features</p>
      <ItemFeatureList
        features={item.features}
        onRemoveFeature={onRemoveFeature}
      ></ItemFeatureList>
      <ItemFeature onAddFeature={onAddFeature}></ItemFeature>
    </div>
  )
}
