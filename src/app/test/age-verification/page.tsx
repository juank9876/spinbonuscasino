'use client'

import { useState } from 'react'
import { AgeVerificationPopup } from '@/components/juankui/age-verification'
import { Button } from '@/components/ui/button'
import type { AgeVerification } from '@/types/types'

// Example JSON data for testing
const exampleAgeVerificationData: AgeVerification = {
  enabled: 1,
  modal_text: "This website contains content intended for people over 18 years of age. Are you of legal age?",
  yes_text: "Yes, I am of legal age",
  no_text: "No, I am underage",
  redirect_url: "https://www.google.com"
}

// Alternative test data
const alternativeAgeVerificationData: AgeVerification = {
  enabled: 1,
  modal_text: "You must be 21 or older to access this content. Please confirm your age.",
  yes_text: "I am 21 or older",
  no_text: "I am under 21",
  redirect_url: "https://www.example.com"
}

export default function AgeVerificationTestPage() {
  const [showWithJSON, setShowWithJSON] = useState(false)
  const [showWithAlternative, setShowWithAlternative] = useState(false)

  const clearAgeVerification = () => {
    localStorage.removeItem('ageVerified')
    localStorage.removeItem('ageVerifiedTimestamp')
  }

  const handleTestWithJSON = () => {
    clearAgeVerification()
    setShowWithJSON(true)
    setShowWithAlternative(false)
  }

  const handleTestWithAlternative = () => {
    clearAgeVerification()
    setShowWithAlternative(true)
    setShowWithJSON(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Age Verification Popup Test
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Test Options
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* JSON Data Test */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">
                Test with Default Data
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                Uses the example JSON data (18+ verification)
              </p>
              <Button 
                onClick={handleTestWithJSON}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Test Default Data
              </Button>
            </div>

            {/* Alternative Data Test */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">
                Test with Alternative Data
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                Uses alternative JSON data (21+ verification)
              </p>
              <Button 
                onClick={handleTestWithAlternative}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Test Alternative Data
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Note:</strong> Each test will clear the localStorage to show the popup again. 
              In production, the popup will only show once until the user clears their browser data.
              The actual data comes from the API in the layout.
            </p>
          </div>
        </div>

        {/* Example Data Display */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Example JSON Data Structures
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Default Data</h3>
              <pre className="bg-black/30 rounded-lg p-4 text-green-400 text-xs overflow-x-auto">
                {JSON.stringify(exampleAgeVerificationData, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Alternative Data</h3>
              <pre className="bg-black/30 rounded-lg p-4 text-blue-400 text-xs overflow-x-auto">
                {JSON.stringify(alternativeAgeVerificationData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={clearAgeVerification}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Clear Age Verification (Reset)
          </Button>
        </div>
      </div>

      {/* Age Verification Popups */}
      {showWithJSON && (
        <AgeVerificationPopup 
          ageVerification={exampleAgeVerificationData}
        />
      )}
      
      {showWithAlternative && (
        <AgeVerificationPopup 
          ageVerification={alternativeAgeVerificationData}
        />
      )}
    </div>
  )
}
