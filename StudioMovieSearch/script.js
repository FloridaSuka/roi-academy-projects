const API_URL = "https://ghibliapi.vercel.app/films";
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
let movies = [];

async function loadMovies() {
  try {
    const response = await fetch(API_URL);
    movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    resultsDiv.innerHTML = `<p>Could not load movies. Please try again later.</p>`;
    console.error(error);
  }
}

function displayMovies(movieList) {
  resultsDiv.innerHTML = "";

  if (movieList.length === 0) {
    resultsDiv.innerHTML = `<p>No movies found.</p>`;
    return;
  }

  movieList.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}">
                   <div class="title-release">
                        <h3>${movie.title}</h3>
                        <p>${movie.release_date}</p>
                    </div>
                    <p>${movie.description}</p>
                    <p><strong>Director: ${movie.director}</strong> </p>
                `;

    resultsDiv.appendChild(movieCard);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query)
  );
  displayMovies(filtered);
});
const clearBtn = document.getElementById("clearBtn");

searchInput.addEventListener("input", () => {
  if (searchInput.value.length > 0) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";

  displayMovies(movies);
});
loadMovies();
