export interface Product {
  id: number
  name: string
  price: number
  comparePrice?: number
  image: string
  category: string
  description?: string
  featured?: boolean
  isNew?: boolean
  createdAt?: string
  selectedSize?: string
  quantity?: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Review {
  id: number
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

