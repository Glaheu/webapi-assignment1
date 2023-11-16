const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// database.js
const movieDatabase = [
    {
        title: 'Tron',
        year: 1982,
        genre: ['Adventure', 'Science Fiction', 'Action'],
        director: 'Steven Lisberger',
        rating: 7.8,
        screenings: [
            { time: '10:00 AM', theatre: 'theatre 1', occupiedSeats: 50, maxSeats: 150, createdBy: '', lastModifiedBy: '' },
            { time: '2:30 PM', theatre: 'theatre 2', occupiedSeats: 120, maxSeats: 175, createdBy: '', lastModifiedBy: '' },
        ],
        createdBy: '',
        lastModifiedBy: ''
    },
    {
        title: 'Charlie and the Chocolate Factory',
        year: 2005,
        genre: ['Comedy', 'Fantasy', 'Adventure', 'Family'],
        director: 'Tim Burton',
        rating: 6.2,
        screenings: [
            { time: '11:15 AM', theatre: 'theatre 3', occupiedSeats: 70, maxSeats: 125, createdBy: '', lastModifiedBy: '' },
            { time: '4:45 PM', theatre: 'theatre 4', occupiedSeats: 100, maxSeats: 150, createdBy: '', lastModifiedBy: '' },
        ],
        createdBy: '',
        lastModifiedBy: ''
    },
    {
        title: 'Shrek',
        year: 2001,
        genre: ['Family', 'Comedy', 'Animation', 'Fantasy', 'Adventure'],
        director: ['Andrew Adamson', 'Vicky Jenson'],
        rating: 8.0,
        screenings: [
            { time: '12:00 PM', theatre: 'theatre 7', occupiedSeats: 154, maxSeats: 160, createdBy: '', lastModifiedBy: '' },
            { time: '4:30 PM', theatre: 'theatre 5', occupiedSeats: 175, maxSeats: 175, createdBy: '', lastModifiedBy: '' },
        ],
        createdBy: '',
        lastModifiedBy: ''
    },
    {
        title: 'All Quiet on the Western Front',
        year: 2022,
        genre: ['War', 'Drama'],
        director: 'Edward Berger',
        rating: 8.2,
        screenings: [
            { time: '5:15 PM', theatre: 'theatre 6', occupiedSeats: 167, maxSeats: 200, createdBy: '', lastModifiedBy: '' },
            { time: '9:30 PM', theatre: 'theatre 7', occupiedSeats: 156, maxSeats: 160, createdBy: '', lastModifiedBy: '' },
        ],
        createdBy: '',
        lastModifiedBy: ''
    },
    {
        title: 'Rush Hour',
        year: 1998,
        genre: ['Comedy', 'Crime', 'Action'],
        director: 'Brett Ratner',
        rating: 7,
        screenings: [
            { time: '12:00 PM', theatre: 'theatre 1', occupiedSeats: 100, maxSeats: 150, createdBy: '', lastModifiedBy: '' },
            { time: '6:30 PM', theatre: 'theatre 2', occupiedSeats: 175, maxSeats: 175, createdBy: '', lastModifiedBy: '' },
        ],
        createdBy: '',
        lastModifiedBy: ''
    },
];

const userDatabase = [
    {
        id: '0',
        username: 'root',
        password: '',
        accountType: 'Admin',
    },
    {
        id: '1',
        username: 'lennel',
        password: 'zxcvbnm',
        accountType: 'Admin',
    },
    {
        id: '2',
        username: 'lloyd',
        password: 'zxcvbnm',
        accountType: 'User',
    }
]

loginOrRegisterPrompt();
// Main Menu Prompt
function loginOrRegisterPrompt() {
    rl.question(
        "================================================\n" +
        "|                  Movie Menu                  |\n" +
        "|                                              |\n" +
        "| 1. Login Account                             |\n" +
        "| 2. Register Account                          |\n" +
        "|                                              |\n" +
        "| 3. Exit                                      |\n" +
        "================================================\n", (userInput) => {
            const choice = parseInt(userInput);
            switch (choice) {
                case 1:
                    login();
                    break;
                case 2:
                    register();
                    break;
                case 3:
                    rl.close();
                    break;
                default:
                    console.log("Invalid choice. Please enter a number between 1 and 3.");
                    setTimeout(() => loginOrRegisterPrompt(), 1500);
                    break;
            }
        });
}

const userContext = {
    currentUser: null,
};

