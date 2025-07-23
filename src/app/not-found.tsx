// app/not-found.tsx

import { Link } from "@/components/juankui/optionals/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black dark:text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2">The page does not exist.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Home
      </Link>
    </div>
  )
}
