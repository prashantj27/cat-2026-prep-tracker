import { useEffect, useState } from 'react'

// Persist any value to localStorage under `key`; survives reloads.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage may be full / unavailable — ignore quietly
    }
  }, [key, value])

  return [value, setValue]
}