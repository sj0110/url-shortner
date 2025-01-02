import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <Link href="/shorten-url" className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
              <svg className="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />

              </svg>
              <span>Try Now</span>
            </Link>
            <h1 className="text-gray-900 dark:text-white text-xl sm:text-3xl md:text-5xl font-extrabold mb-2 w-5/6">Quickly shorten your long URLs</h1>
            <p className="text-base sm:text-lg font-normal text-gray-500 dark:text-gray-400 mb-6 w-5/6 md:w-4/6">Easily shorten your long and cumbersome URLs into compact, shareable links in seconds. Simplify your online sharing experience and make your links more manageable and professional with just a few clicks.</p>
            <Link href="/shorten-url" className="inline-flex justify-center items-center py-2.5 px-5 text-sm sm:text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Shorten URL now
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <Link href="https://github.com/sj0110/url-shortner" target='_blank' className="bg-purple-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
                </svg>
                <span>Code</span>
              </Link>
              <h2 className="text-gray-900 dark:text-white text-xl sm:text-3xl md:text-5xl font-extrabold mb-2 w-5/6">URL Shortener Source Code</h2>
              <p className="text-base sm:text-lg font-normal text-gray-500 dark:text-gray-400 mb-4 w-5/6 md:w-4/6">Access the complete source code to build your own URL shortener. Customize and deploy it to quickly transform long URLs into short, shareable links for a seamless user experience.</p>
              <Link href="https://github.com/sj0110/url-shortner" target='_blank' className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-base sm:text-lg inline-flex items-center">GitHub Repo
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <div className="bg-green-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM7.5 5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V5zM8 11a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-.5z" />
                </svg>
                <span>About Us</span>
              </div>
              <h2 className="text-gray-900 dark:text-white text-xl sm:text-3xl md:text-5xl font-extrabold mb-2 w-5/6">Who are we</h2>
              <p className="text-base sm:text-lg font-normal text-gray-500 dark:text-gray-400 mb-4 w-5/6 md:w-4/6">We are a passionate team committed to creating innovative solutions that solve real-world problems. Driven by our core values of integrity, creativity, and collaboration, we strive to provide exceptional experiences for our users and make a lasting impact in everything we do.</p>
              {/* <Link href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Ef
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default page
