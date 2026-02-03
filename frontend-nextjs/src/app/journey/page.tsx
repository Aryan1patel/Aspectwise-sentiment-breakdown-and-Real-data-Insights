'use client';

import { motion } from 'framer-motion';
import JourneySection from '@/components/JourneySection';
import Link from 'next/link';

export default function JourneyPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden bg-gradient-mesh">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors">
                            <span>←</span>
                            <span>Back to Home</span>
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                            Project <span className="gradient-text">Journey</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            A comprehensive walkthrough of building an Aspect-Based Sentiment Analysis system
                            from data exploration to production deployment
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-5xl py-16">

                {/* Step 1: Problem & Dataset */}
                <JourneySection
                    number="01"
                    title="Problem Statement & Dataset"
                    subtitle="Understanding the challenge and acquiring data"
                    icon="🎯"
                >
                    <div className="space-y-6">
                        <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                Traditional sentiment analysis treats reviews as a single unit, missing nuanced feedback.
                                A 5-star review might say "Great camera but terrible battery" - overall positive, but contains
                                critical negative feedback about battery life.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                <strong className="text-text-primary">Solution:</strong> Aspect-Based Sentiment Analysis (ABSA)
                                extracts sentiment for individual product features, revealing what users really think about
                                specific aspects like battery, camera, display, performance, build quality, and price.
                            </p>
                        </div>

                        <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Dataset</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-bg-dark rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">200K+</div>
                                    <div className="text-sm text-text-secondary">Mobile Phone Reviews</div>
                                </div>
                                <div className="p-4 bg-bg-dark rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">Amazon</div>
                                    <div className="text-sm text-text-secondary">Data Source</div>
                                </div>
                                <div className="p-4 bg-bg-dark rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">6</div>
                                    <div className="text-sm text-text-secondary">Product Aspects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 2: EDA */}
                <JourneySection
                    number="02"
                    title="Exploratory Data Analysis"
                    subtitle="Understanding patterns and distributions in the data"
                    icon="📊"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Analyzed 200,000+ mobile phone reviews to understand rating distributions, review lengths,
                            and common patterns. Key findings guided preprocessing and model design decisions.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-3">Key Findings</h4>
                                <ul className="space-y-2 text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Rating distribution skewed toward 4-5 stars (positive bias)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Average review length: 50-100 words</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>34.7% of high-rated reviews contain negative aspects</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Battery and price are most frequently criticized</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-3">Data Quality</h4>
                                <ul className="space-y-2 text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <span className="text-warning">⚠</span>
                                        <span>Some reviews contain HTML tags and special characters</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-warning">⚠</span>
                                        <span>Missing values in review text (~2%)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-warning">⚠</span>
                                        <span>Duplicate reviews need deduplication</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 3: Preprocessing */}
                <JourneySection
                    number="03"
                    title="Data Preprocessing"
                    subtitle="Cleaning and preparing text for analysis"
                    icon="🧹"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Implemented a robust text preprocessing pipeline to clean reviews, remove noise,
                            and standardize the data for downstream tasks.
                        </p>

                        <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                            <h4 className="text-lg font-bold mb-4">Preprocessing Steps</h4>
                            <ol className="space-y-3 text-text-secondary">
                                <li className="flex gap-3">
                                    <span className="font-bold text-primary">1.</span>
                                    <span><strong className="text-text-primary">Lowercase conversion</strong> - Standardize text case</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-primary">2.</span>
                                    <span><strong className="text-text-primary">HTML tag removal</strong> - Strip HTML entities and tags</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-primary">3.</span>
                                    <span><strong className="text-text-primary">Special character handling</strong> - Remove or normalize special chars</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-primary">4.</span>
                                    <span><strong className="text-text-primary">Whitespace normalization</strong> - Remove extra spaces</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-primary">5.</span>
                                    <span><strong className="text-text-primary">Missing value handling</strong> - Drop or impute missing reviews</span>
                                </li>
                            </ol>
                        </div>

                        <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                            <h4 className="text-lg font-bold mb-4">Data Transformation</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-semibold text-warning mb-2">❌ Before Cleaning</div>
                                    <div className="p-3 bg-bg-dark rounded text-xs font-mono text-text-secondary">
                                        "Great &lt;b&gt;CAMERA&lt;/b&gt; but TERRIBLE battery!!!"
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-success mb-2">✓ After Cleaning</div>
                                    <div className="p-3 bg-bg-dark rounded text-xs font-mono text-text-secondary">
                                        "great camera but terrible battery"
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-text-secondary mt-3">
                                <strong>Result:</strong> Removed 4,237 rows with missing/short reviews • Final: 195,763 rows
                            </p>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 4: Aspect Detection */}
                <JourneySection
                    number="04"
                    title="Aspect Detection Implementation"
                    subtitle="Identifying product features in reviews"
                    icon="🔍"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Developed a rule-based aspect detection system using keyword matching and sentence-level
                            analysis. This approach provides explainability and fast inference compared to deep learning models.
                        </p>

                        <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                            <h4 className="text-lg font-bold mb-4">Methodology</h4>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-text-primary mb-2">1. Sentence Segmentation</h5>
                                    <p className="text-text-secondary text-sm">
                                        Split reviews into individual sentences using punctuation markers (., !, ?)
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-text-primary mb-2">2. Clause Splitting</h5>
                                    <p className="text-text-secondary text-sm">
                                        Further split sentences on contrast words ("but", "however", "although") to handle
                                        mixed sentiments within a single sentence
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-text-primary mb-2">3. Keyword Matching</h5>
                                    <p className="text-text-secondary text-sm">
                                        Match clauses against predefined aspect dictionaries to identify mentioned features
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                            <p className="text-sm">
                                <strong className="text-success">Why rule-based?</strong> Provides explainability,
                                fast inference (&lt;100ms), and no training data required. Perfect for production deployment.
                            </p>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 5: Sentiment Model */}
                <JourneySection
                    number="05"
                    title="Sentiment Model Training"
                    subtitle="Building a fast, accurate sentiment classifier"
                    icon="🤖"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Trained a TF-IDF + Logistic Regression model for sentiment classification.
                            Chose this approach over deep learning for speed, explainability, and production readiness.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-3">Model Architecture</h4>
                                <ul className="space-y-2 text-text-secondary text-sm">
                                    <li><strong className="text-text-primary">Vectorization:</strong> TF-IDF (max 8000 features)</li>
                                    <li><strong className="text-text-primary">Classifier:</strong> Logistic Regression</li>
                                    <li><strong className="text-text-primary">Classes:</strong> Positive, Negative, Neutral</li>
                                    <li><strong className="text-text-primary">Training Size:</strong> ~1.2M samples</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-3">Performance</h4>
                                <ul className="space-y-2 text-text-secondary text-sm">
                                    <li><strong className="text-success">Overall Accuracy:</strong> 76%</li>
                                    <li><strong className="text-success">Positive Class:</strong> 96% precision</li>
                                    <li><strong className="text-warning">Negative Class:</strong> 57% precision</li>
                                    <li><strong className="text-success">Inference Time:</strong> &lt;100ms</li>
                                    <li><strong className="text-success">Model Size:</strong> 500KB</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                            <p className="text-sm">
                                <strong className="text-primary">Design Choice:</strong> TF-IDF + Logistic Regression
                                over BERT/Transformers for 100x faster inference, smaller model size (500KB vs 500MB),
                                and better explainability for production deployment.
                            </p>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 6: Business Analysis */}
                <JourneySection
                    number="06"
                    title="Business Insights & Analysis"
                    subtitle="Extracting actionable insights from ABSA results"
                    icon="📈"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Analyzed 200K+ reviews to uncover business insights that traditional sentiment analysis would miss.
                            These insights help product teams prioritize improvements and understand customer pain points.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <div className="text-4xl mb-2">📊</div>
                                <h4 className="font-bold mb-2">Aspect Distribution</h4>
                                <p className="text-sm text-text-secondary">
                                    Battery: 52.3% negative, Camera: 68.7% positive
                                </p>
                            </div>
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <div className="text-4xl mb-2">⚠️</div>
                                <h4 className="font-bold mb-2">Rating Mismatch</h4>
                                <p className="text-sm text-text-secondary">
                                    34.7% of 5-star reviews have negative aspects
                                </p>
                            </div>
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <div className="text-4xl mb-2">🔬</div>
                                <h4 className="font-bold mb-2">Root Causes</h4>
                                <p className="text-sm text-text-secondary">
                                    Top issues: "dead", "drain", "expensive"
                                </p>
                            </div>
                        </div>
                    </div>
                </JourneySection>

                {/* Step 7: Deployment */}
                <JourneySection
                    number="07"
                    title="Production Deployment"
                    subtitle="FastAPI backend + Next.js frontend + Hugging Face model"
                    icon="🚀"
                >
                    <div className="space-y-6">
                        <p className="text-text-secondary leading-relaxed">
                            Built a production-ready web application with FastAPI backend for ML inference,
                            Next.js frontend for interactive visualization, and deployed the model to Hugging Face.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-4">Backend (FastAPI)</h4>
                                <ul className="space-y-2 text-text-secondary text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>RESTful API with automatic docs</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Deployed on Render</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Response time: &lt;100ms</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-4">Frontend (Next.js)</h4>
                                <ul className="space-y-2 text-text-secondary text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>TypeScript for type safety</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Deployed on Vercel</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Framer Motion animations</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-bg-elevated rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-4">Model (Hugging Face)</h4>
                                <ul className="space-y-2 text-text-secondary text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Public model repository</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Complete inference pipeline</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success">✓</span>
                                        <span>Ready for integration</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="flex-1 bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all text-center"
                            >
                                Try Live Demo →
                            </Link>
                            <a
                                href="https://huggingface.co/DukeShadow/AspectLens-Aspectwise-sentiment-breakdown"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all text-center"
                            >
                                🤗 Use Model on HF
                            </a>
                        </div>
                    </div>
                </JourneySection>

                {/* Conclusion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 bg-gradient-primary rounded-2xl text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">Project Complete! 🎉</h2>
                    <p className="text-lg mb-6 opacity-90">
                        From raw data to production deployment, this project demonstrates the complete
                        ML engineering lifecycle with a focus on practical, explainable solutions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-white text-bg-dark rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                            Back to Home
                        </Link>
                        <a
                            href="https://github.com/Aryan1patel/Aspectwise-sentiment-breakdown-and-Real-data-Insights"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white/10 backdrop-blur rounded-xl font-semibold hover:bg-white/20 transition-all"
                        >
                            View on GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
