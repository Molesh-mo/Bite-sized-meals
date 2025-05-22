const findBtn=document.getElementById("findRecipesBtn");
const input = document.getElementById("ingredientsInput");
const recipesContainer = document.getElementById("recipesContainer");

const API_KEY ="6d9467e1b53641c9bc0f9ac58e224ad1";

findBtn.addEventListener("click", () => {
    const ingredients = input.value.trim();
  
    if (!ingredients) {
      alert("Please enter at least one ingredient.");
      return;
    }
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      recipesContainer.innerHTML = "";

      if (data.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      data.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}" width="100%">
        `;
        recipesContainer.appendChild(recipeDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching recipes:", error);
    recipesContainer.innerHTML = "<p>Error fetching recipes. Try again later.</p>";
  });
});