// Function to set the current user
function setCurrentUser(user) {
    userContext.currentUser = user;
}

function login() {
    rl.question("Enter your username: ", (username) => {
        rl.question("Enter your password: ", (password) => {
            const user = userDatabase.find((user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password);
            if (user) {
                setCurrentUser(user);
                console.log(`Welcome, ${user.username}! You are logged in as ${user.accountType}.`);
                checkUserAccountAndRedirectToMenuWithTimeout(user);
            } else {
                console.log("Invalid username or password. Please try again.");
                rl.question("Do you want to try again or go back to the main menu? (try again/main menu): ", (tryAgainOrMenu) => {
                    if (tryAgainOrMenu.toLowerCase() === 'try again') {
                        login();
                    } else {
                        loginOrRegisterPrompt();
                    }
                });
                // Retry the login process
            }
        });
    });
}

function register() {
    rl.question("Enter a username: ", (newUsername) => {
        // Check if the username is already taken
        const usernameExists = userDatabase.some(user => user.username.toLowerCase() === newUsername.toLowerCase());

        if (usernameExists) {
            console.log("Username is already taken. Please choose a different username.");
            setTimeout(() => loginOrRegisterPrompt(), 1500);
        } else {
            // Find the maximum existing ID and increment it for the new user
            const maxId = Math.max(...userDatabase.map(user => parseInt(user.id)));
            const newId = (maxId + 1).toString();

            rl.question("Enter a password: ", (newPassword) => {
                rl.question("Confirm your password: ", (confirmPassword) => {
                    if (newPassword === confirmPassword) {
                        // Assuming the account type is 'User' for a new registration
                        const newUser = {
                            id: newId,
                            username: newUsername,
                            password: newPassword,
                            accountType: 'User',
                        };

                        // Add the new user to the database
                        userDatabase.push(newUser);
                        setCurrentUser(newUser);
                        console.log(`Welcome, ${newUsername}! You are logged in as ${newUser.accountType}.`);
                        checkUserAccountAndRedirectToMenuWithTimeout(newUser);
                    } else {
                        console.log("Password and confirmation do not match. Please try again.");
                        setTimeout(() => loginOrRegisterPrompt(), 1500);
                    }
                });
            });
        }
    });
}



userPrompt(userDatabase[1]);
// User input options
function userPrompt() {
    // User menu
    rl.question(
        "================================================\n" +
        "|                  Movie Menu                  |\n" +
        "|                                              |\n" +
        "| 1. List all Movie Timings                    |\n" +
        "| 2. Search Movie by Title                     |\n" +
        "|                                              |\n" +
        "| 3. Logout                                    |\n" +
        "================================================\n", (userInput) => {
            const choice = parseInt(userInput);
            switch (choice) {
                case 1:
                    getAllMovies();
                    break;
                case 2:
                    getMovieByTitle();
                    break;
                case 3:
                    loginOrRegisterPrompt();
                    break;
                default:
                    console.log("Invalid choice. Please enter a number between 1 and 3.");
                    setTimeout(() => userPrompt(), 1500);
                    break;
            }
        });
}
// Admin input options
function adminPrompt() {
    // Admin menu
    rl.question(
        "================================================\n" +
        "|                  Movie Menu                  |\n" +
        "|                                              |\n" +
        "| 1. List all Movie Timings                    |\n" +
        "| 2. Search Movie by Title                     |\n" +
        "| 3. Add Movie                                 |\n" +
        "| 4. Add Movie Screening                       |\n" +
        "| 5. Get all Available Movie Theatres          |\n" +
        "| 6. Get all Fully Booked Movie Theatres       |\n" +
        "| 7. Edit Movie Details                        |\n" +
        "| 8. Edit Movie Screening                      |\n" +
        "| 9. Delete Movie                              |\n" +
        "| 10. Delete Movie Screening                   |\n" +
        "|                                              |\n" +
        "| Customer Options                             |\n" +
        "| 11. Customer Purchases Tickets               |\n" +
        "| 12. Customer Refunds Tickets                 |\n" +
        "| 13. Customer Requests to change Movie Ticket |\n" +
        "| 14. Logout                                   |\n" +
        "================================================\n", (userInput) => {
            const choice = parseInt(userInput);
            switch (choice) {
                case 1:
                    getAllMovies();
                    break;
                case 2:
                    getMovieByTitle(null);
                    break;
                case 3:
                    addMovie();
                    break;
                case 4:
                    addMovieScreening();
                    break;
                case 5:
                    getAllAvailableMovieTheatres();
                    break;
                case 6:
                    getAllFullyBookedMovieTheatres();
                    break;
                case 7:
                    editMovieDetails();
                    break;
                case 8:
                    editMovieScreening();
                    break;
                case 9:
                    deleteMovie();
                    break;
                case 10:
                    deleteMovieScreening();
                    break;
                case 11:
                    customerPurchasesTicket();
                    break;
                case 12:
                    customerRefundsTicket();
                    break;
                case 13:
                    customerChangesMovieTicket();
                    break;
                case 14:
                    loginOrRegisterPrompt();
                    break;
                default:
                    console.log("Invalid choice. Please enter a number between 1 and 14.");
                    setTimeout(() => adminPrompt(), 1500);
                    break;
            }
        });
}


// Checks the account type of user, and redirects to respective Menu
function checkUserAccountAndRedirectToMenuWithTimeout() {
    // Check if accountType is an Admin
    if (userContext.currentUser.accountType == 'Admin') {
        // Redirect Admin account to adminPrompt function
        setTimeout(() => adminPrompt(), 1500);
        // Check if accountType is an User
    } else if (userContext.currentUser.accountType == 'User') {
        // Redirect User account to userPrompt function
        setTimeout(() => userPrompt(), 1500);
    }
}

// Fetches records of all movies
function getAllMovies() {
    // Displays the database of all Movies including an array of JSON in each record
    console.log(JSON.stringify(movieDatabase, null, 2));
    checkUserAccountAndRedirectToMenuWithTimeout();
}

// Create a movie record
function addMovie() {
    // Prompt User for Movie Title
    rl.question("Enter the title: ", (title) => {
        // Check if a movie with the same title already exists
        const existingMovie = getMovieByTitle(title);
        if (existingMovie) {
            // If a movie with the same title already exists, handle it here
            console.log(`A movie with the title "${title}" already exists. Movie not added.`);
        } else {
            // Prompt User for Year of movie Published
            rl.question("Enter the year: ", (year) => {
                year = parseInt(year);
                // Throw an error if "year" input is not a number
                if (isNaN(year)) {
                    // Throw an error if "year" input is not a number
                    throw new Error("Year must be a number");
                }
                // Prompt user for the Genre of Movie and separate the genres with commas
                rl.question("Enter genres (comma-separated): ", (genre) => {
                    // Prompt user for the Directors of Movie and separate the directors with commas
                    rl.question("Enter director(s) (comma-separated): ", (director) => {
                        rl.question("Enter rating: ", (rating) => {
                            rating = parseFloat(rating);
                            if (isNaN(rating)) {
                                // Throw an error if "rating" input is not a number
                                throw new Error("Rating must be a number");
                            }
                            // Process and add the movie to the database here
                            addMovieToDatabase(title, year, genre.split(',').map(genre => genre.trim()), director.split(',').map(director => director.trim()), rating);
                            // Print newly added movie
                            getMovieByTitle(title);
                            // After processing, display a success message or return to the menu
                            console.log("Movie added successfully!");
                            // Redirect user to the Main Menu
                            checkUserAccountAndRedirectToMenuWithTimeout();
                        });
                    });
                });
            });
        }
        // Redirect user to the Main Menu
        checkUserAccountAndRedirectToMenuWithTimeout();
    });
}


// Helper function to add a movie to the database
function addMovieToDatabase(title, year, genre, director, rating) {
    // Create a new movie object
    const newMovie = {
        title,
        year,
        genre,
        director,
        rating,
        screenings: [],
        createdBy: userContext.currentUser.username,
        lastModifiedBy: ''
    };
    // Add it to the movieDatabase array
    movieDatabase.push(newMovie);
}

function addMovieScreening() {
    // Prompt User for Movie Title to add a Screening
    rl.question("Enter the title of the movie for the screening: ", (title) => {
        const movie = getMovieByTitle(title);
        if (movie) {
            // Prompt User to enter screening time
            rl.question("Enter the screening time: ", (time) => {
                // Prompt User to enter a theatre
                rl.question("Enter the theatre: ", (theatre) => {
                    // Prompt User to enter the maximum number of seats
                    rl.question("Enter the maximum number of seats: ", (maxSeats) => {
                        const screening = {
                            time,
                            theatre,
                            occupiedSeats: 0,
                            maxSeats: parseInt(maxSeats),
                            createdBy: userContext.currentUser.username,
                            lastModifiedBy: ''
                        };
                        movie.screenings.push(screening);
                        // Indicate the screening has been added
                        console.log("Screening for " + title + " added successfully.");
                        // Redirect user to the Main Menu
                        checkUserAccountAndRedirectToMenuWithTimeout();
                    });
                });
            });
        } else {
            // Indicate the Movie cannot be found
            console.log("Movie with title " + title + " not found.");
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        }
    });
}

// Search Movie based on Title
function getMovieByTitle(title) {
    if (!title) {
        // Prompt User for Movie Title
        rl.question("Enter the title of the movie: ", (movieTitle) => {
            const movie = movieDatabase.find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());
            if (movie) {
                // Indicate that Movie has been found
                console.log("Movie found: " + movieTitle);
                // Print the JSON representation of the Movie
                console.log(JSON.stringify(movie, null, 2));
            } else {
                console.log("Movie with title " + movieTitle + " not found.");
            }
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        });
    } else {
        // Search movie based on Movie Title
        const movie = movieDatabase.find(movie => movie.title.toLowerCase() === title.toLowerCase());
        if (movie) {
            // Print the JSON representation of the movie
            console.log(JSON.stringify(movie, null, 2));
        }
        // Return the movie record
        return movie;
    }
}

