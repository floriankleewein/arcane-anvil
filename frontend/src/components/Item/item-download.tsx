import { Download } from "lucide-react"
import { Button } from "../ui/button"

import * as htmlToImage from "html-to-image"
import parsePng from "png-chunks-extract"
import encodePng from "png-chunks-encode"
import textChunk from "png-chunk-text"
import type { ItemState } from "@/Pages/ItemPage"
/*TODO: move ref from item-card to item-page, forward it to item-card and let item-download download the ref element like that*/

type ItemDownloadProps = {
  cardRef: React.RefObject<HTMLDivElement | null>
  item: ItemState
}

export default function ItemDownload({cardRef, item}: ItemDownloadProps) {
  async function downloadItemCard() {
    if (!cardRef.current) return

    try {
      // 1. Render the card to a PNG data URL
      const dataUrl = await htmlToImage.toPng(cardRef.current)

      // 2. Convert dataUrl to Uint8Array
      const res = await fetch(dataUrl)
      const arrayBuffer = await res.arrayBuffer()
      const uint8 = new Uint8Array(arrayBuffer)

      // 3. Parse the PNG into chunks
      const chunks = parsePng(uint8)

      // 4. Create tEXt chunk with your metadata
      const metadata = JSON.stringify(item)
      const customChunk = textChunk.encode("ItemData", metadata)

      // 5. Insert the chunk just before the IEND chunk
      chunks.splice(-1, 0, customChunk)

      // 6. Re-encode PNG with the new chunk
      const output = encodePng(chunks)

      // 7. Trigger download
      const blob = new Blob([new Uint8Array(output)], { type: "image/png" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${item.name || "item"}.png`
      link.click()
    } catch (err) {
      console.error("Error generating PNG with metadata: ", err)
    }
  }
  return (
    <Button variant="outline" onClick={downloadItemCard}>
      <Download />
    </Button>
  )
}
