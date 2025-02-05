// ---------- GENERIC TYPE ----------
export interface CategoryByType {
  code: string
  message: string
  data: CategoryByTypeData[]
}

export interface ItemDetail {
  code: string
  message: string
  data: ItemDetailData
}

export interface SearchItem {
  code: string
  message: string
  data: EntertainmentList[]
}

// ---------- DATA ----------
export interface CategoryByTypeData {
  idCategory: string
  titleCategory: TitleCategory
}

export interface ItemDetailData {
  idCategory: string
  titleCategory: TitleCategory
  total: number
  list: EntertainmentList[]
}

export interface EntertainmentList {
  idCategory: string
  idMovie: string
  titleMovie: string
  type: MediaType
  image: string
  sound: SoundType
  resolution: ResolutionType
  year: string
  view: string
  score: string
  createdDate: CreatedDate
  updatedDate: CreatedDate
}

export interface TitleCategory {
  EN: string
  TH: string
}

export enum CreatedDate {
  System = 'SYSTEM',
}

export enum ResolutionType {
  FullHD = 'FullHD',
  HD = 'HD',
  Zoom = 'Zoom',
}

export enum SoundType {
  Soundtrack = 'Soundtrack',
  Thai = 'Thai',
}

export enum MediaType {
  Movie = 'movie',
  Av = 'av',
  Series = 'series',
}

// ---------- REQUEST ----------
export interface RequestCategoryByType {
  type: number
}

export interface RequestItemListByCategory {
  type: number
  idCategory: string
  size: number
  page: number
}

export interface RequestItemDetail {
  type: number
  idMovie: string
  size: number
  page: number
}

export interface RequestSearchItem {
  type: number
  keyword: string
  size: number
  page: number
}

export interface RequestCategoryAndItem {
  size: number
  type: number
}