// Get all available movie theatres in database
function getAllAvailableMovieTheatres() {
    const availableTheatres = [];

    // Search and push all movies with less occupied seats than max seats into an array
    movieDatabase.forEach(movie => {
        movie.screenings.forEach(screening => {
            if (screening.occupiedSeats < screening.maxSeats) {
                availableTheatres.push({
                    movieTitle: movie.title,
                    screeningTime: screening.time,
                    theatre: screening.theatre,
                    occupiedSeats: screening.occupiedSeats,
                    maxSeats: screening.maxSeats,
                });
            }
        });
    });

    // If there are screenings with less occupied seats than max seats in the array, show all records
    if (availableTheatres.length > 0) {
        console.log("Available Movie Theatres:");
        availableTheatres.forEach(theatre => {
            console.log("Movie: " + theatre.movieTitle);
            console.log("Screening Time: " + theatre.screeningTime);
            console.log("theatre: " + theatre.theatre);
            console.log("Occupied Seats: " + theatre.occupiedSeats);
            console.log("Max Seats: " + theatre.maxSeats);
            console.log('------------------------');
        });
    } else {
        // If there are no screenings with less occupied seats than max seats, indicate there are no movies found
        console.log("No available movie theatres found.");
    }
    // Redirect user to the Main Menu
    checkUserAccountAndRedirectToMenuWithTimeout();
}

