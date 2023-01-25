import { useEffect, useState } from 'react'

export const useDebounce = (value, ms = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, ms)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, ms])

  return debounceValue
}