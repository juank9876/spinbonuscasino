import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from "next/headers";
import { getUserCountry } from "@/api-fetcher/fetcher";

/** @param {NextRequest} req */
export async function middleware(req: NextRequest) {

  // 1. Obtener IP del usuario
  const { ua } = userAgent(req);

  const headersList = await headers();

  let ip = 
    // Vercel
    headersList.get("cf-connecting-ip") ||
    headersList.get("true-client-ip") ||
    headersList.get("x-forwarded-for")?.split(',')[0].trim() ||
    "unknown";

  if (ip === '::1' || ip === '127.0.0.1' || ip === 'unknown') {
    console.log('⚠️  Localhost detected, using test IP');
    ip = '8.8.8.8'; // IP de prueba (USA)
    // ip = '185.94.188.1'; // IP de prueba España
  }
  //console.log('LA IP ES ' , ip)

  const data = {
    ok: true,
    ip_address: ip,
    user_agent: ua,
  };
  const userCountry = await getUserCountry({ ip: ip || '' });

  // 3. Continuar con la request y agregar el país como header
  const res = NextResponse.next()
  res.headers.set('x-user-country', userCountry)

  return res
}

export const config = {
  // aplica a todas las rutas menos assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}