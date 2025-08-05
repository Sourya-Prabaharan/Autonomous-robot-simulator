"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, X, LogOut, Settings, Star, Clock, Flame } from "lucide-react"

interface MenuItem {
  id?: number
  item_id: string
  name: string
  description?: string
  price: number
  category: string
  subcategory?: string
  is_available: boolean
  is_featured: boolean
  spice_level: "none" | "mild" | "medium" | "hot" | "very_hot"
  dietary_info?: string[]
  image_url?: string
  prep_time?: number
  calories?: number
  sort_order: number
}

interface MenuCategory {
  id?: number
  name: string
  description?: string
  is_active: boolean
  sort_order: number
}

export default function CMSDashboard() {
  const [user, setUser] = useState<any>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify")
      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        await Promise.all([fetchMenuItems(), fetchCategories()])
      } else {
        router.push("/cms/login")
      }
    } catch (err) {
      router.push("/cms/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/cms/menu-items")
      const data = await response.json()
      if (data.success) {
        setMenuItems(data.data)
      }
    } catch (err) {
      console.error("Error fetching menu items:", err)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/cms/categories")
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/cms/login")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const handleSaveItem = async (item: MenuItem) => {
    try {
      const url = item.id ? `/api/cms/menu-items/${item.id}` : "/api/cms/menu-items"
      const method = item.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(item.id ? "Item updated successfully!" : "Item created successfully!")
        setEditingItem(null)
        setShowAddForm(false)
        await fetchMenuItems()
      } else {
        setError(data.error || "Failed to save item")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/cms/menu-items/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Item deleted successfully!")
        await fetchMenuItems()
      } else {
        setError(data.error || "Failed to delete item")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    }
  }

  const ItemForm = ({
    item,
    onSave,
    onCancel,
  }: {
    item: MenuItem
    onSave: (item: MenuItem) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<MenuItem>(item)

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{item.id ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Item Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter item name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Spice Level</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.spice_level}
                onChange={(e) => setFormData({ ...formData, spice_level: e.target.value as any })}
              >
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
                <option value="very_hot">Very Hot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Prep Time (minutes)</label>
              <Input
                type="number"
                value={formData.prep_time || ""}
                onChange={(e) => setFormData({ ...formData, prep_time: Number.parseInt(e.target.value) || undefined })}
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Calories</label>
              <Input
                type="number"
                value={formData.calories || ""}
                onChange={(e) => setFormData({ ...formData, calories: Number.parseInt(e.target.value) || undefined })}
                placeholder="250"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the dish..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              value={formData.image_url || ""}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
              />
              Available
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              Featured
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)} className="bg-red-600 hover:bg-red-700">
              <Save className="h-4 w-4 mr-2" />
              Save Item
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CMS...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tandoor Hut CMS</h1>
              <p className="text-gray-600">Content Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
            <Button variant="ghost" size="sm" onClick={() => setError("")} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
            <Button variant="ghost" size="sm" onClick={() => setSuccess("")} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu Items ({menuItems.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu Items Management</h2>
              <Button onClick={() => setShowAddForm(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <ItemForm
                item={{
                  item_id: "",
                  name: "",
                  description: "",
                  price: 0,
                  category: "",
                  is_available: true,
                  is_featured: false,
                  spice_level: "none",
                  sort_order: 0,
                }}
                onSave={handleSaveItem}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {/* Edit Form */}
            {editingItem && (
              <ItemForm item={editingItem} onSave={handleSaveItem} onCancel={() => setEditingItem(null)} />
            )}

            {/* Menu Items List */}
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          {!item.is_available && <Badge variant="secondary">Unavailable</Badge>}
                          {item.is_featured && (
                            <Badge className="bg-yellow-500">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {item.spice_level !== "none" && (
                            <Badge variant="outline">
                              <Flame className="h-3 w-3 mr-1" />
                              {item.spice_level}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-semibold text-green-600">${item.price.toFixed(2)}</span>
                          <span>{item.category}</span>
                          {item.prep_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.prep_time}min
                            </span>
                          )}
                          {item.calories && <span>{item.calories} cal</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => item.id && handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menu Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      <Badge variant="outline">
                        {menuItems.filter((item) => item.category === category.name).length} items
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Database Status</h3>
                    <p className="text-blue-800">Connected to Neon PostgreSQL</p>
                    <p className="text-sm text-blue-600">Total Menu Items: {menuItems.length}</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Security Notice</h3>
                    <p className="text-yellow-800">Change default admin credentials in production!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
