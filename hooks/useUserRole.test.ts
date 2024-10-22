import { renderHook, act } from '@testing-library/react'
import { useUserRole } from './useUserRole'
import { createClient } from '@/utils/supabase/server'

jest.mock('@/utils/supabase/server')

describe('useUserRole', () => {
  it('returns null when there is no user', async () => {
    const mockGetUser = jest.fn().mockResolvedValue({ data: { user: null }, error: null })
    const mockRpc = jest.fn()
    ;(createClient as jest.Mock).mockReturnValue({
      auth: { getUser: mockGetUser },
      rpc: mockRpc
    })

    const { result } = renderHook(() => useUserRole())
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(mockGetUser).toHaveBeenCalled()
    expect(mockRpc).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
    expect(result.current.role).toBeNull()
  })

  it('returns the user role when there is a user', async () => {
    const mockGetUser = jest.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null })
    const mockRpc = jest.fn().mockResolvedValue({ data: 'admin', error: null })
    ;(createClient as jest.Mock).mockReturnValue({
      auth: { getUser: mockGetUser },
      rpc: mockRpc
    })

    const { result } = renderHook(() => useUserRole())
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(mockGetUser).toHaveBeenCalled()
    expect(mockRpc).toHaveBeenCalledWith('get_user_role', { user_uuid: '123' })
    expect(result.current.loading).toBe(false)
    expect(result.current.role).toBe('admin')
  })
})
