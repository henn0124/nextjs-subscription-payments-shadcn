import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RoleProtectedRoute } from './RoleProtectedRoute'
import { useUserRole } from '@/hooks/useUserRole'
import { useRouter } from 'next/navigation'

jest.mock('@/hooks/useUserRole')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

describe('RoleProtectedRoute', () => {
  it('renders children when user has allowed role', async () => {
    (useUserRole as jest.Mock).mockReturnValue({ role: 'admin', loading: false })
    render(
      <RoleProtectedRoute allowedRoles={['admin']}>
        <div>Protected Content</div>
      </RoleProtectedRoute>
    )
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  it('redirects when user does not have allowed role', async () => {
    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useUserRole as jest.Mock).mockReturnValue({ role: 'user', loading: false })
    render(
      <RoleProtectedRoute allowedRoles={['admin']}>
        <div>Protected Content</div>
      </RoleProtectedRoute>
    )
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/unauthorized')
    })
  })

  it('shows loading state when role is not yet determined', async () => {
    (useUserRole as jest.Mock).mockReturnValue({ role: null, loading: true })
    render(
      <RoleProtectedRoute allowedRoles={['admin']}>
        <div>Protected Content</div>
      </RoleProtectedRoute>
    )
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })
})
