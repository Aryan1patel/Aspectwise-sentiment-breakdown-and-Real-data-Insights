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

          {/* Tech Stack
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
          </div> */}

          {/* Design Choices */}


        </div>


      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-card border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Project Info */}
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <span className="text-2xl">✦</span>
                <span>AspectLens</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Aspect-Based Sentiment Analysis system for extracting feature-level insights from product reviews.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a href="#demo" className="hover:text-text-primary transition-colors">Live Demo</a>
                </li>
                <li>
                  <a href="#insights" className="hover:text-text-primary transition-colors">Insights</a>
                </li>
                <li>
                  <a href="/journey" className="hover:text-text-primary transition-colors">Project Journey</a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/aryan-patel-b9a5a7259/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-bg-elevated border border-white/10 rounded-lg hover:bg-bg-card hover:border-white/20 transition-all group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-text-secondary group-hover:text-[#0077B5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Aryan1patel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-bg-elevated border border-white/10 rounded-lg hover:bg-bg-card hover:border-white/20 transition-all group"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://huggingface.co/DukeShadow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-bg-elevated border border-white/10 rounded-lg hover:bg-bg-card hover:border-white/20 transition-all group"
                  aria-label="Hugging Face"
                >
                  <svg className="w-5 h-5 text-text-secondary group-hover:text-[#FFD21E] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6zM8.4 8.4c-.663 0-1.2.537-1.2 1.2s.537 1.2 1.2 1.2 1.2-.537 1.2-1.2-.537-1.2-1.2-1.2zm7.2 0c-.663 0-1.2.537-1.2 1.2s.537 1.2 1.2 1.2 1.2-.537 1.2-1.2-.537-1.2-1.2-1.2zM12 13.2c-2.21 0-4.032 1.558-4.464 3.636.828.552 1.824.864 2.904.864s2.076-.312 2.904-.864C12.912 14.758 11.09 13.2 12 13.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
            <p>© 2026 AspectLens. Built with FastAPI, Next.js & scikit-learn.</p>
            <div className="flex gap-6">
              <a href="https://github.com/Aryan1patel/Aspectwise-sentiment-breakdown-and-Real-data-Insights" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                View Source
              </a>
              <a href="https://huggingface.co/DukeShadow/AspectLens-Aspectwise-sentiment-breakdown" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                Model on HF
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
