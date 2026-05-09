const fs = require('node:fs');
const path = require('node:path');
const reporter = require('cucumber-html-reporter');

const reportsDir = 'reports';
const jsonReport = path.join(reportsDir, 'cucumber-report.json');
const htmlReport = path.join(reportsDir, 'cucumber-report.html');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

if (!fs.existsSync(jsonReport)) {
  console.warn(`[report] Skipping HTML generation: JSON report not found at ${jsonReport}`);
  process.exit(0);
}

const raw = fs.readFileSync(jsonReport, 'utf8').trim();
if (!raw) {
  console.warn(`[report] Skipping HTML generation: JSON report is empty at ${jsonReport}`);
  process.exit(0);
}

try {
  JSON.parse(raw);
} catch (error) {
  console.warn(`[report] Skipping HTML generation: invalid JSON at ${jsonReport}`);
  console.warn(`[report] ${error instanceof Error ? error.message : error}`);
  process.exit(0);
}

reporter.generate({
  theme: 'bootstrap',
  jsonFile: jsonReport,
  output: htmlReport,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    browser: 'chromium',
    device: 'local',
    platform: `${process.platform} ${process.version}`,
  },
});

console.log(`[report] HTML report generated at ${htmlReport}`);
