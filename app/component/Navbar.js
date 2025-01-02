"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname(); // Get the current pathname

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600 fixed top-0">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <lord-icon
                        src="https://cdn.lordicon.com/wsbmifnf.json"
                        trigger="loop"
                        delay="1500"
                        state="in-reveal"
                        className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
                    />
                    <span className="self-center text-sm sm:text-xl font-semibold whitespace-nowrap dark:text-white">Bitlinks</span>
                </Link>
                <div className="flex items-center">
                    <ul className="flex items-center space-x-3 font-bold">
                        <li>
                            {/* Conditionally render based on the current route */}
                            {pathname === '/' ? (
                                <Link href="/shorten-url">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 focus:outline-none font-bold rounded-lg text-xs sm:text-sm px-4 py-2 sm:px-4 sm:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                                        transition-all duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Shorten URL
                                    </button>
                                </Link>
                            ) : (
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 sm:px-3 text-gray-900 rounded dark:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                                    aria-current="page"
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/dznelzdk.json"
                                        trigger="hover"
                                        state="morph-roll-to-back"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                    <span className="hidden sm:block">Home</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            <Link
                                href="https://github.com/sj0110/url-shortner"
                                target="_blank"
                                className="flex items-center gap-2 sm:px-3 text-gray-900 rounded dark:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/sifiooif.json"
                                    trigger="hover"
                                    delay="1000"
                                    style={{ width: '40px', height: '40px' }}
                                />
                                <span className="hidden sm:block">GitHub</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
