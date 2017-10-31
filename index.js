const commander = require('commander');
const { getUserSpend } = require('./controllers/userSpendController');
const { getHighestValue } = require('./controllers/purchasesController');

commander
  .version('0.0.1')
  .description('Contact management system');

commander
  .command('total_spend <email>')
  .alias('ts')
  .description('Calculate a user’s total spend')
  .action((email) => {
    getUserSpend(email, 'totalSpend');
  });

commander
  .command('average_spend <email>')
  .alias('as')
  .description('Calculate a user’s average spend')
  .action((email) => {
    getUserSpend(email, 'averageSpend');
  });

commander
  .command('most_loyal')
  .alias('ml')
  .description('Find the most loyal user')
  .action((email) => {
    getHighestValue();
  });

commander.parse(process.argv);