'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
            setError(data.error || 'Login failed')
                return
            }

            window.location.href = '/dashboard'

        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Card className="w-[380px]">
                <CardHeader>
                <CardTitle>Login to ClientFlow</CardTitle>
                </CardHeader>

                <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">

                    <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                </form>
                </CardContent>
            </Card>
        </div>
    )
}