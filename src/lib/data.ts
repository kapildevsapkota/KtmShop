import type { Product } from "./types"

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Pashmina Shawl",
    price: 45,
    comparePrice: 60,
    image: "/image.png",
    category: "Clothing",
    description: "Luxurious handcrafted pashmina shawl made from the finest wool.",
    featured: true,
    isNew: true,
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    name: "Nepalese Tea Collection",
    price: 18,
    image: "/imagec.png",
    category: "Food",
    description: "A collection of premium Nepalese teas from the Himalayan region.",
    featured: false,
    createdAt: "2023-04-10",
  },
  {
    id: 3,
    name: "Traditional Singing Bowl",
    price: 35,
    comparePrice: 45,
    image: "/image2.png",
    category: "Handicrafts",
    description: "Authentic Tibetan singing bowl handcrafted by skilled artisans.",
    featured: true,
    createdAt: "2023-06-20",
  },
  {
    id: 4,
    name: "Himalayan Rock Salt Lamp",
    price: 28,
    image: "/image3.png",
    category: "Home Decor",
    description: "Natural Himalayan rock salt lamp that purifies air and creates a soothing ambiance.",
    featured: false,
    createdAt: "2023-03-05",
  },
  {
    id: 5,
    name: "Handmade Lokta Paper Journal",
    price: 12,
    image: "/image4.png",
    category: "Stationery",
    description: "Eco-friendly journal made from traditional Nepalese Lokta paper.",
    featured: false,
    isNew: true,
    createdAt: "2023-07-01",
  },
  {
    id: 6,
    name: "Thangka Painting",
    price: 120,
    comparePrice: 150,
    image: "/image5.png",
    category: "Art",
    description: "Traditional Tibetan Buddhist painting depicting deities and mandalas.",
    featured: true,
    createdAt: "2023-02-15",
  },
  {
    id: 7,
    name: "Nepali Spice Set",
    price: 22,
    image: "/image6.png",
    category: "Food",
    description: "Collection of authentic Nepali spices for traditional cooking.",
    featured: false,
    createdAt: "2023-05-25",
  },
  {
    id: 8,
    name: "Handwoven Dhaka Topi",
    price: 15,
    image: "/image7.png",
    category: "Clothing",
    description: "Traditional Nepali cap handwoven with intricate patterns.",
    featured: false,
    createdAt: "2023-04-18",
  },
  {
    id: 9,
    name: "Tibetan Prayer Flags",
    price: 14,
    image: "/image8.png",
    category: "Handicrafts",
    description: "Colorful prayer flags with Buddhist mantras for peace and prosperity.",
    featured: false,
    createdAt: "2023-06-10",
  },
  {
    id: 10,
    name: "Handcrafted Silver Jewelry",
    price: 65,
    comparePrice: 85,
    image: "/image9.png",
    category: "Jewelry",
    description: "Exquisite silver jewelry handcrafted by Nepalese artisans.",
    featured: true,
    isNew: true,
    createdAt: "2023-07-05",
  },
  {
    id: 11,
    name: "Nepalese Wool Carpet",
    price: 180,
    comparePrice: 220,
    image: "/image10.png",
    category: "Home Decor",
    description: "Hand-knotted wool carpet with traditional Nepalese patterns.",
    featured: true,
    createdAt: "2023-03-20",
  },
  {
    id: 12,
    name: "Handmade Felt Products",
    price: 25,
    image: "/image11.png",
    category: "Handicrafts",
    description: "Colorful felt products including coasters, ornaments, and toys.",
    featured: false,
    createdAt: "2023-05-30",
  },
]

// Get all products
export const getAllProducts = (): Product[] => {
  return products
}

// Get product by ID
export const getProductById = (id: number): Product | null => {
  return products.find((product) => product.id === id) || null
}

// Get products by IDs
export const getProductsByIds = (ids: number[]): Product[] => {
  return products.filter((product) => ids.includes(product.id))
}

// Get related products
export const getRelatedProducts = (category: string, currentProductId: number): Product[] => {
  return products.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 6)
}

// Get all categories
export const getAllCategories = (): string[] => {
  return Array.from(new Set(products.map((product) => product.category)))
}

