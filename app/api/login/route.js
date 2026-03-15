import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // Fake validation for now
    if (email !== 'admin@example.com' || password !== '123456') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })
    
    response.cookies.set('session', email, {
      httpOnly: true,
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