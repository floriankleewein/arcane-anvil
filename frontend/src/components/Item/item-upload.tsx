import { Input } from "../ui/input"
import { Label } from "../ui/label"

type ItemUploadProps = {
  onItemUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function ItemUpload({ onItemUpload }: ItemUploadProps) {
  return (
    <div className="">
      <Label htmlFor="item-import" className="pb-2">Import Item</Label>
      <Input id="item-import" type="file" className="custom-file-upload" onChange={onItemUpload} />
    </div>
  )
}
