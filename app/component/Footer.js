import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const date = new Date(Date.now());
    const year = date.getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 sticky bottom-0 w-full">
            <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between text-center">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    © {year}{" "}
                    <Link href="/shorten-url" className="hover:text-blue-500">
                        URL Shortener™
                    </Link>{" "}
                    | All Rights Reserved.
                </span>
                <ul className="md:flex-wrap md:items-center md:justify-center mt-3 md:mt-0 space-x-4 hidden md:flex">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:text-blue-500"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/dznelzdk.json"
                                trigger="hover"
                                state="morph-roll-to-back"
                                style={{ width: "25px", height: "25px" }}
                            />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://github.com/sj0110/url-shortner"
                            target="_blank"
                            className="flex items-center gap-2 hover:text-green-500"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/sifiooif.json"
                                trigger="hover"
                                delay="1000"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span>GitHub</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};


export default Footer
