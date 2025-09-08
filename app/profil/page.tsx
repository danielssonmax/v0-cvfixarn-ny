"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { sv } from "date-fns/locale"
import { Trash2, Download, Eye, EyeOff, Edit2, FileText, User } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { SignupPopup } from "@/components/signup-popup"

interface CV {
  id: string
  title: string
  created_at: string
  updated_at: string
  is_public: boolean
}

type Tab = "cv" | "account"

export default function ProfilePage() {
  const { user } = useAuth()
  const [cvs, setCvs] = useState<CV[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [cvToDelete, setCvToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("cv")
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [popupMode, setPopupMode] = useState<"signup" | "login">("login")

  useEffect(() => {
    if (user) {
      fetchCVs()
    }
  }, [user])

  const fetchCVs = async () => {
    try {
      const { data, error } = await supabase
        .from('cvs')
        .select('id, title, created_at, updated_at, is_public')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCvs(data || [])
    } catch (error) {
      console.error('Error fetching CVs:', error)
      toast({
        title: "Error",
        description: "Failed to load your CVs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!cvToDelete) return

    try {
      const { error } = await supabase
        .from('cvs')
        .delete()
        .eq('id', cvToDelete)

      if (error) throw error

      setCvs(cvs.filter(cv => cv.id !== cvToDelete))
      toast({
        title: "Success",
        description: "CV deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting CV:', error)
      toast({
        title: "Error",
        description: "Failed to delete CV. Please try again.",
        variant: "destructive",
      })
    } finally {
      setShowDeleteDialog(false)
      setCvToDelete(null)
    }
  }

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('cvs')
        .update({ is_public: !currentVisibility })
        .eq('id', id)

      if (error) throw error

      setCvs(cvs.map(cv => 
        cv.id === id ? { ...cv, is_public: !currentVisibility } : cv
      ))

      toast({
        title: "Success",
        description: `CV is now ${!currentVisibility ? 'public' : 'private'}.`,
      })
    } catch (error) {
      console.error('Error updating CV visibility:', error)
      toast({
        title: "Error",
        description: "Failed to update CV visibility. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Profil</h1>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <p className="text-center text-gray-500">Logga in för att se dina sparade CV:n.</p>
                <Button 
                  className="bg-[#00bf63] hover:bg-[#00a857] text-white"
                  onClick={() => {
                    setIsSignupOpen(true)
                    setPopupMode("login")
                  }}
                >
                  Logga in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <SignupPopup
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onSignupSuccess={() => {
            setIsSignupOpen(false)
          }}
          onOpenLogin={() => setPopupMode("login")}
          mode={popupMode}
          setMode={setPopupMode}
        />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Profil</h1>
            {activeTab === "cv" && (
              <Link href="/profil/skapa-cv">
                <Button className="bg-[#00bf63] hover:bg-[#00a857] text-white">
                  Skapa nytt CV
                </Button>
              </Link>
            )}
          </div>

          <div className="flex gap-4 border-b">
            <Button
              variant="ghost"
              className={`flex items-center gap-2 ${activeTab === "cv" ? "border-b-2 border-[#00bf63] text-[#00bf63]" : ""}`}
              onClick={() => setActiveTab("cv")}
            >
              <FileText className="h-4 w-4" />
              Mina CVn
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center gap-2 ${activeTab === "account" ? "border-b-2 border-[#00bf63] text-[#00bf63]" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              <User className="h-4 w-4" />
              Mitt Konto
            </Button>
          </div>

          {activeTab === "cv" ? (
            <>
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : cvs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Du har inga sparade CV:n än.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cvs.map((cv) => (
                    <Card key={cv.id}>
                      <CardHeader>
                        <CardTitle>{cv.title || 'Untitled CV'}</CardTitle>
                        <CardDescription>
                          Created: {format(new Date(cv.created_at), 'PPP', { locale: sv })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleVisibility(cv.id, cv.is_public)}
                              title={cv.is_public ? 'Make private' : 'Make public'}
                            >
                              {cv.is_public ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                            <Link href={`/profil/skapa-cv?edit=${cv.id}`}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCvToDelete(cv.id)
                                setShowDeleteDialog(true)
                              }}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Implement download functionality
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Ladda ner
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="font-medium">E-post</label>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  {/* Här kan vi lägga till mer kontoinformation senare */}
                </div>
              </CardContent>
            </Card>
          )}

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete CV</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Are you sure you want to delete this CV? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
