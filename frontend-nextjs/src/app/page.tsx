'use client';

import { motion } from 'framer-motion';
import LiveDemo from '@/components/LiveDemo';
import InsightsDashboard from '@/components/InsightsDashboard';

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">✦</span>
              <span>AspectsLens - ABSA Insights</span>
            </div>
            <ul className="hidden md:flex gap-8">
              {['Home', 'Demo', 'Insights', 'About', 'Journey'].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Journey' ? '/journey' : `#${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-text-primary transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 -z-10" />
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-white/10 rounded-full text-sm font-medium mb-6">
              <span className="text-lg">✨</span>
              <span>Aspect-Based Sentiment Analysis</span>
            </div>

            <h1 className="text-3xl md:text-7xl font-extrabold mb-6 leading-tight">
              Uncovering Product Insights
              <br />
              <span className="gradient-text">hidden behind star ratings</span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 max-w-3xl">
              Traditional sentiment analysis collapses multiple opinions into one label.
              Our ABSA system preserves feature-level feedback, revealing what users
              <em className="text-text-primary"> really</em> think about battery, camera, price, and more.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="#demo"
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all inline-flex items-center gap-2"
              >
                <span>Try Live Demo</span>
                <span>→</span>
              </a>

              <a
                href="https://huggingface.co/DukeShadow/AspectLens-Aspectwise-sentiment-breakdown"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-semibold text-white bg-white/5 border border-white/30 shadow-lg shadow-white/10 hover:bg-white/12 hover:border-white/40 hover:shadow-xl hover:shadow-white/20 transition-all inline-flex items-center gap-2"
              >
                <span>🤗</span>
                <span>Use Model on HF</span>
                <span className="opacity-70">→</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#insights"
                className="px-6 py-3 bg-bg-elevated border border-white/10 rounded-xl font-medium text-sm hover:bg-bg-card hover:border-white/20 transition-all"
              >
                View Insights On Amazon Product Reviews
              </a>
            </div>



            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl">
              {[
                { value: '6', label: 'Aspects Analyzed' },
                { value: '90%', label: 'Model Accuracy' },
                { value: '<100ms', label: 'API Response' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-bg-elevated border border-white/10 rounded-xl hover:border-white/20 transition-all"
                >
                  <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-24 bg-bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-bg-elevated border border-white/10 rounded-2xl hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⭐</span>
                <h3 className="text-2xl font-bold">Traditional Analysis</h3>
              </div>
              <div className="p-4 bg-bg-dark rounded-xl mb-4">
                <p className="text-text-secondary italic mb-2">
                  "Great phone overall, but the battery dies in hours."
                </p>
                <div className="text-xl">⭐⭐⭐⭐</div>
              </div>
              <div className="p-4 border border-white/10 rounded-xl">
                <div className="text-sm text-text-muted mb-1">Overall Sentiment</div>
                <div className="text-xl font-bold mb-2">✅ Positive</div>
                <p className="text-sm text-text-secondary">Misses critical battery issue</p>
              </div>
            </motion.div>

            {/* ABSA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-bg-elevated border border-white/10 rounded-2xl hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-2xl font-bold">ABSA Analysis</h3>
              </div>
              <div className="p-4 bg-bg-dark rounded-xl mb-4">
                <p className="text-text-secondary italic mb-2">
                  "Great phone overall, but the battery dies in hours."
                </p>
                <div className="text-xl">⭐⭐⭐⭐</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-success/10 border border-success/30 rounded-lg">
                  <span className="font-semibold">Overall</span>
                  <span className="text-success">✅ Positive</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-error/10 border border-error/30 rounded-lg">
                  <span className="font-semibold">Battery</span>
                  <span className="text-error">❌ Negative</span>
                </div>
                <p className="text-sm text-text-secondary mt-2">Captures nuanced feedback</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <LiveDemo />

      {/* Insights Dashboard */}
      <InsightsDashboard />

      {/* Methodology */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Methodology</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              How we built an explainable, production-ready ABSA system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                number: '01',
                title: 'Sentence Segmentation',
                description: 'Split reviews into individual sentences and clauses, handling contrast words like "but" and "however"',
              },
              {
                number: '02',
                title: 'Aspect Detection',
                description: 'Rule-based keyword matching to identify product aspects: battery, camera, display, performance, build, price',
              },
              {
                number: '03',
                title: 'Sentiment Classification',
                description: 'TF-IDF vectorization + Logistic Regression for fast, explainable sentiment prediction per aspect',
              },
              {
                number: '04',
                title: 'Confidence Aggregation',
                description: 'Select highest-confidence sentiment per aspect when multiple mentions exist',
              },
            ].map((method, index) => (
              <motion.div
                key={method.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-bg-elevated border border-white/10 rounded-2xl hover:border-white/20 hover:-translate-y-1 transition-all"
              >
                <div className="text-5xl font-extrabold gradient-text mb-3">{method.number}</div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{method.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="p-8 bg-bg-elevated border border-white/10 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: '🐍', name: 'Python' },
                { icon: '🔬', name: 'Scikit-learn' },
                { icon: '⚡', name: 'FastAPI' },
                { icon: '📊', name: 'Pandas' },
                { icon: '⚛️', name: 'Next.js' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-4 bg-bg-dark rounded-xl hover:bg-bg-card transition-all"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Choices */}
          <div className="p-8 bg-bg-elevated border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Key Design Choices</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '❌', text: 'No BERT / Transformers', negative: true },
                { icon: '✅', text: 'Explainable ML' },
                { icon: '✅', text: 'Fast Inference' },
                { icon: '✅', text: 'Production-Ready' },
              ].map((choice) => (
                <div
                  key={choice.text}
                  className="flex items-center gap-3 p-4 bg-bg-dark rounded-xl"
                >
                  <span className={`text-2xl ${choice.negative ? 'text-error' : 'text-success'}`}>
                    {choice.icon}
                  </span>
                  <span>{choice.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-card border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 text-xl font-bold mb-2">
            <span className="text-2xl">📊</span>
            <span>ABSA Insights</span>
          </div>
          <p className="text-text-secondary">
            Revealing actionable product insights hidden behind star ratings
          </p>
        </div>
      </footer>
    </main>
  );
}
