## Lennel's Library Module

The Movie Ticket Booking System is a Node.js module that facilitates the management of movies, screenings, and ticket bookings in a theater system. It provides functionality for users to view available movie theaters, book tickets, edit movie details, and more.

## Features

- Login and Register
- View all available movie theaters
- View movie by title
- View fully booked movie theaters
- Add movies and movie screenings
- Edit movie details (title, year, genre, director, rating)
- Edit movie screening details (time, theater, occupied seats, max seats)
- Delete movies and movie screenings
- Customer ticket purchases, refunds, and changes

## Set up

1. Create a new file named `app.js`
2. Import the module with the correct file path
    ```js
    const library = require('./Lennel_MovieInformationSystem.js');
    ```
3. Use the const as a reference to exported functions
4. key in the function 
```js
library.run()
```
5. Run `node app.js` on your terminal and ensure you're in the right directory

## Functions

```js
library.run()
```

Description:

This is the main function you have to run since this node module is menu driven. The function initiates the login or registration process for the user.

```js
library.login()
```

Description:

System will prompt the user to log in with username and password.

```js
library.register()
```

Description:

System will prompt the user to register an account with a username, password and to confirm the password.

```js
library.userPrompt()
```

Description:

System will prompt the user as a User account for actions.

```js
library.adminPrompt()
```

Description:

System will prompt user as an Admin account for actions.

```js
library.getAllMovies()
```

Description:

Return all movies in database.

```js
library.getMovieByTitle(title);
```

Description:

System shall find and print the called movie, if title is null, System will prompt user for movie title.

```js
library.addMovie()
```

Description:

System shall prompt user for movie title, year, genre(s), director(s) and rating and be pushed to the movie database.

```js
library.addMovieScreening()
```

Description:

System shall prompt user for selected movie title, screening time, theatre, number of maximum seats add a new screening time to the database.

```js
library.getAllAvailableMovieTheatres()
```

Description:

Return all available movie screening records.

```js
library.getAllFullyBookedMovieTheatres()
```

Description:

Return all fully booked movie screening records.

```js
library.editMovieDetails()
```

Description:

System shall prompt user for movie to edit the details.

```js
library.editMovieScreening()
```

Description:

System shall prompt user for movie & screening time to edit.

```js
library.deleteMovie()
```

Description:

System shall prompt user for movie to delete.

```js
library.deleteMovieScreening()
```

Description:

System shall prompt user to delete movie.

```js
library.customerPurchasesTicket()
```

Description:

System shall prompt user for movie and number of tickets being purchased and increment the occupied seats by x number.

```js
library.customerRefundsTicket()
```

Description:

System shall prompt user for movie and number of tickets being refunded and decrement the occupied seats by x number.

```js
library.customerChangesMovieTicket()
```

Description:

System shall prompt user for initial movie and screening time and the new movie and screening time, as well as the number of tickets being changed.