'use client'

import { useEffect } from 'react'

export default function BlogRedirect() {
  useEffect(() => {
    // Redirect to UltimateQA blog
    window.location.href = 'https://ultimateqa.com/blog'
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Redirecting to Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Taking you to{' '}
          <a 
            href="https://ultimateqa.com/blog" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ultimateqa.com/blog
          </a>
        </p>
      </div>
    </div>
  )
} 