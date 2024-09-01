# Autocomplete search component - [Live Link](https://autocomplete-search-eight.vercel.app/)
 - It allows the user to search for books using keywords found in their summaries. For example: If we searched for the word “history”. We get the id 24(2 occurrence and 44(one occurance). In this case the search should show the title of id 24 as the first item of the list and title of id 44 as the second item of the list
 - Once the user clicks on a suggestion list item and submit, it adds a card with book title,summary, author. The form data only resets on clearing search using backspace or close button. As such, multiple items can be added with a single search.
 - There are a maximum of four cards per row. It has a zoom in effect on hover

## Testing
 - Integration test suite for autocompleteSearch Component
 - Unite tests for each of its components - SearchInput, SuggestionsList & ResultsGrid

## Optimizations
 - **Reducing Network Resources**: Uses a LRU cache to memoize results of upto 5 queries to prevent unecessary api calls when data is fetched from backend for furture cases.
 - **Reliability**: Uses a custom hook to handle Loading, Error and Success use cases of api response
 - **Performance**: Uses virtualized List using 'react-window' package to render upto 5 results visible in the viewport. The remaining can be accessed via scroll.
 - **Scalibility**: Uses pagination to limit the total number of book cards that can be added to a screen to 8 per page.

## Additions:
 - For better UX, limits the length of summary to be shown in a card. To view the entire summary, user can click on view more button to display the entire summary in a modal.
 - For better accessiblity, uses aria-labels and alt img text among other things.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\





