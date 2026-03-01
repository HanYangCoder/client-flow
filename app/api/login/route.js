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

    // Set cookie
    cookies().set('session', email, {
      httpOnly: true,
      path: '/',
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}