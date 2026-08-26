import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * MathView - Renders LaTeX mathematical expressions safely using KaTeX
 * Props:
 * - math: string (pure LaTeX string or mixed text containing $...$ or $$...$$ or \(...\) or \[...\])
 * - block: boolean (force block rendering mode)
 * - className: string
 */
export const MathView = ({ math = '', block = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';

    // If pure LaTeX string without delimiters, render directly
    const hasDelimiters = math.includes('$') || math.includes('\\(') || math.includes('\\[');

    if (!hasDelimiters) {
      try {
        return katex.renderToString(math, {
          displayMode: block,
          throwOnError: false,
          strict: false
        });
      } catch (err) {
        console.error('KaTeX error:', err);
        return math;
      }
    }

    // Replace and render mixed text containing LaTeX delimiters
    try {
      // Step 1: Render display blocks $$ ... $$ and \[ ... \]
      let processed = math.replace(/\$\$([\s\S]*?)\$\$/g, (_, equation) => {
        return `<div class="katex-display-wrapper my-3 overflow-x-auto text-center">${katex.renderToString(equation.trim(), { displayMode: true, throwOnError: false })}</div>`;
      });
      processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, equation) => {
        return `<div class="katex-display-wrapper my-3 overflow-x-auto text-center">${katex.renderToString(equation.trim(), { displayMode: true, throwOnError: false })}</div>`;
      });

      // Step 2: Render inline math $ ... $ and \( ... \)
      processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, equation) => {
        return katex.renderToString(equation.trim(), { displayMode: false, throwOnError: false });
      });
      processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, equation) => {
        return katex.renderToString(equation.trim(), { displayMode: false, throwOnError: false });
      });

      return processed;
    } catch {
      return math;
    }
  }, [math, block]);

  const Tag = block ? 'div' : 'span';

  return (
    <Tag
      className={`katex-render-container ${block ? 'block my-2 text-center' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathView;
