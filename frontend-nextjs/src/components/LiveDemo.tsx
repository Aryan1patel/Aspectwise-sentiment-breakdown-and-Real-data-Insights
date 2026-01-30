'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { api, exampleReviews, type ABSAResult } from '@/lib/api';

export default function LiveDemo() {
    const [review, setReview] = useState('');
    const [results, setResults] = useState<ABSAResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoadExample = () => {
        const randomReview = exampleReviews[Math.floor(Math.random() * exampleReviews.length)];
        setReview(randomReview);
        setError('');
    };

    const handleAnalyze = async () => {
        if (!review.trim()) {
            setError('Please enter a review to analyze');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await api.analyzeReview(review);
            setResults(data);
        } catch (err) {
            setError('Failed to analyze review. Make sure the backend API is running on port 8000.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'border-success bg-success/10 text-success';
            case 'negative': return 'border-error bg-error/10 text-error';
            default: return 'border-text-muted bg-text-muted/10 text-text-muted';
        }
    };

    const getSentimentEmoji = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return '✅';
            case 'negative': return '❌';
            default: return '➖';
        }
    };

    return (
        <section id="demo" className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Live ABSA Demo</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Enter a product review and watch our system extract aspect-level sentiments in real-time
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Area */}
                    <div className="flex flex-col">
                        <label htmlFor="review-input" className="font-semibold mb-3 text-text-primary">
                            Product Review
                        </label>
                        <textarea
                            id="review-input"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-4 bg-bg-elevated border border-white/10 rounded-xl text-text-primary resize-vertical min-h-[200px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="Example: The camera quality is amazing and takes stunning photos. However, the battery life is disappointing and drains too quickly. The price is reasonable for what you get."
                            rows={6}
                        />
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="flex-1 bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <span>Analyze Review</span>
                                )}
                            </button>
                            <button
                                onClick={handleLoadExample}
                                className="px-6 py-3 bg-bg-elevated border border-white/10 rounded-xl font-semibold hover:bg-bg-card hover:border-white/20 transition-all"
                            >
                                Load Example
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="p-6 bg-bg-elevated border border-white/10 rounded-xl min-h-[300px]">
                        {error && (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="text-5xl mb-4">⚠️</div>
                                <p className="text-error">{error}</p>
                            </div>
                        )}

                        {!results && !error && (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="text-5xl mb-4 opacity-50">🔍</div>
                                <p className="text-text-muted">Enter a review above to see aspect-based sentiment analysis</p>
                            </div>
                        )}

                        {results && Object.keys(results).length === 0 && !error && (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="text-5xl mb-4">🤔</div>
                                <p className="text-text-muted">
                                    No aspects detected in this review. Try mentioning specific features like battery, camera, display, performance, build, or price.
                                </p>
                            </div>
                        )}

                        {results && Object.keys(results).length > 0 && (
                            <div className="space-y-4">
                                {Object.entries(results).map(([aspect, details], index) => (
                                    <motion.div
                                        key={aspect}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 bg-bg-dark rounded-lg border-l-4 ${getSentimentColor(details.sentiment)}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-lg capitalize">{aspect}</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSentimentColor(details.sentiment)}`}>
                                                {getSentimentEmoji(details.sentiment)} {details.sentiment}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-sm text-text-secondary mb-1">
                                                Confidence: {(details.confidence * 100).toFixed(1)}%
                                            </div>
                                            <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                                                    style={{ width: `${details.confidence * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm text-text-secondary italic p-2 bg-bg-card rounded">
                                            "{details.sentence}"
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