// Get all fully booked movie theatres in database
function getAllFullyBookedMovieTheatres() {
    const fullyBookedTheatres = [];
    // Search and push all movies with occupied seats matching the values of max seats into an array
    movieDatabase.forEach(movie => {
        movie.screenings.forEach(screening => {
            if (screening.occupiedSeats === screening.maxSeats) {
                fullyBookedTheatres.push({
                    movieTitle: movie.title,
                    screeningTime: screening.time,
                    theatre: screening.theatre,
                    occupiedSeats: screening.occupiedSeats,
                    maxSeats: screening.maxSeats,
                });
            }
        });
    });

    // If there are screenings with occupied seats matching the values max seats in the array, show all records
    if (fullyBookedTheatres.length > 0) {
        console.log("Fully Booked Movie Theatres:");
        fullyBookedTheatres.forEach(theatre => {
            console.log("Movie: " + theatre.movieTitle);
            console.log("Screening Time: " + theatre.screeningTime);
            console.log("theatre: " + theatre.theatre);
            console.log("Occupied Seats: " + theatre.occupiedSeats);
            console.log("Max Seats: " + theatre.maxSeats);
            console.log('------------------------');
        });
    } else {
        // If there are no screenings with occupied seats matching max seats, indicate there are no movies found
        console.log("No fully booked movie theatres found.");
    }
    // Redirect user to the Main Menu
    checkUserAccountAndRedirectToMenuWithTimeout();
}

// Function for users to edit Movie details
function editMovieDetails() {
    // Prompt User for Movie Title to edit
    rl.question("Enter the title of the movie you want to edit: ", (movieTitle) => {
        const movie = getMovieByTitle(movieTitle);
        // Check if movie is present
        if (movie) {
            promptUserForEdit(movie);
        } else {
            // Indicate movie is not found
            console.log("Movie not found.");
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        }
    });
}


