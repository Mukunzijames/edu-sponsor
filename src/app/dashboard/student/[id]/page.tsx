"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  ArrowLeft,
  Heart,
  User,
  MapPin,
  Mail,
  Phone,
  Users,
  GraduationCap,
  Clock,
  Edit,
  Share2,
  Download,
  Loader2,
  DollarSign
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useStudent } from "@/hooks/useStudents"
import { useSchool } from "@/hooks/useSchools"
import { createCheckoutSession } from "@/services/paymentService"

// Helper function to format date and time
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  }
}

export default function StudentViewPage() {
  // Get the ID from the URL params
  const params = useParams();
  const studentId = params?.id as string;
  
  const [mounted, setMounted] = useState(false)
  const [isDonating, setIsDonating] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(50)
  const [donationDialogOpen, setDonationDialogOpen] = useState(false)
  const router = useRouter()
  
  const { data: student, isLoading: studentLoading, error: studentError } = useStudent(studentId)
  const { data: school } = useSchool(student?.SchoolId || "")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDonateClick = () => {
    setDonationDialogOpen(true)
  }

  const handleDonate = async () => {
    try {
      setIsDonating(true)
      
      // Validate amount
      if (!donationAmount || donationAmount <= 0) {
        toast.error("Invalid amount", {
          description: "Please enter a valid donation amount"
        });
        setIsDonating(false)
        return
      }
      
      // Show loading toast
      const loadingToast = toast.loading("Processing donation...");
      
      // Create checkout session
      const response = await createCheckoutSession(studentId, donationAmount)
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Redirect to Stripe checkout
      if (response && response.url) {
        toast.success("Redirecting to payment", {
          description: `Donation of $${donationAmount} for ${student?.Name}`
        });
        window.location.href = response.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Error processing donation:", error)
      toast.error("Donation Failed", {
        description: "There was an error processing your donation. Please try again."
      });
    } finally {
      setIsDonating(false)
      setDonationDialogOpen(false)
    }
  }

  if (!mounted) return null
  
  if (studentLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-indigo-600 font-medium">Loading student information...</p>
        </div>
      </div>
    )
  }
  
  if (studentError || !student) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg border border-red-100">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Student</h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the student information. Please try again later or contact support.
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const createdDate = formatDateTime(student.CreatedAt)
  const updatedDate = formatDateTime(student.UpdatedAt)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-indigo-600 hover:bg-indigo-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Students
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-indigo-600">Student Profile</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Student Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-gray-100 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-indigo-100">
                    <AvatarImage src={student.Avatar || "/placeholder.svg?height=128&width=128"} alt={student.Name} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-3xl font-bold">
                      {student.Name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-3xl font-bold text-indigo-600 mb-2">{student.Name}</h2>
                  <p className="text-gray-600 mb-4">{school?.Name || "Loading school..."}</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 mb-6">{student.Status || "Active Student"}</Badge>
                </div>

                {/* Student Details Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Age & Gender</p>
                        <p className="font-semibold text-gray-900">
                          {student.Age} years old • {student.Gender}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-900">{student.Email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold text-gray-900">{student.Phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-900">{student.Address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Parent/Guardian</p>
                        <p className="font-semibold text-gray-900">{student.ParentName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <GraduationCap className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">School ID</p>
                        <p className="font-semibold text-gray-900 font-mono text-sm">
                          {student.SchoolId.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <div className="flex flex-col items-center lg:items-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-4">
                    <Button
                      size="lg"
                      onClick={handleDonateClick}
                      disabled={isDonating}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                    >
                      <Heart className="w-6 h-6 mr-3" />
                      DONATE NOW
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-600 text-center lg:text-right max-w-48">
                    Help {student.Name.split(" ")[0]} achieve their educational dreams
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Record Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-gray-100 h-full">
              <CardHeader>
                <CardTitle className="text-indigo-600 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Record Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Created</h4>
                  <p className="text-gray-600">{createdDate.date}</p>
                  <p className="text-sm text-gray-500">at {createdDate.time}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Last Updated</h4>
                  <p className="text-gray-600">{updatedDate.date}</p>
                  <p className="text-sm text-gray-500">at {updatedDate.time}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student ID</h4>
                  <p className="text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded border">{student.Id}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsorship Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-gray-100 h-full">
              <CardHeader>
                <CardTitle className="text-indigo-600 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Sponsorship Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$0</div>
                  <p className="text-gray-600 mb-4">Total Donations Received</p>
                  <div className="text-sm text-gray-500">
                    <p>• Educational materials: $0</p>
                    <p>• School fees: $0</p>
                    <p>• Meals & nutrition: $0</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Be the first to support {student.Name.split(" ")[0]}'s education journey!
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleDonateClick}
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Make a Difference
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* School Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-indigo-600 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">School Name</h4>
                  <p className="text-gray-600">{school?.Name || "Loading..."}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-600">{school?.District || "Loading..."}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Program</h4>
                  <p className="text-gray-600">{school?.Description || "Secondary Education"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Donation Dialog */}
      <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-indigo-600">Donate to {student.Name}</DialogTitle>
            <DialogDescription>
              Your donation will help support {student.Name.split(" ")[0]}'s education and future.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-700">Donation Amount (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input 
                  id="amount" 
                  type="number" 
                  min="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50, 100, 250].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={donationAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDonationAmount(amount)}
                  className={donationAmount === amount ? "bg-indigo-600" : "border-indigo-200 text-indigo-600"}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setDonationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDonate}
              disabled={isDonating || !donationAmount || donationAmount <= 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isDonating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Donate ${donationAmount}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
