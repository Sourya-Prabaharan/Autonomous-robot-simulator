"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Edit, Trash2, Clock } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: string
  spiceLevel: string
  image?: string
}

interface RestaurantInfo {
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  hours: {
    [key: string]: string
  }
}

export default function AdminPanel() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato",
      price: "$12.99",
      category: "Dosas",
      spiceLevel: "medium",
    },
  ])

  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: "Tandoor Hut",
    tagline: "Authentic South Indian Cuisine",
    phone: "(630) 848-8222",
    email: "info@tandoorhut.com",
    address: "Naperville, IL 60564, United States",
    hours: {
      Monday: "11:00 AM - 9:30 PM",
      Tuesday: "11:00 AM - 9:30 PM",
      Wednesday: "11:00 AM - 9:30 PM",
      Thursday: "11:00 AM - 9:30 PM",
      Friday: "11:00 AM - 10:00 PM",
      Saturday: "11:00 AM - 10:00 PM",
      Sunday: "11:00 AM - 9:30 PM",
    },
  })

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: "",
    category: "Appetizers",
    spiceLevel: "mild",
  })

  const [editingItem, setEditingItem] = useState<string | null>(null)

  const categories = ["Appetizers", "Dosas", "Curries", "Biryanis", "Desserts", "Beverages"]
  const spiceLevels = ["none", "mild", "medium", "hot"]

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.price) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        category: newItem.category || "Appetizers",
        spiceLevel: newItem.spiceLevel || "mild",
      }
      setMenuItems([...menuItems, item])
      setNewItem({ name: "", description: "", price: "", category: "Appetizers", spiceLevel: "mild" })
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleImageUpload = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setMenuItems(menuItems.map((item) => (item.id === itemId ? { ...item, image: imageUrl } : item)))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateRestaurantInfo = (field: keyof RestaurantInfo, value: any) => {
    setRestaurantInfo({ ...restaurantInfo, [field]: value })
  }

  const handleUpdateHours = (day: string, hours: string) => {
    setRestaurantInfo({
      ...restaurantInfo,
      hours: { ...restaurantInfo.hours, [day]: hours },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tandoor Hut Admin Panel</h1>
          <p className="text-gray-600">Manage your restaurant content, menu, and information - Naperville, IL</p>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="info">Restaurant Info</TabsTrigger>
            <TabsTrigger value="photos">Photo Gallery</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Menu Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Item Name"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <Input
                    placeholder="Price (e.g., $12.99)"
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={newItem.category || "Appetizers"}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={newItem.spiceLevel || "mild"}
                    onChange={(e) => setNewItem({ ...newItem, spiceLevel: e.target.value })}
                  >
                    {spiceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea
                  placeholder="Item Description"
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <Button onClick={handleAddItem} className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="outline">{item.spiceLevel}</Badge>
                          <Badge className="bg-red-600">{item.price}</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex gap-2">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(item.id, e)}
                            />
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                          </label>
                          <Button variant="outline" size="sm" onClick={() => setEditingItem(item.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      {item.image && (
                        <div className="ml-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Restaurant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                    <Input
                      value={restaurantInfo.name}
                      onChange={(e) => handleUpdateRestaurantInfo("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <Input
                      value={restaurantInfo.tagline}
                      onChange={(e) => handleUpdateRestaurantInfo("tagline", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={restaurantInfo.phone}
                      onChange={(e) => handleUpdateRestaurantInfo("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      value={restaurantInfo.email}
                      onChange={(e) => handleUpdateRestaurantInfo("email", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Textarea
                    value={restaurantInfo.address}
                    onChange={(e) => handleUpdateRestaurantInfo("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-24 font-medium">{day}</div>
                      <Input
                        value={hours}
                        onChange={(e) => handleUpdateHours(day, e.target.value)}
                        placeholder="e.g., 11:00 AM - 9:30 PM"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Upload restaurant photos</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="gallery-upload" />
                  <label htmlFor="gallery-upload">
                    <Button className="bg-red-600 hover:bg-red-700">Choose Photos</Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Order management system will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
