export interface IGood {
  url?: string,
  name: string,
  sizeType: string,
  size: string,
  barcode: number,
  maker: string,
  brend: string,
  description: string,
  price: number,
  caretype: string[],
  quantity?: number | string
}