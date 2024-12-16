import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from 'lucide-react'

interface Product {
  name: string
  quantity: number
  price: number
}

interface ProductListProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export default function ProductList({ products, setProducts }: ProductListProps) {
  const addProduct = () => {
    setProducts([...products, { name: '', quantity: 0, price: 0 }])
  }

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const updateProduct = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products]
    updatedProducts[index] = { ...updatedProducts[index], [field]: value }
    setProducts(updatedProducts)
  }

  return (
    <div className="space-y-4">
      <Label>Products</Label>
      {products.map((product, index) => (
        <div key={index} className="flex space-x-2">
          <Input 
            placeholder="Product name" 
            value={product.name} 
            onChange={(e) => updateProduct(index, 'name', e.target.value)} 
          />
          <Input 
            type="number" 
            placeholder="Quantity" 
            value={product.quantity} 
            onChange={(e) => updateProduct(index, 'quantity', Number(e.target.value))} 
          />
          <Input 
            type="number" 
            placeholder="Price" 
            value={product.price} 
            onChange={(e) => updateProduct(index, 'price', Number(e.target.value))} 
          />
          <Button variant="destructive" onClick={() => removeProduct(index)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={addProduct} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Product
      </Button>
    </div>
  )
}

