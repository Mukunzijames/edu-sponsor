"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Mail, Calendar, Users } from "lucide-react"
import { getSPonsorship } from "@/services/paymentService"

interface Student {
  Id: string
  Name: string
  Age: string
  Email: string
  Password: string
  Role: string
  CreatedAt: string
  UpdatedAt: string
}

interface Sponsorship {
  Id: string
  SponsorId: string
  StudentId: string
  StartDate: string
  Status: string
  Student: Student
}

interface SponsorshipResponse {
  success: boolean
  message: string
  data: Sponsorship[]
}

export default function SponsorPage() {
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([])
  const [filteredSponsorships, setFilteredSponsorships] = useState<Sponsorship[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleFetching = (): void => {
    setLoading(true)
    setError(null)
    getSPonsorship()
      .then((response) => {
        if (response.success) {
          setSponsorships(response.data)
          setFilteredSponsorships(response.data)
        } else {
          setError(response.message || "Failed to fetch sponsorships")
          console.error("Failed to fetch sponsorships:", response.message)
        }
      })
      .catch((error) => {
        setError("Error fetching sponsorships. Please try again.")
        console.error("Error fetching sponsorships:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleFetching()
  }, [])

  useEffect(() => {
    const filtered = sponsorships.filter(
      (sponsorship) =>
        sponsorship.Student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsorship.Student.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsorship.Status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredSponsorships(filtered)
  }, [searchTerm, sponsorships])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
            <p className="text-muted-foreground">Loading sponsorships...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="mb-4 text-red-500">
              <Mail className="w-12 h-12 mx-auto mb-2" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Error Loading Sponsorships</h2>
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button onClick={handleFetching} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-6 mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sponsor Dashboard</h1>
          <p className="text-muted-foreground">Manage and view your student sponsorships</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleFetching} variant="outline" size="sm" disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
          <Badge variant="outline" className="text-sm">
            <Users className="w-4 h-4 mr-1" />
            {filteredSponsorships.length} Sponsorships
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sponsorships</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorships.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorships.filter((s) => s.Status === "Active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(sponsorships.map((s) => s.StudentId)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Sponsorships</CardTitle>
          <CardDescription>View and manage all your student sponsorships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4 space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name, email, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSponsorships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center">
                      <div className="text-muted-foreground">
                        {searchTerm ? "No sponsorships found matching your search." : "No sponsorships found."}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.Id}>
                      <TableCell className="font-medium">{sponsorship.Student.Name}</TableCell>
                      <TableCell>{sponsorship.Student.Email}</TableCell>
                      <TableCell>{sponsorship.Student.Age} years</TableCell>
                      <TableCell>{formatDate(sponsorship.StartDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(sponsorship.Status)}>{sponsorship.Status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
