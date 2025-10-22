import { headers } from "next/headers";

export default async function Page () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const ip1 = headerslist.get("cf-connecting-ip")
  const ip2 = headerslist.get("true-client-ip")
  const ip3 = headerslist.get("x-forwarded-for")
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p>Country Code: {countryCode}</p>
      <p>cf-connecting-ip {ip1}</p>
      <p>true-client-ip {ip2}</p>
      <p>x-forwarded-for {ip3}</p>
    </div>
  )
}