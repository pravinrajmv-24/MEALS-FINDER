document.addEventListener("DOMContentLoaded", function () {
    const categoryContainer = document.querySelector("#categories .row");
    const mealsContainer = document.querySelector("#meals .row");
    const categoriesSection = document.querySelector("#categories");
    const mealsSection = document.querySelector("#meals");
    const detailsSection = document.querySelector("#mealDetails");
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");

    const categoriesApiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const searchApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const mealsByCategoryApiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

    // Fetch categories from API
    async function fetchCategories() {
        try {
            const response = await fetch(categoriesApiUrl);
            const data = await response.json();
            categoryContainer.innerHTML = "";

            data.categories.forEach(category => {
                const categoryElement = document.createElement("div");
                categoryElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mb-4");
                categoryElement.innerHTML = `
                    <div class="category text-center p-3" data-category="${category.strCategory}">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="img-fluid rounded">
                        <span class="badge bg-warning text-dark mt-2">${category.strCategory}</span>
                    </div>
                `;
                categoryElement.addEventListener("click", () => loadMealsByCategory(category.strCategory));
                categoryContainer.appendChild(categoryElement);
            });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    // Fetch meals by category
    async function loadMealsByCategory(category) {
        try {
            categoriesSection.style.display = "none";
            mealsSection.style.display = "block";
            detailsSection.style.display = "none";
            mealsContainer.innerHTML = `<h2 class="text-center">${category} Meals</h2>`;

            const response = await fetch(mealsByCategoryApiUrl + category);
            const data = await response.json();
            mealsContainer.innerHTML = "";

            data.meals.forEach(meal => {
                const mealElement = document.createElement("div");
                mealElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mb-4");
                mealElement.innerHTML = `
                    <div class="meal-item text-center p-3">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded">
                        <h5 class="mt-2">${meal.strMeal}</h5>
                    </div>
                `;
                mealElement.addEventListener("click", () => displayMealDetails(meal.idMeal));
                mealsContainer.appendChild(mealElement);
            });
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    }

    // Search meals
    async function searchMeals() {
        const query = searchInput.value.trim();
        if (!query) {
            alert("Please enter a meal name to search!");
            return;
        }

        try {
            const response = await fetch(searchApiUrl + query);
            const data = await response.json();
            categoriesSection.style.display = "none";
            mealsSection.style.display = "block";
            detailsSection.style.display = "none";
            mealsContainer.innerHTML = "";

            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealElement = document.createElement("div");
                    mealElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mb-4");
                    mealElement.innerHTML = `
                        <div class="meal-item text-center p-3">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded">
                            <h6 class="mt-2">${meal.strMeal}</h6>
                        </div>
                    `;
                    mealElement.addEventListener("click", () => displayMealDetails(meal.idMeal));
                    mealsContainer.appendChild(mealElement);
                });
            } else {
                mealsContainer.innerHTML = "<p class='text-center text-danger'>No meals found!</p>";
            }
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    }



    // Fetch meal details
    async function displayMealDetails(mealId) {
        const detailsContainer = document.getElementById("mealDetails");
        detailsContainer.innerHTML = "Loading...";
        detailsContainer.style.display = "block";
        mealsSection.style.display = "none";

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();

            if (!data.meals) {
                detailsContainer.innerHTML = "<p>Meal details not found.</p>";
                return;
            }

            const meal = data.meals[0];
            detailsContainer.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <h3>Tags:</h3>
                <div class="tags-container">${getTags(meal.strTags)}</div>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <h3>Ingredients:</h3>
                <ul>${getIngredientsList(meal)}</ul>
                <a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>
                <button class="btn btn-secondary mt-3" onclick="goBack()">Go Back</button>
            `;
        } catch (error) {
            detailsContainer.innerHTML = "<p>Error fetching meal details.</p>";
            console.error("Error fetching meal details:", error);
        }
    }

    // Function to format tags
    function getTags(tags) {
        if (!tags) return `<span class="tag">No Tags</span>`;
        return tags.split(",").map(tag => `<span class="tag">${tag.trim()}</span>`).join('');
    }

    function getIngredientsList(meal) {
        let ingredientsHTML = `<div class="ingredients-container">`;

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredientsHTML += `
                    <div class="ingredient-item">
                        <span class="ingredient-name">${ingredient}</span>
                        <span class="ingredient-measure">${measure ? measure : "As needed"}</span>
                    </div>
                `;
            }
        }

        ingredientsHTML += `</div>`;
        return ingredientsHTML;
    }



    function goBack() {
        detailsSection.style.display = "none";
        mealsSection.style.display = "block";
    }

    searchButton.addEventListener("click", searchMeals);
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMeals();
        }
    });

    fetchCategories();
});
