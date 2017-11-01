Driftrock exercise

Description
Node.js command-line app querying and displaying data.

Instructions
To use the app run 'npm install' from inside the root directory, then use one of the following commands:

  * node index.js total_spend <email>
  * node index.js average_spend <email>
  * node index.js highest_value

Test results
With per_page set at 100000 in both the getPurchases call in services/purchases.js and the getUsers call in services/users.js, we get the following results:

  * node index.js total_spend schoen_ocie@eichmannweimann.com

      Total spend: 92.06

  * node index.js average_spend schoen_ocie@eichmannweimann.com

      Average spend: 30.69

  * node index.js highest_value

      Highest value user: Judah Bogisich
      Total user spend: 993.32

Next steps
As well as completing the remaining two commands (most_loyal and most_sold), I would like to refactor to make code more DRY, by creating more generic functions in the utilities file including:

  * A filter function into utilities that can be used in the users and purchases services
  * A getData function that would make a basic api call and return all data