// Menu For users to select the movie detail to edit
function promptUserForEdit(movie) {
    rl.question("Which detail do you wish to change?\n" +
        "1. Movie Title\n" +
        "2. Year\n" +
        "3. Genre\n" +
        "4. Director\n" +
        "5. Rating\n" +
        "6. Return to Main Menu\n" +
        "Enter the corresponding number: ", (userInput) => {
            const choice = parseInt(userInput);
            switch (choice) {
                case 1:
                    promptForMovieTitle(movie);
                    break;
                case 2:
                    promptForYear(movie);
                    break;
                case 3:
                    promptForGenre(movie);
                    break;
                case 4:
                    promptForDirector(movie);
                    break;
                case 5:
                    promptForRating(movie);
                    break;
                case 6:
                    console.log("Returning to the main menu...");
                    checkUserAccountAndRedirectToMenuWithTimeout();
                    break;
                default:
                    console.log("Invalid choice. Please enter a number between 1 and 6.");
                    promptUserForEdit(movie);
            }
        });
}

function updateLastModifiedForMovie(movie) {
    // Update last modified property with current username
    movie.lastModifiedBy = userContext.currentUser.username;
}

// Prompt user for new Movie Title
function promptForMovieTitle(movie) {
    rl.question("Enter the new Movie Title: ", (newTitle) => {
        movie.title = newTitle;
        // Indicate the Movie Title has been updated
        console.log("Movie Title updated successfully.");
        // Update last modified property
        updateLastModifiedForMovie(movie);
        // Redirect user to promptUserForEdit function
        promptUserForEdit(movie);
    });
}

// Prompt user for new Year of Movie published
function promptForYear(movie) {
    rl.question("Enter the new Year: ", (newYear) => {
        newYear = parseInt(newYear);
        // Check if "newYear" variable is a number
        if (isNaN(newYear)) {
            // Indicate that the rating must be a number
            throw new Error("ERROR: Year must be a number");
        } else {
            movie.year = newYear;
            // Indicate that the Year has been updated
            console.log("Year updated successfully.");
            // Redirect user to promptUserForEdit function
            promptUserForEdit(movie);
        }
    });
}

// Prompt user for new Genres of Movie 
function promptForGenre(movie) {
    rl.question("Enter the new Genre(s) (comma-separated): ", (newGenre) => {
        movie.genre = newGenre.split(',').map(genre => genre.trim());
        // Indicate that the Genre(s) has been updated
        console.log("Genre(s) updated successfully.");
        // Update last modified property
        updateLastModifiedForMovie(movie);
        // Redirect user to promptUserForEdit function
        promptUserForEdit(movie);
    });
}

// Prompt user for new Directors of Movie 
function promptForDirector(movie) {
    rl.question("Enter the new Director(s) (comma-separated): ", (newDirector) => {
        movie.director = newDirector.split(',').map(director => director.trim());
        // Indicate that the Director(s) has been updated
        console.log("Director(s) updated successfully.");
        // Update last modified property
        updateLastModifiedForMovie(movie);
        // Redirect user to promptUserForEdit function
        promptUserForEdit(movie);
    });
}

// Prompt user for new Rating of Movie 
function promptForRating(movie) {
    // Prompt user for a new Rating
    rl.question("Enter the new Rating: ", (newRating) => {
        newRating = parseFloat(newRating);
        // Check if "newRating" variable is a number
        if (isNaN(newRating)) {
            // Indicate that the rating must be a number
            throw new Error("ERROR: Rating must be a number");
        } else {
            movie.rating = newRating;
            // Indicate that the Rating has been updated
            console.log("Rating updated successfully.");
            // Update last modified property
            updateLastModifiedForMovie(movie);
            // Redirect user to promptUserForEdit function
            promptUserForEdit(movie);
        }
    });
}

