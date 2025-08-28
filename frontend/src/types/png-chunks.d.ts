declare module "png-chunks-extract" {
  const parsePng: (data: Uint8Array) => unknown[]
  export default parsePng
}

declare module "png-chunks-encode" {
  const encodePng: (chunks: unknown[]) => Uint8Array
  export default encodePng
}

declare module "png-chunk-text" {
  export function encode(keyword: string, text: string): unknown
  export function decode(chunk: unknown): { keyword: string; text: string }
}
