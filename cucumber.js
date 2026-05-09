module.exports = {
  default: {
    require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
    format: ["progress", "json:reports/cucumber-report.json"],
    requireModule: ["ts-node/register"]
  }
};