// Function for users to edit Movie Screening time
function editMovieScreening() {
    // Prompt users to select the movie's screening to edit
    rl.question("Enter the title of the movie of screening you wish to edit: ", (movieTitle) => {
        const movie = getMovieByTitle(movieTitle);
        // Check if the movie is present
        if (movie) {

            console.log("Current Screenings:");
            console.log(movie.screenings); // Print current movie screenings

            rl.question("Enter the screening time you want to modify: ", (screeningTime) => {
                // Prompt user for screening time
                // Prompt user for screening time to modify
                const screening = movie.screenings.find(s => s.time === screeningTime);
                if (screening) {
                    promptUserForScreeningEdit(movie, screening);
                } else {
                    console.log("Screening not found.");
                    checkUserAccountAndRedirectToMenuWithTimeout();
                }
            });
        } else {
            // Indicate that movie was not found
            console.log("Movie not found.");
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        }
    });
}

// Menu for users to select the Movie Screening time
function promptUserForScreeningEdit(movie, screening) {
    rl.question("Which detail do you wish to change?\n" +
        "1. Screening Time\n" +
        "2. theatre\n" +
        "3. Occupied Seats\n" +
        "4. Max Seats\n" +
        "5. Return to Main Menu\n" +
        "Enter the corresponding number: ", (userInput) => {
            const choice = parseInt(userInput);
            switch (choice) {
                case 1:
                    promptScreeningTime(movie, screening);
                    break;
                case 2:
                    promptTheatre(movie, screening);
                    break;
                case 3:
                    promptOccupiedSeats(movie, screening);
                    break;
                case 4:
                    promptMaxSeats(movie, screening);
                    break;
                case 5:
                    console.log("Returning to the main menu...");
                    checkUserAccountAndRedirectToMenuWithTimeout();
                    break;
                default:
                    console.log("Invalid choice. Please enter a number between 1 and 5.");
                    promptUserForScreeningEdit(movie, screening);
            }
        });
}
function updateLastModifiedForScreening(screening) {
    screening.lastModifiedBy = userContext.currentUser.username;
}

// Prompt user for new Screen Time
function promptScreeningTime(movie, screening) {
    rl.question("Enter the new Screening Time: ", (newTime) => {
        screening.time = newTime;
        // Indicate the Screening Time has been updated
        console.log("Screening Time updated successfully.");
        // Update last modified property
        updateLastModifiedForScreening(screening);
        // Redirect user to promptUserForScreeningEdit function
        promptUserForScreeningEdit(movie, screening);
    });
}

// Prompt user for new Movie Theatre
function promptTheatre(movie, screening) {
    rl.question("Enter the new Theatre: ", (newtheatre) => {
        screening.theatre = newtheatre;
        console.log("theatre updated successfully.");
        // Update last modified property
        updateLastModifiedForScreening(screening);
        // Redirect user to promptUserForScreeningEdit function
        promptUserForScreeningEdit(movie, screening);
    });
}

// Prompt user for new number of occupied seats
function promptOccupiedSeats(movie, screening) {
    rl.question("Enter new number of Occupied Seats: ", (newOccupiedSeats) => {
        const occupiedSeats = parseInt(newOccupiedSeats);
        // Check if "occupiedSeats" variable is a number
        if (isNaN(occupiedSeats)) {
            throw new Error("ERROR: Number of Occupied Seats must be a number.");
        }
        screening.occupiedSeats = occupiedSeats;
        // Indicate that the Occupied Seats has been updated
        console.log("Occupied Seats updated successfully.");
        // Update last modified property
        updateLastModifiedForScreening(screening);
        // Redirect user to promptUserForScreeningEdit function
        promptUserForScreeningEdit(movie, screening);
    });
}

// Prompt user for new number of maximum seats
function promptMaxSeats(movie, screening) {
    rl.question("Enter new number of Max Seats: ", (newMaxSeats) => {
        const maxSeats = parseInt(newMaxSeats);
        // Check if "maxSeats" variable is a number
        if (isNaN(maxSeats)) {
            throw new Error("ERROR: Number of Max Seats must be a number.");
        }
        screening.maxSeats = maxSeats;
        // Indicate the maximum number of seats
        console.log("Max Seats updated successfully.");
        // Update last modified property
        updateLastModifiedForScreening(screening);
        // Redirect user to promptUserForScreeningEdit function
        promptUserForScreeningEdit(movie, screening);
    });
}

// Prompt user to delete Movie
function deleteMovie() {
    rl.question("Which Movie would you like to delete?\n", (movieTitle) => {
        const movieIndex = movieDatabase.findIndex((movie) => movie.title.toLowerCase() === movieTitle.toLowerCase());
        const movie = getMovieByTitle(movieTitle);
        if (movieIndex !== -1) {
            movieDatabase.splice(movieIndex, 1);
            // Indicate the Movie has been deleted
            console.log("Movie " + movie.title + " has been deleted.");
        } else {
            // Indicate the Movie was not found
            console.log("Movie with title " + movieTitle + " not found.");
        }
        // Redirect user to the Main Menu
        checkUserAccountAndRedirectToMenuWithTimeout();

    });
}

