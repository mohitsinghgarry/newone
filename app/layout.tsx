import './globals.css'

export const metadata = {
    title: 'TinyLink - URL Shortener',
    description: 'Create short links and track analytics with enterprise-grade reliability',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-14 sm:h-16">
                                <div className="flex items-center min-w-0 flex-1">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <h1 className="text-lg sm:text-xl font-medium text-gray-900 truncate">TinyLink</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* Desktop Navigation */}
                                    <nav className="hidden md:flex items-center space-x-1">
                                        <a href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                                            Dashboard
                                        </a>
                                        <a href="/healthz" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                                            Status
                                        </a>
                                    </nav>

                                    {/* Mobile Menu Button */}
                                    <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Menu">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 bg-gray-50">
                        {children}
                    </main>

                    <footer className="bg-white border-t border-gray-200 mt-auto">
                        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                            {/* Mobile Layout (< 640px) */}
                            <div className="sm:hidden py-4 space-y-3">
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 mb-2">
                                        <span>&copy; 2025 TinyLink</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-3">
                                        Built with Next.js & TypeScript
                                    </div>
                                </div>
                                <div className="flex justify-center items-center space-x-4 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                    <a href="#" className="hover:text-gray-900 transition-colors py-1">Privacy</a>
                                    <span className="text-gray-300">•</span>
                                    <a href="#" className="hover:text-gray-900 transition-colors py-1">Terms</a>
                                    <span className="text-gray-300">•</span>
                                    <a href="#" className="hover:text-gray-900 transition-colors py-1">Support</a>
                                </div>
                            </div>

                            {/* Tablet Layout (640px - 768px) */}
                            <div className="hidden sm:block md:hidden py-5">
                                <div className="text-center space-y-3">
                                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
                                        <span>&copy; 2025 TinyLink</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="hidden xs:inline">Built with Next.js & TypeScript</span>
                                        <span className="xs:hidden">Built with Next.js</span>
                                    </div>
                                    <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout (≥ 768px) */}
                            <div className="hidden md:block py-6">
                                <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <span>&copy; 2025 TinyLink</span>
                                        </div>
                                        <span className="hidden sm:inline text-gray-300">•</span>
                                        <span className="text-center sm:text-left">Built with Next.js & TypeScript</span>
                                    </div>
                                    <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                        <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">Privacy Policy</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">Terms of Service</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">Support</a>
                                    </div>
                                </div>
                            </div>

                            {/* Extra Large Layout (≥ 1280px) */}
                            <div className="hidden xl:block py-8">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded opacity-80">
                                                <svg className="w-4 h-4 text-white m-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">TinyLink</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span>&copy; 2025</span>
                                            <span className="text-gray-300">•</span>
                                            <span>Built with Next.js & TypeScript</span>
                                            <span className="text-gray-300">•</span>
                                            <span>Enterprise-grade URL shortening</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-8 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2 text-xs text-gray-500 border-r border-gray-200 pr-6">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>IST</span>
                                        </div>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Support Center</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}