'use client'

import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


const DashboardPage = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogout = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        try {
        const res = await fetch('/api/logout', {
            method: 'POST',
        })

        const data = await res.json()

        if (!res.ok) {
        setError(data.error || 'Login failed')
            return
        }

        router.push('/login')

        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }
  
    return (
        <>
            <div>DashboardPage</div>
            <Button onClick={handleLogout}>Log out</Button>
        </>
    )
}

export default DashboardPage