// Prompt user to delete Movie Screening
function deleteMovieScreening() {
    rl.question("Which Movie would you like to delete a Screening of?\n", (movieTitle) => {
        const movie = getMovieByTitle(movieTitle);
        if (movie) {
            console.log(movie.screenings);
            // Prompt user for Screening Time to delete in database
            rl.question("Enter the Screening Time to delete: ", (screeningTime) => {
                const screeningIndex = movie.screenings.findIndex(s => s.time === screeningTime);
                if (screeningIndex !== -1) {
                    movie.screenings.splice(screeningIndex, 1);
                    // Indicate the screening time has been deleted
                    console.log("Screening at " + screeningTime + " for " + movie.title + " has been deleted.");
                } else {
                    // Indicate the screening time is not found
                    console.log("Screening at " + screeningTime + " for " + movie.title + " is not found.");
                }
                checkUserAccountAndRedirectToMenuWithTimeout();
            });
        } else {
            // Indicate that the Movie was not found
            console.log("Movie with the title " + movieTitle + " is not found.");
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        }


    });
}

// Allow customer to purchase ticket
function customerPurchasesTicket() {
    // Prompt User for Movie Title
    rl.question("Enter which Movie the customer wants to watch: ", (movieTitle) => {
        const movie = getMovieByTitle(movieTitle);
        if (movie) {
            // Prompt User to enter screening time
            rl.question("Enter Screening Time of Movie: ", (screeningTime) => {
                const screening = movie.screenings.find(s => s.time === screeningTime);
                if (screening) {
                    if (screening.occupiedSeats < screening.maxSeats) {
                        // Prompt for the number of tickets purchased
                        rl.question("Enter the number of tickets purchased: ", (numTickets) => {
                            numTickets = parseInt(numTickets);
                            // Check if the variable "numTickets" is a numerical value, throw an error if the "numTicket" input is not a number
                            if (isNaN(numTickets)) {
                                // Throw an error
                                throw new Error("ERROR: Number of Tickets must be a number.");
                            }
                            // Check if the number of tickets purchased is more than 0, and if the sum of occupied seats and tickets purchase will exceed not the total seats in each theatre
                            if (numTickets > 0 && screening.occupiedSeats + numTickets <= screening.maxSeats) {
                                screening.occupiedSeats += numTickets;
                                screening.lastModifiedBy = userContext.currentUser.username;
                                // Indicate the movie tickets has been purchased
                                console.log("Occupied seats for " + movieTitle + " at " + screeningTime + " increased by " + numTickets + ". The number of occupied seats is now " + screening.occupiedSeats + ".");
                            } // Check if the sum of occupied seats and total number of tickets has exceeded the max seats
                            else if (screening.occupiedSeats + numTickets > screening.maxSeats) {
                                // Indicate the number of available seats has been exceeded 
                                console.log("Exceeded available seats. Number of available seats left is " + parseInt(screening.maxSeats - screening.occupiedSeats));
                            } else {
                                console.log("Invalid number of tickets.");
                            }
                            // Redirect user to the Main Menu
                            checkUserAccountAndRedirectToMenuWithTimeout();

                        });
                    } else {
                        // Indicate that Movie theatre has been fully booked
                        console.log("Movie theatre is fully booked.");
                        // Redirect user to the Main Menu
                        checkUserAccountAndRedirectToMenuWithTimeout();
                    }
                } else {
                    // Indicate that Screening for Movie is not found
                    console.log("Screening not found for " + movieTitle + " at " + screeningTime + ".");
                    checkUserAccountAndRedirectToMenuWithTimeout();
                }
            });
        } else {
            // Indicate that the Movie is not found
            console.log("Movie with title " + movieTitle + " not found.");
        }
        // Redirect user to the Main Menu
        checkUserAccountAndRedirectToMenuWithTimeout();

    });
}
function customerRefundsTicket() {
    rl.question("Enter which Movie the customer is refunding: ", (movieTitle) => {
        const movie = getMovieByTitle(movieTitle);
        if (movie) {
            rl.question("Enter the Screening the customer refunding: ", (screeningTime) => {
                const screening = movie.screenings.find(s => s.time === screeningTime);
                if (screening) {
                    rl.question("Enter the number of tickets refunded: ", (numTickets) => {
                        numTickets = parseInt(numTickets)
                        // Check if the variable "numTickets" is in a numerical value
                        if (isNaN(numTickets)) {
                            throw new Error("Invalid input. Number of Tickets must be a number.");
                        }
                        screening.occupiedSeats -= numTickets;
                        screening.lastModifiedBy = userContext.currentUser.username;
                        console.log("Occupied seats for " + movieTitle + " at " + screeningTime + " has been decreased by " + numTickets + "  The number of occupied seats is now " + screening.occupiedSeats + ".");
                        // Redirect user to the Main Menu
                        checkUserAccountAndRedirectToMenuWithTimeout();

                    })
                } else {
                    console.log("Screening not found.");
                    // Redirect user to the Main Menu
                    checkUserAccountAndRedirectToMenuWithTimeout();
                }
            });
        } else {
            console.log("Movie is not found.");
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();

        }
    });
}

