"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CheckCircle, Download, ArrowLeft, Receipt, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Inline Badge Component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export default function PaymentSuccessPage() {
  const [mounted, setMounted] = useState(false)
  const [paymentId, setPaymentId] = useState("")
  const [amount, setAmount] = useState("50.00")

  useEffect(() => {
    setMounted(true)
    // Get payment details from URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("payment_id") || `PAY-${Date.now()}`
    const amt = urlParams.get("amount") || "50.00"
    setPaymentId(id)
    setAmount(amt)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full opacity-75 bg-emerald-100 animate-ping"></div>
            <div className="relative p-6 rounded-full bg-emerald-500 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Payment Successful!</h1>
              <p className="text-lg text-gray-600">Thank you for your generous donation</p>
            </div>

            {/* Payment Details */}
            <div className="mb-8 space-y-4">
              <div className="p-4 space-y-3 rounded-lg bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center flex-shrink-0 gap-2 text-sm font-medium text-gray-500">
                    <Receipt className="w-4 h-4" />
                    Payment ID
                  </span>
                  <span className="min-w-0 px-2 py-1 font-mono text-sm text-right text-gray-900 break-all bg-white rounded">
                    {paymentId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <CreditCard className="w-4 h-4" />
                    Amount
                  </span>
                  <span className="text-2xl font-bold text-gray-900">${amount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Completed</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Time</span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full py-3 font-semibold text-white transition-all duration-200 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                size="lg"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="font-semibold transition-all duration-200 bg-transparent border-2 hover:bg-gray-50"
                  size="lg"
                  onClick={() => (window.location.href = "/dashboard/school")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>

                <Button
                  variant="outline"
                  className="font-semibold transition-all duration-200 bg-transparent border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  size="lg"
                  onClick={() => (window.location.href = "/donations")}
                >
                  View Donations
                </Button>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="pt-4 mt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                className="w-full text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                onClick={() => (window.location.href = "/donate")}
              >
                Make Another Donation
              </Button>
            </div>

            {/* Footer Message */}
            <div className="pt-4 mt-6 text-center border-t border-gray-100">
              
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>Secure Payment</span>
                <span>•</span>
                <span>SSL Encrypted</span>
                <span>•</span>
                <span>PCI Compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>

      
        
      </div>
    </div>
  )
}
