import { Input } from "../ui/input"
import { Label } from "../ui/label"

type ItemUploadProps = {
  onItemUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ItemUpload({ onItemUpload }: ItemUploadProps) {
  return (
    <div>
      <Label htmlFor="item-import" className="pb-2">Import Item</Label>
      <Input id="item-import" type="file" onChange={onItemUpload} />
    </div>
  )
}
