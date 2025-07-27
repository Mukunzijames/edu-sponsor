"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, DollarSign, Calendar, TrendingUp, Users } from "lucide-react"
import { getDonations } from "@/services/paymentService"

interface Sponsor {
  Id: string
  Name: string
  Age: string
  Email: string
  Password: string
  Role: string
  CreatedAt: string
  UpdatedAt: string
}

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
  Sponsor: Sponsor
  Student: Student
}

interface Donation {
  Id: string
  SponsorshipId: string
  Amount: string
  DonatedAt: string
  Sponsorship: Sponsorship
}

interface DonationResponse {
  success: boolean
  message: string
  data: Donation[]
}
// State management for donations
// This component fetches and displays donations with search and pagination features
export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const handleFetching = (): void => {
    setLoading(true)
    setError(null)
    getDonations()
      .then((response) => {
        if (response.success) {
          setDonations(response.data)
          setFilteredDonations(response.data)
        } else {
          setError(response.message || "Failed to fetch donations")
          console.error("Failed to fetch donations:", response.message)
        }
      })
      .catch((error) => {
        setError("Error fetching donations. Please try again.")
        console.error("Error fetching donations:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleFetching()
  }, [])

  useEffect(() => {
    const filtered = donations.filter(
      (donation) =>
        donation.Sponsorship.Student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.Sponsorship.Sponsor.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.Amount.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredDonations(filtered)
  }, [searchTerm, donations])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
// Format currency function
// This function formats a given amount string into a currency format
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number.parseFloat(amount))
  }

  const getTotalDonations = () => {
    return donations.reduce((total, donation) => total + Number.parseFloat(donation.Amount), 0)
  }

  const getAverageDonation = () => {
    if (donations.length === 0) return 0
    return getTotalDonations() / donations.length
  }

  const getUniqueStudents = () => {
    return new Set(donations.map((d) => d.Sponsorship.StudentId)).size
  }
// Pagination logic
// This logic calculates the total number of items, pages, and current page items
  const totalItems = filteredDonations.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDonations = filteredDonations.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
            <p className="text-muted-foreground">Loading donations...</p>
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
              <DollarSign className="w-12 h-12 mx-auto mb-2" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Error Loading Donations</h2>
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
          <h1 className="text-3xl font-bold">Donations Dashboard</h1>
          <p className="text-muted-foreground">Track and manage all donation activities</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleFetching} variant="outline" size="sm" disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
          <Badge variant="outline" className="text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            {filteredDonations.length} Donations
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(getTotalDonations().toString())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Count</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(getAverageDonation().toString())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Students Helped</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueStudents()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>View and track all your donation transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4 space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name, sponsor name, or amount..."
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
                  <TableHead>Sponsor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentDonations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center">
                      <div className="text-muted-foreground">
                        {searchTerm ? "No donations found matching your search." : "No donations found."}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentDonations.map((donation) => (
                    <TableRow key={donation.Id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{donation.Sponsorship.Student.Name}</div>
                          <div className="text-sm text-muted-foreground">{donation.Sponsorship.Student.Email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{donation.Sponsorship.Sponsor.Name}</div>
                          <div className="text-sm text-muted-foreground">{donation.Sponsorship.Sponsor.Email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">{formatCurrency(donation.Amount)}</div>
                      </TableCell>
                      <TableCell>{formatDate(donation.DonatedAt)}</TableCell>
                      <TableCell>
                        <Badge variant={donation.Sponsorship.Status === "Active" ? "default" : "secondary"}>
                          {donation.Sponsorship.Status}
                        </Badge>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} donations
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[32px]"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
