document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");

    const cuisine = document.getElementById("selectCuisine");
    const difficulty = document.getElementById("selectDifficulty");
    const meal = document.getElementById("selectMeal");
    const time = document.getElementById("selectTime");
    const search = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearFilters");

    function filterCards() {
        cards.forEach(card => {
            let show = true;

            // Values from selects
            const c = cuisine.value;
            const d = difficulty.value;
            const m = meal.value;
            const t = time.value;

            // Values from card dataset
            const cardCuisine = card.dataset.cuisine;
            const cardDifficulty = card.dataset.difficulty;
            const cardMeal = card.dataset.meal;
            const cardTime = parseInt(card.dataset.time);

            // Search by name
            let nameMatch = true;
            if (search.value.trim() !== "") {
                const cardName = card.dataset.name.toLowerCase();
                nameMatch = cardName.includes(search.value.toLowerCase());
            }

            // Cuisine
            if (c && cardCuisine !== c) show = false;

            // Difficulty
            if (d && cardDifficulty !== d) show = false;

            // Meal
            if (m && cardMeal !== m) show = false;

            // Time range
            if (t) {
                const [min, max] = t.split("-").map(Number);
                if (cardTime < min || cardTime > max) show = false;
            }

            // Search name
            if (!nameMatch) show = false;

            // Apply result
            card.style.display = show ? "block" : "none";
        });
    }

    // Events
    [cuisine, difficulty, meal, time, search].forEach(el =>
        el.addEventListener("input", filterCards)
    );

    // Clear Filters
    clearBtn.addEventListener("click", () => {
        cuisine.value = "";
        difficulty.value = "";
        meal.value = "";
        time.value = "";
        search.value = "";
        filterCards();
    });

});
