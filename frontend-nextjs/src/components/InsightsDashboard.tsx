'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { api, type AspectDistribution, type RatingMismatch, type RootCauses } from '@/lib/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const aspectEmojis: Record<string, string> = {
    battery: '🔋',
    camera: '📷',
    display: '📱',
    performance: '⚡',
    build: '🏗️',
    price: '💰',
};

export default function InsightsDashboard() {
    const [distribution, setDistribution] = useState<AspectDistribution[]>([]);
    const [mismatch, setMismatch] = useState<RatingMismatch | null>(null);
    const [rootCauses, setRootCauses] = useState<RootCauses>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadInsights();
    }, []);

    const loadInsights = async () => {
        try {
            const [dist, mis, causes] = await Promise.all([
                api.getAspectDistribution(),
                api.getRatingMismatch(),
                api.getRootCauses(),
            ]);
            setDistribution(dist);
            setMismatch(mis);
            setRootCauses(causes);
        } catch (err) {
            setError('Failed to load insights data. Make sure the backend API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const distributionChartData = {
        labels: distribution.map(d => d.aspect),
        datasets: [
            {
                label: 'Positive',
                data: distribution.map(d => d.positive || 0),
                backgroundColor: 'hsla(145, 70%, 55%, 0.8)',
                borderColor: 'hsl(145, 70%, 55%)',
                borderWidth: 1,
            },
            {
                label: 'Negative',
                data: distribution.map(d => d.negative || 0),
                backgroundColor: 'hsla(0, 75%, 60%, 0.8)',
                borderColor: 'hsl(0, 75%, 60%)',
                borderWidth: 1,
            },
            {
                label: 'Neutral',
                data: distribution.map(d => d.neutral || 0),
                backgroundColor: 'hsla(0, 0%, 50%, 0.8)',
                borderColor: 'hsl(0, 0%, 50%)',
                borderWidth: 1,
            },
        ],
    };

    const mismatchChartData = mismatch ? {
        labels: mismatch.top_aspects.map(a => a.aspect || a.index || ''),
        datasets: [{
            label: 'Negative Mentions in High-Rated Reviews',
            data: mismatch.top_aspects.map(a => a.count),
            backgroundColor: 'hsla(0, 75%, 60%, 0.8)',
            borderColor: 'hsl(0, 75%, 60%)',
            borderWidth: 1,
        }],
    } : null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'hsl(0, 0%, 98%)',
                    font: { size: 14, family: 'Inter' },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: { color: 'hsl(0, 0%, 70%)' },
                grid: { color: 'hsla(0, 0%, 100%, 0.05)' },
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'hsl(0, 0%, 70%)',
                    callback: (value: any) => value + '%',
                },
                grid: { color: 'hsla(0, 0%, 100%, 0.05)' },
            },
        },
    };

    const mismatchChartOptions = {
        ...chartOptions,
        indexAxis: 'y' as const,
        scales: {
            x: {
                ticks: { color: 'hsl(0, 0%, 70%)' },
                grid: { color: 'hsla(0, 0%, 100%, 0.05)' },
            },
            y: {
                ticks: { color: 'hsl(0, 0%, 70%)' },
                grid: { color: 'hsla(0, 0%, 100%, 0.05)' },
            },
        },
    };

    if (loading) {
        return (
            <section id="insights" className="py-16 md:py-24 bg-bg-card">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center">
                        <div className="text-5xl mb-4">📊</div>
                        <p className="text-text-muted">Loading insights...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="insights" className="py-16 md:py-24 bg-bg-card">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center">
                        <div className="text-5xl mb-4">⚠️</div>
                        <p className="text-error">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="insights" className="py-16 md:py-24 bg-bg-card">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Business Insights Dashboard</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Data-driven insights from analyzing thousands of mobile phone reviews
                    </p>
                </div>

                {/* Aspect Distribution */}
                <div className="bg-bg-elevated border border-white/10 rounded-2xl p-8 mb-8">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                            <span className="text-3xl">📊</span>
                            Aspect Sentiment Distribution
                        </h3>
                        <p className="text-text-secondary">Which features are praised or criticized?</p>
                    </div>
                    <div className="h-96">
                        <Bar data={distributionChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Rating Mismatch */}
                {mismatch && mismatchChartData && (
                    <div className="bg-bg-elevated border border-white/10 rounded-2xl p-8 mb-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                                <span className="text-3xl">⚠️</span>
                                Rating vs Aspect Sentiment Mismatch
                            </h3>
                            <p className="text-text-secondary">High-rated reviews with negative aspects</p>
                        </div>
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold gradient-text">{mismatch.mismatch_percentage}%</div>
                            <div className="text-text-secondary mt-2">High-rated reviews with negative aspects</div>
                        </div>
                        <div className="h-80">
                            <Bar data={mismatchChartData} options={mismatchChartOptions} />
                        </div>
                    </div>
                )}

                {/* Root Causes */}
                <div className="bg-bg-elevated border border-white/10 rounded-2xl p-8">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                            <span className="text-3xl">🔬</span>
                            Root Cause Analysis
                        </h3>
                        <p className="text-text-secondary">Why are users unhappy with specific aspects?</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(rootCauses).map(([aspect, keywords]) => (
                            <div key={aspect} className="p-6 bg-bg-dark rounded-xl border border-white/10">
                                <h4 className="text-xl font-bold mb-4 capitalize flex items-center gap-2">
                                    <span className="text-2xl">{aspectEmojis[aspect.toLowerCase()] || '📊'}</span>
                                    {aspect}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {keywords.map(([word, count]) => (
                                        <div
                                            key={word}
                                            className="px-3 py-1.5 bg-bg-elevated border border-white/10 rounded-lg text-sm flex items-center gap-2"
                                        >
                                            <span className="font-semibold">{word}</span>
                                            <span className="text-text-muted text-xs">({count})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
