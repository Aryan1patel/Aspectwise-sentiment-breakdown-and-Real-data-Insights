'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface JourneySectionProps {
    number: string;
    title: string;
    subtitle: string;
    icon: string;
    children: ReactNode;
}

export default function JourneySection({ number, title, subtitle, icon, children }: JourneySectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-24"
        >
            <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl">
                        {icon}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-primary mb-2">STEP {number}</div>
                    <h2 className="text-4xl font-bold mb-2">{title}</h2>
                    <p className="text-text-secondary text-lg">{subtitle}</p>
                </div>
            </div>
            <div className="pl-22">
                {children}
            </div>
        </motion.section>
    );
}
