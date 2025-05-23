
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, PlusCircle, Edit3, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
}

const initialCategories: Category[] = [
  { id: "cat1", name: "Groceries" },
  { id: "cat2", name: "Dining Out" },
  { id: "cat3", name: "Transportation" },
  { id: "cat4", name: "Utilities" },
  { id: "cat5", name: "Entertainment" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const handleAddCategory = (event: FormEvent) => {
    event.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: newCategoryName.trim(),
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const handleEditCategory = (event: FormEvent) => {
    event.preventDefault();
    if (!editingCategory || !editCategoryName.trim()) return;
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: editCategoryName.trim() } : cat
      )
    );
    setEditingCategory(null);
    setEditCategoryName("");
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <Tags className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">Custom Categories</h1>
          <p className="text-lg text-muted-foreground">
            Personalize your spending categories for accurate tracking.
          </p>
        </div>
      </header>

      <Card className="mb-8 holographic-card">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Category</CardTitle>
        </CardHeader>
        <form onSubmit={handleAddCategory}>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter category name (e.g., Hobbies, Subscriptions)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="bg-input/50 border-border focus:ring-accent"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-glow-primary">Your Categories</h2>
        {categories.length === 0 ? (
          <Card className="holographic-card">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No categories defined yet. Add some above to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {categories.map((category) => (
              <Card key={category.id} className="holographic-card flex items-center justify-between p-4">
                <span className="text-lg">{category.name}</span>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)} className="text-blue-400 hover:text-blue-300">
                        <Edit3 className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    {editingCategory && editingCategory.id === category.id && (
                       <DialogContent className="bg-background border-border text-foreground holographic-card">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-primary">Edit Category</DialogTitle>
                          <DialogDescription>Update the name for your category.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditCategory}>
                          <div className="py-4">
                            <Input
                              type="text"
                              value={editCategoryName}
                              onChange={(e) => setEditCategoryName(e.target.value)}
                              className="bg-input/50 border-border focus:ring-accent"
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                               <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          </ScrollArea>
        )}
      </section>

      {/* This Dialog is a template, ensure it's properly controlled if used for editing. 
          The above DialogTrigger within the map is more direct.
      */}
      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
           {/* Content is now rendered within the DialogTrigger's Dialog in the map */}
        </Dialog>
      )}
    </div>
  );
}
