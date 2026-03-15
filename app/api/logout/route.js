import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req, res) {
    try {
        const response = NextResponse.json({ success: true })

        response.cookies.set('session', '', {
            maxAge: 0,
            path: '/',
        })
        
        return response
    } catch (error) {
        return NextResponse.json(
          { error: 'Something went wrong' },
          { status: 500 }
        )
    }
}