import type { ItemState } from "@/Pages/ItemPage"

import parsePng from "png-chunks-extract"
import textChunk from "png-chunk-text"


export async function fileToUint8Array(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer)
                resolve(new Uint8Array(reader.result))
            else reject("Failed to read file")
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsArrayBuffer(file)
    })
}

export async function readItemFromPng(file: File): Promise<ItemState | null> {
    const uint8 = await fileToUint8Array(file)
    const chunks = parsePng(uint8) as { name: string; data: Uint8Array }[]

    const itemChunk = chunks.find(
        (c) => c.name === "tEXt" && textChunk.decode(c).keyword === "ItemData"
    )
    if (!itemChunk) return null

    const decoded = textChunk.decode(itemChunk)
    return JSON.parse(decoded.text)
}