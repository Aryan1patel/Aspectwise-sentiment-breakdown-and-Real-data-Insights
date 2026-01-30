'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export default function CodeBlock({ code, language = 'python', filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-xl overflow-hidden border border-white/10 bg-bg-dark">
            {filename && (
                <div className="px-4 py-2 bg-bg-elevated border-b border-white/10 flex justify-between items-center">
                    <span className="text-sm text-text-secondary font-mono">{filename}</span>
                    <button
                        onClick={handleCopy}
                        className="text-xs px-3 py-1 bg-bg-dark hover:bg-bg-card rounded-lg transition-colors"
                    >
                        {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                </div>
            )}
            <div className="relative">
                {!filename && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-xs px-3 py-1 bg-bg-elevated hover:bg-bg-card rounded-lg transition-colors z-10"
                    >
                        {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                )}
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                    }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
