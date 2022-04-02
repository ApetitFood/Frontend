export type Recipe = {
  id: string
  ownerId: string
  title: string
  directions: string
  ingredients: RecipeIngredient[]
  description?: string[]
  photo?: string
}

export type RecipeIngredient = {
  product: string
  measurement: string
  amount: number
}

export enum MeasurementsEnum {
  G = 'g',
  MG = 'mg',
  KG = 'kg',
  OZ = 'oz',
  ML = 'ml',
  L = 'l',
}
