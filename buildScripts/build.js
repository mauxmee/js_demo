/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'proudction';

console.log(chalk.blue('Generating minified build for production. this will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStates = stats.toJson();
  if (jsonStates.hasError) {
    return jsonStates.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStates.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStates.hasWarnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`webpack stats: ${stats}`);

  console.log(chalk.green('app built for production and written  to /dist!'));
  return 0;
});
