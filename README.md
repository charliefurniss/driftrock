# Driftrock exercise

## Description
Node.js command-line app querying and displaying data. It makes use of three npm modules: commander, request and request-promise-native.

## Instructions
To use the app, run 'npm install' from inside the root directory, then use one of the following commands:

  * node index.js total_spend [email]
  * node index.js average_spend [email]
  * node index.js highest_value

Node.js, including npm, can be downloaded here: https://nodejs.org/en/download/

## Test results
With per_page set at 100000 in both the getPurchases call in services/purchases.js and the getUsers call in services/users.js, we get the following results:

  * node index.js total_spend schoen_ocie@eichmannweimann.com

      Total spend: 92.06

  * node index.js average_spend schoen_ocie@eichmannweimann.com

      Average spend: 30.69

  * node index.js highest_value

      Highest value user: Judah Bogisich
      Total user spend: 993.32

## Next steps
As well as completing the remaining two commands (most_loyal and most_sold), I would like to refactor by creating more generic functions in the utilities file including:

  * A filter function into utilities that can be used in the users and purchases services
  * A getData function that would make a basic api call and return all data

I would also like to improve error handling and write tests for each of the five basic commands.

## Notes
Further results of average_spend and total_spend tests:

  * labadie_carissa@kub.co
    Average spend: 49.95
    Total spend: 199.8

  * alyson_wehner@roob.org
    Average spend: 49.70
    Total spend: 447.31

  * ross.yost@howe.biz
    Average spend: 40.57
    Total spend: 243.4

  * joaquin.barrows@konopelskikuhic.io
    Average spend: 47.75
    Total spend: 143.26

  * schroeder_noah@kochkoelpin.com
    Average spend: 49.79
    Total spend: 248.96