'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Cookies } from '@/api-fetcher/fetcher'
import { debug, debugLog } from '@/config/debug-log'

interface CookieConsentProps {
    cookies?: Cookies
}

// Default cookies data as fallback
const defaultCookiesData: Cookies = {
    cookies_enabled: 1,
    cookies_text: "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
    cookies_reject_text: "Reject All",
    cookies_only_necessary_text: "Only Necessary",
    cookies_configure_text: "Configure",
    cookies_accept_all_text: "Accept All"
}

export function CookieConsent({ cookies }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [showConfiguration, setShowConfiguration] = useState(false)
    debugLog(debug.cookiesConsent, "CookieConsent", cookies)

    // Apply field-level fallbacks for each property
    const cookiesData: Cookies = {
        cookies_enabled: cookies?.cookies_enabled ?? defaultCookiesData.cookies_enabled,
        cookies_text: cookies?.cookies_text || defaultCookiesData.cookies_text,
        cookies_reject_text: cookies?.cookies_reject_text || defaultCookiesData.cookies_reject_text,
        cookies_only_necessary_text: cookies?.cookies_only_necessary_text || defaultCookiesData.cookies_only_necessary_text,
        cookies_configure_text: cookies?.cookies_configure_text || defaultCookiesData.cookies_configure_text,
        cookies_accept_all_text: cookies?.cookies_accept_all_text || defaultCookiesData.cookies_accept_all_text,
    }

    debugLog(debug.cookiesConsent, "CookieConsent", cookiesData)
    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent')
        if (!consent && cookiesData.cookies_enabled === 1) {
            setIsVisible(true)
        }
    }, [cookiesData.cookies_enabled])

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'all')
        setIsVisible(false)
    }

    const handleRejectAll = () => {
        localStorage.setItem('cookieConsent', 'rejected')
        setIsVisible(false)
    }

    const handleAcceptNecessary = () => {
        localStorage.setItem('cookieConsent', 'necessary')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 py-2",
            "bg-[var(--color-secondary)]/70 backdrop-blur-sm",
            "border-t border-[var(--color-accent)]/20",
            "transition-all duration-300 ease-in-out",
            showConfiguration ? "h-fit" : "h-fit"
        )}>
            <div className="container w-full mx-auto">
                <div className="flex flex-row justify-between items-center px-5">
                    {/* Main Message */}
                    <p className="text-white/90 text-xs max-w-5xl md:text-base ">
                        {cookiesData.cookies_text}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 items-center justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRejectAll}
                            className="text-white/70 hover:text-white"
                        >
                            {cookiesData.cookies_reject_text}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleAcceptNecessary}
                            className="text-white/70 hover:text-white"
                        >
                            {cookiesData.cookies_only_necessary_text}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfiguration(!showConfiguration)}
                            className="text-white/70 hover:text-white"
                        >
                            {cookiesData.cookies_configure_text}
                        </Button>

                        <Button
                            size="sm"
                            onClick={handleAcceptAll}
                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white"
                        >
                            {cookiesData.cookies_accept_all_text}
                        </Button>
                    </div>

                    {/* Configuration Panel */}
                    {showConfiguration && (
                        <div className="mt-4 border-t border-[var(--color-accent)]/10 pt-4">
                            {/* Add your cookie configuration options here */}
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-white/90">Necessary Cookies</label>
                                    <input type="checkbox" checked disabled />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white/90">Analytics Cookies</label>
                                    <input type="checkbox" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white/90">Marketing Cookies</label>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}