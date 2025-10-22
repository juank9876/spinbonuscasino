import { headers } from "next/headers";

export default async function Page () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const ip = headerslist.get('x-real-ip') || headerslist.get('x-forwarded-for') || 'unknown';
  return (
    <div>
      <p>Country Code: {countryCode}</p>
      <p>IP Address: {ip}</p>
    </div>
  )
}