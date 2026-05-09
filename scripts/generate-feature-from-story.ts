import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error('Usage: npm run generate:feature -- <path-to-user-story-file>');
}

const rawStory = readFileSync(inputPath, 'utf-8');
const lines = rawStory.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
const title = lines[0] || 'Generated feature';

const asA = lines.find((line) => /^as\s+a?n?/i.test(line)) ?? 'As a user';
const iWant = lines.find((line) => /^i\s+want/i.test(line)) ?? 'I want to use the system';
const soThat = lines.find((line) => /^so\s+that/i.test(line)) ?? 'So that I can achieve my goal';

const scenarios = lines
  .filter((line) => /^scenario[:\s]/i.test(line))
  .map((line, index) => `  Scenario: ${line.replace(/^scenario[:\s]*/i, '') || `Generated scenario ${index + 1}`}\n    Given a precondition\n    When an action is performed\n    Then the expected result is observed`);

const featureContent = `Feature: ${title}\n  ${asA}\n  ${iWant}\n  ${soThat}\n\n${scenarios.length ? scenarios.join('\n\n') : '  Scenario: Generated scenario\n    Given a precondition\n    When an action is performed\n    Then the expected result is observed'}\n`;

if (!existsSync('features/generated')) {
  mkdirSync('features/generated', { recursive: true });
}

const outputFile = join('features/generated', `${basename(inputPath, extname(inputPath))}.feature`);
writeFileSync(outputFile, featureContent, 'utf-8');
console.log(`Feature file generated at: ${outputFile}`);
