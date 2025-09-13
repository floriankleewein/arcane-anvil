import type { ItemState } from "@/Pages/ItemPage"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Plus, X, Edit, Trash2, Save } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { ScrollArea } from "../ui/scroll-area"

type ItemFeatureComponentProps = {
  item: ItemState
  onAddFeature: (feature: ItemFeature) => void
  onEditFeature: (index: number, newFeature: ItemFeature) => void
  onRemoveFeature: (index: number) => void
}

type FeatureListProps = {
  features: ItemFeature[]
  onEditFeature: (index: number, newFeature: ItemFeature) => void
  onRemoveFeature: (index: number) => void
}

type FeatureListItemProps = {
  index: number
  feature: ItemFeature
  onEditFeature: (index: number, newFeature: ItemFeature) => void
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
    <div className="grid grid-cols-1 gap-2">
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
      <div className="1">
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

function FeatureListItem({
  index,
  feature,
  onEditFeature,
  onRemoveFeature,
  
}: FeatureListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<ItemFeature>(feature)

  return (
    <div className="flex flex-col md:flex-row gap-1 mb-4">
      <div
        key={index}
        className="border-1 p-2 rounded-2xl items-center custom-feature gap-2 flex-1"
      >
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <>
              <Input
                id="feature-name"
                value={draft.name}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, name: e.target.value }))
                }
                className="custom-input text-l font-semibold"
              ></Input>
              <Textarea
                id="feature-description"
                value={draft.description}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, description: e.target.value }))
                }
                className="custom-input"
              ></Textarea>
            </>
          ) : (
            <>
              <p className="text-l font-semibold">{feature.name} </p>
              <p className="break-words min-w-0">{feature.description}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={() => {
                onEditFeature(index, draft)
                setIsEditing(false)
              }}
              className="custom-button flex-1 md:flex-0"
            >
              <Save />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="custom-button flex-1 md:flex-0"
            >
              <X />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="custom-button flex-1 md:flex-0"
            >
              <Edit />
            </Button>
            <Button
              variant="outline"
              onClick={() => onRemoveFeature(index)}
              className="custom-button flex-1 md:flex-0"
            >
              <Trash2 />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

function FeatureList({
  features,
  onEditFeature,
  onRemoveFeature,
}: FeatureListProps) {
  return (
    features.length > 0 && <ScrollArea className="max-h-auto md:max-h-64 rounded-md custom-scroll-area">
      <div className="p-4">
        {features.map((f, index) => (
          <FeatureListItem
            key={index}
            feature={f}
            index={index}
            onEditFeature={onEditFeature}
            onRemoveFeature={onRemoveFeature}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

export default function ItemFeatureComponent({
  item,
  onAddFeature,
  onEditFeature,
  onRemoveFeature,
}: ItemFeatureComponentProps) {
  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <p className="text-md font-medium">Features</p>
      <FeatureList
        features={item.features}
        onEditFeature={onEditFeature}
        onRemoveFeature={onRemoveFeature}
      ></FeatureList>
      <ItemFeature onAddFeature={onAddFeature}></ItemFeature>
    </div>
  )
}
