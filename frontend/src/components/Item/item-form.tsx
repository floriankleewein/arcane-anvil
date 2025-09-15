import type { ItemState } from "@/Pages/ItemPage"
import { ITEMTYPES, DAMAGETYPES, CONDITIONS } from "../../constants/dndConstants"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import ItemFeatureComponent, {
  type ItemFeature,
} from "./item-feature-component"
import ItemUpload from "./item-upload"
import { ToggleGroup } from "@radix-ui/react-toggle-group"
import { ToggleGroupItem } from "../ui/toggle-group"

type ItemFormProps = {
  item: ItemState
  onChange: (field: string, value: string | string[]) => void
  onAddFeature: (feature: ItemFeature) => void
  onEditFeature: (index: number, newFeature: ItemFeature) => void
  onRemoveFeature: (index: number) => void
  onItemUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function onFileUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (field: string, value: string) => void
) {
  const uploadedFile = e.target.files?.[0]

  if (uploadedFile) {
    if (uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => onChange("file", reader.result as string)
      reader.readAsDataURL(uploadedFile)
    }
  }
}

export default function ItemForm({
  item,
  onChange,
  onAddFeature,
  onEditFeature,
  onRemoveFeature,
  onItemUpload,
}: ItemFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:w-lg rounded-md px-6 py-6 bg-stone-200 border border-stone-500">
      <ItemUpload onItemUpload={onItemUpload} />
      <div className="col-span-1 sm:col-span-2">
        <Label htmlFor="name" className="pb-1">
          Name
        </Label>
        <Input
          id="name"
          value={item.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="custom-input"
        ></Input>
      </div>
      <div className="col-span-1">
        <Label htmlFor="type" className="pb-1">
          Type
        </Label>
        <ItemTypeSelect type={item.type} onChange={onChange} />
      </div>
      <div className="col-span-1">
        <Label htmlFor="file" className="pb-1">
          Image
        </Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          className="custom-file-upload"
          onChange={(e) => onFileUpload(e, onChange)}
        />
      </div>
      <div className="col-span-1">
        <Label htmlFor="dmg" className="pb-1">
          Damage
        </Label>
        <Input
          id="dmg"
          value={item.dmg}
          onChange={(e) => onChange("dmg", e.target.value)}
          className="custom-input"
        ></Input>
      </div>
      <div className="col-span-1">
        <Label htmlFor="dmgtype" className="pb-1">
          Damage Type
        </Label>
        <DamageTypeSelect dmgtype={item.dmgtype} onChange={onChange} />
      </div>
      <div className="border-t sm:col-span-2 border-stone-500" />
      <ItemFeatureComponent
        item={item}
        onAddFeature={onAddFeature}
        onEditFeature={onEditFeature}
        onRemoveFeature={onRemoveFeature}
      ></ItemFeatureComponent>
      <div className="border-t sm:col-span-2 border-stone-500" />
      <div className="sm:col-span-2">
        <ConditionToggleGroup
          conditionNames={item.conditionNames}
          onChange={onChange}
        ></ConditionToggleGroup>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="description" className="pb-1">
          Item Description / Flavour Text
        </Label>
        <Textarea
          placeholder=""
          id="description"
          value={item.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="custom-input md:max-h-18"
        />
      </div>
    </div>
  )
}

type ItemTypeSelectProps = {
  type: string
  onChange: (field: string, value: string) => void
}

function ItemTypeSelect({ type, onChange }: ItemTypeSelectProps) {
  return (
    <Select value={type} onValueChange={(value) => onChange("type", value)}>
      <SelectTrigger className="custom-select w-full">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {ITEMTYPES.map((i, index) => (
          <SelectItem key={index} value={i.value}>
            {i.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type DamageTypeSelectProps = {
  dmgtype: string
  onChange: (field: string, value: string) => void
}

function DamageTypeSelect({ dmgtype, onChange }: DamageTypeSelectProps) {
  return (
    <Select
      value={dmgtype}
      onValueChange={(value) => onChange("dmgtype", value)}
    >
      <SelectTrigger className="custom-select w-full">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {DAMAGETYPES.map((d, index) => (
          <SelectItem key={index} value={d.value}>
            {d.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type ConditionToggleGroupProps = {
  conditionNames: string[]
  onChange: (field: string, values: string[]) => void
}

function ConditionToggleGroup({
  conditionNames,
  onChange,
}: ConditionToggleGroupProps) {
  return (
    <>
      <Label htmlFor="conditions" className="pb-1">
        Condition Info
      </Label>
      <ToggleGroup
        type="multiple"
        id="conditions"
        value={conditionNames}
        className="custom-toggle-group p-2"
        onValueChange={(values) => onChange("conditionNames", values)}
      >
        {CONDITIONS.map((c, i) => (
          <ToggleGroupItem
            key={i}
            value={c.name}
            className="custom-toggle-group-item"
          >
            <p>
              <span className="font-semibold text-sm">{c.name}</span>
            </p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  )
}
