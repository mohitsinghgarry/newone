'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/types/link';
import { useParams } from 'next/navigation';
import { formatDateIST } from '@/lib/dateUtils';

export default function StatsPage() {
    const params = useParams();
    const code = params.code as string;

    const [link, setLink] = useState<Link | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (code) {
            fetchLinkStats();
        }
    }, [code]);

    const fetchLinkStats = async () => {
        try {
            const response = await fetch(`/api/links/${code}`);

            if (response.ok) {
                const data = await response.json();
                setLink(data);
            } else if (response.status === 404) {
                setError('Link not found');
            } else {
                setError('Failed to fetch link stats');
            }
        } catch (err) {
            setError('Failed to fetch link stats');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard');
        }
    };

    const formatDate = (dateString: string | null) => {
        return formatDateIST(dateString, { includeTime: true, format: 'long' });
    };

    const formatDateShort = (dateString: string) => {
        return formatDateIST(dateString, { includeTime: false, format: 'short' });
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    <div className="loading h-8 w-48 rounded"></div>
                    <div className="card">
                        <div className="space-y-4">
                            <div className="loading h-6 w-32 rounded"></div>
                            <div className="loading h-4 w-full rounded"></div>
                            <div className="loading h-4 w-3/4 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !link) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="card">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-headline mb-4">Link Not Found</h1>
                        <p className="text-body mb-8">
                            The link you're looking for doesn't exist or may have been deleted.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="/" className="btn btn-primary">
                                Back to Dashboard
                            </a>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-secondary"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const shortUrl = `${window.location.origin}/${link.code}`;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Navigation */}
            <div className="mb-8">
                <nav className="flex items-center space-x-2 text-sm">
                    <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Dashboard
                    </a>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Analytics</span>
                </nav>
            </div>

            {/* Header */}
            <div className="text-center mb-12 fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h1 className="text-display mb-4">Link Analytics</h1>
                <p className="text-body">
                    Detailed performance metrics for your short link
                </p>
            </div>

            {/* Short URL Display */}
            <div className="card card-elevated mb-8 fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-title">Short URL</h2>
                    <div className="chip chip-primary">
                        {link.code}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                            <p className="text-caption mb-1">Your short link</p>
                            <p className="font-mono text-lg text-gray-900 break-all">
                                {shortUrl}
                            </p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(shortUrl)}
                            className={`btn ${copied ? 'btn-secondary' : 'btn-primary'} transition-all`}
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-caption mb-1">Destination URL</p>
                    <a
                        href={link.target_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all"
                    >
                        {link.target_url}
                    </a>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card fade-in">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{link.total_clicks}</p>
                            <p className="text-caption">Total Clicks</p>
                        </div>
                    </div>
                </div>

                <div className="card fade-in">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                {link.last_clicked ? formatDateShort(link.last_clicked) : 'Never'}
                            </p>
                            <p className="text-caption">Last Clicked</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Information */}
            <div className="card fade-in mb-8">
                <h3 className="text-title mb-6">Link Details</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-caption mb-1">Created</p>
                            <p className="text-body">{formatDate(link.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-caption mb-1">Last Activity</p>
                            <p className="text-body">{formatDate(link.last_clicked)}</p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-caption mb-1">Status</p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-body">Active</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-caption mb-1">Performance</p>
                                <div className="chip chip-success">
                                    {link.total_clicks > 0 ? 'Getting clicks' : 'Ready to share'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 fade-in">
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Test Link
                </a>
                <a href="/" className="btn btn-secondary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </a>
            </div>

            {/* Future Features Teaser */}
            <div className="mt-12 text-center">
                <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-title mb-2">More insights coming soon</h3>
                    <p className="text-caption">
                        Geographic data, referrer tracking, and detailed click analytics are in development
                    </p>
                </div>
            </div>
        </div>
    );
}