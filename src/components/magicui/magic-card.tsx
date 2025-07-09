"use client"

import { motion, useMotionTemplate, useMotionValue } from "motion/react"
import type React from "react"
import { useCallback, useRef } from "react"

import { cn } from "@/lib/utils"

interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = "#c0c0c0",
  gradientOpacity = 0.2,
  //gradientFrom = "#9E7AFF",
  //gradientTo = "#FE8BBB",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }
    },
    [mouseX, mouseY],
  )

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect()
      mouseX.set(width / 2)
      mouseY.set(height / 2)
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={cardRef}
      className={cn("group relative rounded-[inherit] overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            var(--color-primary),
            var(--color-accent),

            transparent 70%
            )
          `,
        }}
      />
      <div className="absolute inset-0 rounded-[inherit] bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-px rounded-[inherit] bg-[var(--color-primary)]" />
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 70%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
