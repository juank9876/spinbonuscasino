import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    revalidateTag('global')

    return NextResponse.json({ revalidated: true, now: Date.now() })
}