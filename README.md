Meal Finder Project

The Meal Finder Project is a dynamic web application that allows users to explore meals and recipes by category or search.
The application fetches meal data from [TheMealDB API](https://www.themealdb.com/) and displays it interactively using HTML, CSS, Bootstrap, FontAwesome, and JavaScript.
Users can browse meal categories, search for specific dishes, view detailed recipes, and watch YouTube cooking videos—all within a responsive, modern interface.

1. HTML Structure (`index.html`):-
The HTML file acts as the skeleton of the project, providing the structure for navigation, meal categories, meal lists, and detailed meal views.

1.1 Head Section:
* `<meta>` tags: Set character encoding (`UTF-8`) and viewport for responsive design.
* `<title>`: Displays “Meal Finder” in the browser tab.
* CSS & JS imports:
  * `index.css`: Custom styles for navbar, categories, search bar, meal cards, and meal details.
  * Bootstrap 5.3.3: Responsive layout and interactive components (navbar, buttons, offcanvas sidebar).
  * Bootstrap Icons & FontAwesome: Icons for navigation and visual appeal.
  * Bootstrap JS bundle: Enables interactive elements such as sidebar toggles and modals.
    
1.2 Body Section:
Navigation Bar:
* Fixed-top navbar with a dark/orangered theme.
* Brand logo combines a house icon and the text `MEAL FINDER`.
* Hamburger menu triggers a Bootstrap offcanvas sidebar listing meal categories.
* Categories are clickable to filter meals dynamically.

Search Bar:
* Central section with a background image for visual appeal.
* Input box for typing meal names and a search button with a search icon.
* Includes a short text guiding users on how to search.

Categories Section:
* `<section id="categories">` displays all meal categories fetched from the API.
* Initially visible on page load.
* Categories are displayed in a responsive Bootstrap grid.

Meals Section:
* `<section id="meals">` shows meals corresponding to a selected category or search.
* Initially hidden and displayed only when a category is clicked or a search is performed.

Meal Details Section:
* `<div id="mealDetails">` displays detailed information about a selected meal.
* Includes meal title, image, category, area, instructions, tags, ingredients, and YouTube recipe video.
* Go Back button allows the user to return to the meal list.

2. CSS (`index.css`):-
The CSS file handles styling, layout, and responsive design.

2.1 General Styling:
* Font: `Arial, Helvetica, sans-serif`.
* Padding for body to prevent overlap with the fixed navbar.
* Bold text for readability.
  
2.2 Navbar:
* Fixed-top with orangered color.
* Flexbox layout aligns brand and hamburger menu.
* Sidebar width: 300px, height: 100vh, scrollable.
* Smooth hover effects for links and a styled close button.

2.3 Search Bar:
* Background image with cover and center alignment.
* Flex layout for search input and button.
* Rounded input and circular button with hover effect.

2.4 Categories:
* Category cards with shadow, padding, border-radius, and hover scale effect.
* Responsive and rounded images.
* Badges display category names dynamically.

2.5 Meal Details:
* Card-like layout with shadow, padding, and border-radius.
* Tags displayed as orange badges.
* Ingredients shown in a flex grid with individual styled cards.
* Buttons include hover effects for better UX.

3. JavaScript (`scripts.js`):-
JavaScript handles dynamic content, API fetching, and user interactions.

3.1 Initial Setup:
* DOMContentLoaded event ensures scripts run after the page loads.
* DOM elements selected: `categoryContainer`, `mealsContainer`, `categoriesSection`, `mealsSection`, `detailsSection`, `searchInput`, `searchButton`.
* API URLs defined: categories, search by name, filter by category.

3.2 Fetch Categories:
* `fetchCategories()` fetches meal categories from the API.
* Dynamically generates Bootstrap grid items for each category.
* Click event triggers `loadMealsByCategory(category)`.

3.3 Load Meals by Category:
* `loadMealsByCategory(category)` hides categories, shows meals section, and fetches meals for the selected category.
* Each meal card is clickable to view detailed information.

3.4 Search Meals:
* `searchMeals()` fetches meals based on user input.
* Displays results similarly to category selection.
* Shows “No meals found!” if no results exist.
* Triggered on search button click or Enter key press.

3.5 Display Meal Details:
* `displayMealDetails(mealId)` fetches full meal details by ID.
* Populates `mealDetails` with meal name, image, category, area, instructions, tags, ingredients, and YouTube video.
* Includes Go Back functionality.

3.6 Helper Functions:
* `getTags(tags)`: Splits comma-separated tags into styled badges.
* `getIngredientsList(meal)`: Loops through ingredients and measurements to create cards.
* `goBack()`: Returns from meal details to meals section.

3.7 Event Listeners:
* Search button click → `searchMeals()`.
* Enter key press → `searchMeals()`.
* Page load → `fetchCategories()`.

4. Technologies Used:
|------------------------------------------------------------------------------|
| Technology      | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| HTML            | Structure of webpage, sections, and layout                 |
| CSS             | Styling, layout, responsive design, hover effects          |
| JavaScript      | Fetch API, dynamic rendering, interactivity                |
| Bootstrap 5     | Grid system, responsive layout, navbar, buttons, offcanvas |
| Bootstrap Icons | Icons for navigation and UI                                |
| FontAwesome     | Additional icons for aesthetics                            |
| TheMealDB API   | Meal data, categories, ingredients, recipe videos          |
|------------------------------------------------------------------------------|
