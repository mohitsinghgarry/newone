'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/types/link';
import { formatDateIST } from '@/lib/dateUtils';

export default function Dashboard() {
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [targetUrl, setTargetUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        fetchLinks();
    }, []);

    // Keyboard shortcuts for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
            // Escape to clear search
            if (e.key === 'Escape' && searchTerm) {
                setSearchTerm('');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchTerm]);

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/links');
            if (response.ok) {
                const data = await response.json();
                setLinks(data);
            } else {
                setError('Failed to fetch links');
            }
        } catch (err) {
            setError('Failed to fetch links');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError('');
        setSuccess('');

        try {
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target_url: targetUrl,
                    code: customCode || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`Link created successfully!`);
                setTargetUrl('');
                setCustomCode('');
                fetchLinks();
            } else {
                setFormError(data.error || 'Failed to create link');
            }
        } catch (err) {
            setFormError('Failed to create link');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (code: string) => {
        if (!confirm('Are you sure you want to delete this link?')) return;

        try {
            const response = await fetch(`/api/links/${code}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSuccess('Link deleted successfully');
                fetchLinks();
            } else {
                setError('Failed to delete link');
            }
        } catch (err) {
            setError('Failed to delete link');
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setSuccess('Copied to clipboard!');
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    };

    const filteredLinks = links.filter(link =>
        link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.target_url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to highlight search terms
    const highlightSearchTerm = (text: string, searchTerm: string) => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
                    {part}
                </mark>
            ) : part
        );
    };

    const truncateUrl = (url: string, maxLength: number = 60) => {
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
    };

    const formatDate = (dateString: string | null) => {
        return formatDateIST(dateString, { includeTime: true, format: 'medium' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-display mb-4">Shorten your links</h1>
                <p className="text-body max-w-2xl mx-auto">
                    Create short, memorable links and track their performance with detailed analytics.
                    Perfect for social media, marketing campaigns, and sharing.
                </p>
            </div>

            {/* Status Messages */}
            {success && (
                <div className="mb-6 fade-in">
                    <div className="alert alert-success">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{success}</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-6 fade-in">
                    <div className="alert alert-error">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Create Link Form */}
            <div className="card card-elevated mb-8 fade-in">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-title">Create new link</h2>
                        <p className="text-caption">Transform long URLs into short, shareable links</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <label htmlFor="targetUrl" className="input-label">
                                Destination URL *
                            </label>
                            <div className="input-group">
                                <input
                                    type="url"
                                    id="targetUrl"
                                    value={targetUrl}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                                    className="input"
                                    required
                                    disabled={submitting}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="customCode" className="input-label">
                                Custom alias (optional)
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="customCode"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value)}
                                    placeholder="my-link"
                                    pattern="[A-Za-z0-9]{6,8}"
                                    className="input"
                                    disabled={submitting}
                                />
                            </div>
                            <p className="text-caption mt-1">
                                6-8 characters, letters and numbers only
                            </p>
                        </div>
                    </div>

                    {formError && (
                        <div className="alert alert-error">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{formError}</span>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting || !targetUrl}
                            className="btn btn-primary"
                        >
                            {submitting ? (
                                <>
                                    <div className="spinner w-4 h-4 mr-2"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Shorten URL
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Links Management */}
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="flex-shrink-0">
                        <h2 className="text-title">Your links</h2>
                        <p className="text-caption">Manage and track your shortened URLs</p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="relative flex-1 sm:flex-initial">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by code or URL..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64 md:w-72 lg:w-80 pl-9 sm:pl-10 pr-16 sm:pr-20 py-2.5 text-sm border-2 border-gray-200 rounded-xl bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            />

                            {/* Keyboard shortcut indicator */}
                            {!searchTerm && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-400">
                                        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                                            ⌘K
                                        </kbd>
                                    </div>
                                </div>
                            )}
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Search Results Counter */}
                        {searchTerm && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="hidden sm:inline">Found:</span>
                                <span className="font-medium text-blue-600">
                                    {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="table-container">
                        <div className="p-8 text-center">
                            <div className="spinner w-8 h-8 mx-auto mb-4"></div>
                            <p className="text-caption">Loading your links...</p>
                        </div>
                    </div>
                ) : filteredLinks.length === 0 ? (
                    <div className="table-container">
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {searchTerm ? (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-title mb-2">
                                {searchTerm ? 'No matching links found' : 'No links yet'}
                            </h3>
                            <p className="text-caption mb-6 max-w-md mx-auto">
                                {searchTerm
                                    ? `No links match "${searchTerm}". Try searching by link code or destination URL.`
                                    : 'Create your first short link to get started with URL shortening and analytics.'
                                }
                            </p>
                            {searchTerm ? (
                                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="btn btn-secondary"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear search
                                    </button>
                                    <button
                                        onClick={() => document.getElementById('targetUrl')?.focus()}
                                        className="btn btn-primary"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create new link
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => document.getElementById('targetUrl')?.focus()}
                                    className="btn btn-primary"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create your first link
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="table-container fade-in">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Short link</th>
                                        <th>Destination</th>
                                        <th>Clicks</th>
                                        <th>Last clicked</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLinks.map((link) => (
                                        <tr key={link.id} className="group">
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="chip chip-primary">
                                                        {highlightSearchTerm(link.code, searchTerm)}
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(`${window.location.origin}/${link.code}`)}
                                                        className="btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Copy short URL"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    href={link.target_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                                    title={link.target_url}
                                                >
                                                    {highlightSearchTerm(truncateUrl(link.target_url), searchTerm)}
                                                </a>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">{link.total_clicks}</span>
                                                    {link.total_clicks > 0 && (
                                                        <div className="chip chip-success">
                                                            Active
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-caption">
                                                    {formatDate(link.last_clicked)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <a
                                                        href={`/code/${link.code}`}
                                                        className="btn-ghost"
                                                        title="View analytics"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(link.code)}
                                                        className="btn-ghost text-red-600 hover:bg-red-50"
                                                        title="Delete link"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}