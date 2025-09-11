'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AgeVerification } from '@/types/types'
import { debug, debugLog } from '@/config/debug-log'

interface AgeVerificationProps {
  ageVerification?: AgeVerification
}

// Default JSON data as fallback
const defaultAgeVerificationData: AgeVerification = {
  enabled: 1,
  modal_text: "This website contains content intended for people over 18 years of age. Are you of legal age?",
  yes_text: "Yes, I am of legal age",
  no_text: "No, I am underage",
  redirect_url: "https://www.google.com"
}

export function AgeVerificationPopup({ ageVerification }: AgeVerificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  debugLog(debug.ageVerification, "AgeVerificationPopup", ageVerification)
  // Apply field-level fallbacks for each property
  const verificationData: AgeVerification = {
    enabled: ageVerification?.enabled ?? defaultAgeVerificationData.enabled,
    modal_text: ageVerification?.modal_text || defaultAgeVerificationData.modal_text,
    yes_text: ageVerification?.yes_text || defaultAgeVerificationData.yes_text,
    no_text: ageVerification?.no_text || defaultAgeVerificationData.no_text,
    redirect_url: ageVerification?.redirect_url || defaultAgeVerificationData.redirect_url,
  }

  debugLog(debug.fetcher, "AgeVerificationPopup", verificationData)

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified')
    if (!ageVerified && verificationData.enabled === 1) {
      setIsVisible(true)
    }
  }, [verificationData.enabled])

  const handleYes = () => {
    localStorage.setItem('ageVerified', 'true')
    localStorage.setItem('ageVerifiedTimestamp', new Date().toISOString())
    setIsVisible(false)
  }

  const handleNo = () => {
    // Redirect to specified URL
    window.location.href = verificationData.redirect_url
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className={cn(
        "relative z-10 w-full max-w-md mx-4",
        "bg-black/70 border border-[var(--color-accent)]/20",
        "rounded-lg shadow-2xl",
        "animate-in fade-in-0 zoom-in-95 duration-300"
      )}>
        <div className="p-6 text-center">
          {/* Icon or Logo */}
          <div className="mx-auto mb-4 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-white mb-4">
            Age Verification
          </h2>

          {/* Message */}
          <p className="text-white/90 mb-6 leading-relaxed">
            {verificationData.modal_text}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleYes}
              className={cn(
                "bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80",
                "text-white font-medium px-6 py-2",
                "transition-all duration-200"
              )}
            >
              {verificationData.yes_text}
            </Button>

            <Button
              variant="outline"
              onClick={handleNo}
              className={cn(
                "border-[var(--color-accent)]/30 text-white/90 hover:text-white",
                "bg-transparent hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/50",
                "px-6 py-2 transition-all duration-200"
              )}
            >
              {verificationData.no_text}
            </Button>
          </div>

          {/* Footer text */}
          <p className="text-xs text-white/60 mt-4">
            This verification is required by law in many jurisdictions.
          </p>
        </div>
      </div>
    </div>
  )
}
