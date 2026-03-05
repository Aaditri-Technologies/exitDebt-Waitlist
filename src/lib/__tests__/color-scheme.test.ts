import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const SRC_DIR = resolve(__dirname, '../../');

/**
 * Recursively collect all source files matching given extensions.
 */
function collectFiles(dir: string, extensions: string[]): string[] {
    const results: string[] = [];
    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            if (entry === 'node_modules' || entry === '__tests__') continue;
            results.push(...collectFiles(fullPath, extensions));
        } else if (extensions.some((ext) => fullPath.endsWith(ext))) {
            results.push(fullPath);
        }
    }
    return results;
}

describe('Color scheme consistency — no purple references', () => {
    const sourceFiles = collectFiles(SRC_DIR, ['.tsx', '.ts', '.css']);

    const PURPLE_PATTERNS = [
        /--color-purple/,
        /#7300BE/i,
        /#9333EA/i,
        /rgba\(\s*115\s*,\s*0\s*,\s*190/,
        /color-purple/,
    ];

    // Tailwind purple utility classes (e.g. text-purple-700, bg-purple-500)
    const TAILWIND_PURPLE = /(?:text|bg|border|ring|shadow)-purple-\d+/;

    it('contains no --color-purple CSS variable references', () => {
        const violations: { file: string; line: number; content: string }[] = [];

        for (const file of sourceFiles) {
            const content = readFileSync(file, 'utf-8');
            const lines = content.split('\n');
            lines.forEach((lineContent, idx) => {
                for (const pattern of PURPLE_PATTERNS) {
                    if (pattern.test(lineContent)) {
                        violations.push({
                            file: file.replace(SRC_DIR, 'src'),
                            line: idx + 1,
                            content: lineContent.trim(),
                        });
                    }
                }
            });
        }

        expect(violations).toEqual([]);
    });

    it('contains no Tailwind purple utility classes', () => {
        const violations: { file: string; line: number; content: string }[] = [];

        for (const file of sourceFiles) {
            const content = readFileSync(file, 'utf-8');
            const lines = content.split('\n');
            lines.forEach((lineContent, idx) => {
                if (TAILWIND_PURPLE.test(lineContent)) {
                    violations.push({
                        file: file.replace(SRC_DIR, 'src'),
                        line: idx + 1,
                        content: lineContent.trim(),
                    });
                }
            });
        }

        expect(violations).toEqual([]);
    });

    it('globals.css defines --color-teal variable', () => {
        const cssPath = join(SRC_DIR, 'app', 'globals.css');
        const content = readFileSync(cssPath, 'utf-8');
        expect(content).toContain('--color-teal');
    });

    it('globals.css defines --color-teal-light variable', () => {
        const cssPath = join(SRC_DIR, 'app', 'globals.css');
        const content = readFileSync(cssPath, 'utf-8');
        expect(content).toContain('--color-teal-light');
    });

    it('globals.css uses teal for border focus', () => {
        const cssPath = join(SRC_DIR, 'app', 'globals.css');
        const content = readFileSync(cssPath, 'utf-8');
        expect(content).toMatch(/--color-border-focus:\s*rgb\(19,\s*78,\s*74\)/);
    });

    it('globals.css uses teal for form input focus styles', () => {
        const cssPath = join(SRC_DIR, 'app', 'globals.css');
        const content = readFileSync(cssPath, 'utf-8');
        expect(content).toContain('border-color: var(--color-teal)');
    });

    it('globals.css uses teal for waitlist button', () => {
        const cssPath = join(SRC_DIR, 'app', 'globals.css');
        const content = readFileSync(cssPath, 'utf-8');
        expect(content).toContain('background: var(--color-teal)');
    });
});

describe('Component color references', () => {
    const componentDir = join(SRC_DIR, 'components');
    const componentFiles = collectFiles(componentDir, ['.tsx']);

    it('Navbar uses teal for logo and CTA button', () => {
        const content = readFileSync(join(componentDir, 'Navbar.tsx'), 'utf-8');
        const tealRefs = (content.match(/var\(--color-teal\)/g) || []).length;
        expect(tealRefs).toBeGreaterThanOrEqual(2);
    });

    it('Footer uses teal for logo background', () => {
        const content = readFileSync(join(componentDir, 'Footer.tsx'), 'utf-8');
        expect(content).toContain('var(--color-teal)');
    });

    it('CookieConsent uses teal for accept button', () => {
        const content = readFileSync(join(componentDir, 'CookieConsent.tsx'), 'utf-8');
        expect(content).toContain('var(--color-teal)');
    });

    it('all components reference teal instead of purple', () => {
        for (const file of componentFiles) {
            const content = readFileSync(file, 'utf-8');
            // file path available via `file` variable if needed for debugging
            expect(content).not.toContain('--color-purple');
            expect(content).not.toContain('#7300BE');

            // Verify at least one teal reference in interactive components
            if (['Navbar.tsx', 'Footer.tsx', 'CookieConsent.tsx', 'HomeContent.tsx', 'WaitlistContent.tsx', 'MarketingContent.tsx'].some(n => file.endsWith(n))) {
                expect(content).toContain('var(--color-teal)');
            }
        }
    });
});
