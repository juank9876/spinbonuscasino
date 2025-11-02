import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getUserCountry, fetchHomePage } from "@/api-fetcher/fetcher";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {

  // Verificar si existe homepage
  const homePage = await fetchHomePage();

  // Si no hay homepage y no estamos ya en la home, redirigir a home
  if (!homePage && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const headersList = await headers();

  let ip =
    headersList.get("cf-connecting-ip")

  if (ip === '::1' || ip === '127.0.0.1' || ip === 'unknown') {
    ip = '8.8.8.8'; // IP de prueba (USA)
    // ip = '185.94.188.1'; // IP de prueba España
  }
  //console.log('LA IP ES ' , ip)


  const userCountry = await getUserCountry({ ip: ip || '' });

  // 3. Continuar con la request y agregar el país como header
  const res = NextResponse.next()
  res.headers.set('x-user-country', userCountry)
  res.headers.set('x-has-homepage', homePage ? 'true' : 'false')

  return res
}

export const config = {
  // aplica a todas las rutas menos assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}