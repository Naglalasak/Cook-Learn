document.addEventListener("DOMContentLoaded", function() {
    // Existing selects
    var selectDiff = document.getElementById("selectDiff");
    var selectMeal = document.getElementById("selectMeal");
    var selectTime = document.getElementById("selectTime");
    var clearBtn = document.getElementById("clearFilters");
    // NEW: Search inputs
    var searchNavbar = document.getElementById("searchNavbar");
    var searchPage = document.getElementById("searchPage");
    
    var cards = document.querySelectorAll(".cards .card");

    // PPT Style: Named function declaration
    function filterCards() {
        var diffVal = selectDiff.value.toLowerCase();
        var mealVal = selectMeal.value.toLowerCase();
        var timeVal = selectTime.value.toLowerCase();

        // NEW: Get search terms
        var searchNavbarVal = searchNavbar.value.toLowerCase();
        var searchPageVal = searchPage.value.toLowerCase();
        var searchTerm = searchNavbarVal || searchPageVal; // Use either search bar

        // PPT Style: forEach loop (modern but matches examples)
        cards.forEach(function(card) {
            var cardDiff = card.dataset.difficulty.toLowerCase();
            var cardMeal = card.dataset.meal.toLowerCase();
            var cardTime = card.dataset.time.toLowerCase();

            // NEW: Search in title and description
            var cardTitle = card.querySelector("h3").innerText.toLowerCase();
            var cardDesc = card.querySelector("p").innerText.toLowerCase();

            // PPT Logic: Match if no filter OR exact match
            var matchDiff = !diffVal || cardDiff === diffVal;
            var matchMeal = !mealVal || cardMeal === mealVal;
            var matchTime = !timeVal || cardTime === timeVal;

            // PPT Style: Direct style.display manipulation
            // NEW: Search match (empty = match all)
            var matchSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);

            if (matchDiff && matchMeal && matchTime && matchSearch) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    // PPT Style: Individual addEventListener calls
    selectDiff.addEventListener("change", filterCards);
    selectMeal.addEventListener("change", filterCards);
    selectTime.addEventListener("change", filterCards);

    // NEW: Search bar event listeners (real-time typing)
    searchNavbar.addEventListener("keyup", filterCards);
    searchPage.addEventListener("keyup", filterCards);

    // PPT Style: Clear button with named function
    // Clear filters function (clears search too!)
    function clearFilters() {
        selectDiff.value = "";
        selectMeal.value = "";
        selectTime.value = "";
        searchNavbar.value = "";
        searchPage.value = "";
        filterCards();
    }
    
    clearBtn.addEventListener("click", clearFilters);

    filterCards(); // Show all initially
});