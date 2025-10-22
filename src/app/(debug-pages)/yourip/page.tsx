import { headers } from "next/headers";

export default async function Page () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const ip1 = headerslist.get("cf-connecting-ip")
    || headerslist.get("true-client-ip")
    || headerslist.get("x-forwarded-for")
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p>Country Code: {countryCode}</p>
      <p>YourIP: {ip1}</p>
    </div>
  )
}