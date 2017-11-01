const commander = require('commander');
const { getUserSpend } = require('./controllers/userSpendController');
const { getHighestValue } = require('./controllers/purchasesController');

commander
  .version('0.0.1')
  .description('Contact management system');

/**
 * Defines the comand-line input required to calculate
 * a user's total spend
 */
commander
  .command('total_spend <email>')
  .alias('ts')
  .description('Calculate a user’s total spend')
  .action((email) => {
    getUserSpend(email, 'totalSpend');
  });

/**
 * Defines the comand-line input required to calculate
 * a user's average spend
 */
commander
  .command('average_spend <email>')
  .alias('as')
  .description('Calculate a user’s average spend')
  .action((email) => {
    getUserSpend(email, 'averageSpend');
  });

/**
 * Defines the comand-line input required to calculate
 * the highest value user
 */
commander
  .command('highest_value')
  .alias('ml')
  .description('Find the highest value user')
  .action((email) => {
    getHighestValue();
  });

commander.parse(process.argv);