function customerChangesMovieTicket() {
    rl.question("Enter the title of the movie the customer initially booked tickets for: ", (initialMovieTitle) => {
        const initialMovie = getMovieByTitle(initialMovieTitle);
        if (initialMovie) {
            rl.question("Enter the screening time the customer initially booked tickets for: ", (initialScreeningTime) => {
                const initialScreening = initialMovie.screenings.find(s => s.time === initialScreeningTime);
                if (initialScreening) {
                    rl.question("Enter the title of the movie the customer want to change to: ", (newMovieTitle) => {
                        const newMovie = getMovieByTitle(newMovieTitle);
                        if (newMovie) {
                            rl.question("Enter the screening time the customer want to change to: ", (newScreeningTime) => {
                                const newScreening = newMovie.screenings.find(s => s.time === newScreeningTime);
                                if (newScreening) {
                                    rl.question("Enter the number of tickets to transfer: ", (numTickets) => {
                                        numTickets = parseInt(numTickets);
                                        if (isNaN(numTickets)) {
                                            throw new Error("Invalid input. Number of Tickets must be a number.");
                                        }
                                        if (numTickets > 0 && initialScreening.occupiedSeats >= numTickets && !isNaN(numTickets)) {
                                            initialScreening.occupiedSeats -= numTickets;
                                            newScreening.occupiedSeats += numTickets;
                                            initialScreening.lastModifiedBy = userContext.currentUser.username;
                                            newScreening.lastModifiedBy = userContext.currentUser.username;
                                            console.log(`Transferred ${numTickets} tickets from "${initialMovieTitle}" at ${initialScreeningTime} to "${newMovieTitle}" at ${newScreeningTime}.`);
                                        } else {
                                            console.log("Invalid number of tickets or insufficient available seats.");
                                        }
                                        // Redirect user to the Main Menu
                                        checkUserAccountAndRedirectToMenuWithTimeout();

                                    });
                                } else {
                                    console.log(`Screening not found for "${newMovieTitle}" at ${newScreeningTime}.`);
                                    // Redirect user to the Main Menu
                                    checkUserAccountAndRedirectToMenuWithTimeout();

                                }
                            });
                        } else {
                            console.log(`Movie with title "${newMovieTitle}" not found.`);
                            // Redirect user to the Main Menu
                            checkUserAccountAndRedirectToMenuWithTimeout();

                        }
                    });
                } else {
                    console.log(`Screening not found for "${initialMovieTitle}" at ${initialScreeningTime}.`);
                    // Redirect user to the Main Menu
                    checkUserAccountAndRedirectToMenuWithTimeout();

                }
            });
        } else {
            console.log(`Movie with title "${initialMovieTitle}" not found.`);
            // Redirect user to the Main Menu
            checkUserAccountAndRedirectToMenuWithTimeout();
        }
    });
}

module.exports = {
    loginOrRegisterPrompt,
    login,
    register,
    userPrompt,
    adminPrompt,
    getAllMovies,
    getMovieByTitle,
    addMovie,
    addMovieScreening,
    getAllAvailableMovieTheatres,
    getAllFullyBookedMovieTheatres,
    editMovieDetails,
    editMovieScreening,
    deleteMovie,
    deleteMovieScreening,
    customerPurchasesTicket,
    customerRefundsTicket,
    customerChangesMovieTicket
}