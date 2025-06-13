'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') setDarkMode(true)
    
    // Or check system preference
    const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!saved && isDarkSystem) setDarkMode(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
