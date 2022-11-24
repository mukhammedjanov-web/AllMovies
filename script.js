"use strict";

movies.splice(50);

// ---------------NORMALIZE ALL MOVIES ---------------//

const AllMovies = movies.map((movies) => {
  return {
    title: movies.title,
    year: movies.year,
    lang: movies.language,
    category: movies.categories,
    id: movies.imdbId,
    time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
    info: movies.summary,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    maxImg: movies.bigThumbnail,
    minImg: movies.smallThumbnail,
    rating: movies.imdbRating,
  };
});

// ---------------NORMALIZE ALL MOVIES ---------------//


// ---------------RENDER FUNCTIONS---------------//

function renderAllMovies() {
  AllMovies.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
    
        <img src="${e.minImg}" alt="img">
                            
        
        <div class="card-body">
        <h4 class="card-title text-white">
            ${e.title}
        </h4>
        <ul class="list-unstyled">
            <li> <strong class="text-danger">Year: <span class="card__text">${e.year}</span> </strong> </li>
            <li> <strong class="text-danger">Language: <span class="card__text">${e.lang}</span> </strong> </li>
            <li> <strong class="text-danger">Rating: <span class="card__text">${e.rating}</span> </strong> </li>
            <li> <strong class="text-danger">Category: <span class="card__text">${e.category}</span> </strong> </li>
            <li> <strong class="text-danger">Runtime: <span class="card__text">${e.time}</span> </strong> </li>
        </ul>
        
        <div class="social d-flex">
            <a href="${e.link}" target="_blanc" class=" btn btn-danger m-2 ">
                <p class="text-center p-0 mt-2">Trailer</p> 
            </a>
            <button class=" btn btn-success m-2" data-read="${e.id}">
              Read more...
            </button>
            <button class=" btn btn-primary m-2 fs-7" data-add="${e.id}">
               Add bookmark
            </button>
        </div>
        </div>  

        `
    );

    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();

// ---------------RENDER FUNCTIONS---------------//


// ---------------CATEGORY FUNCTIONS---------------//

const dynamicCategory = () => {
  let category = [];

  AllMovies.forEach((e) => {
    e.category.forEach((el) => {
      if (!category.includes(el)) {
        category.push(el);
      }
    });
  });

  category.sort();
  category.unshift("All");

  category.forEach((e) => {
    const option = createElement("option", "item-option", e);
    $("#category").appendChild(option);
  });
};

dynamicCategory();

// ---------------CATEGORY FUNCTIONS---------------//


// ---------------FIND FILM FUNCTION---------------//

const findFilm = (regexp, rating, category) => {
  if (category === "All") {
    return AllMovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= rating;
    });
  }

  return AllMovies.filter((film) => {
    return (
      film.title.match(regexp) &&
      film.rating >= rating &&
      film.category.includes(category)
    );
  });
};

// ---------------Find Films Listener---------------//
$("#submitForm").addEventListener("submit", () => {
  $(".wrapper").innerHTML = `<span class="loader"></span>`;

  const searchValue = $("#filmName").value;
  const filmRating = $("#filmRating").value;
  const filmCategory = $("#category").value;

  const regexp = new RegExp(searchValue, "gi");

  const searchResult = findFilm(regexp, filmRating, filmCategory);

  setTimeout(() => {
    if (searchResult.length > 0) {
      searchResultsRender(searchResult);

      $("#card-res").classList.remove("d-none");
      $(
        ".res"
      ).innerHTML = `<strong>${searchResult.length}</strong> movies found`;

      if (searchValue.length === 0 && filmRating.length === 0) {
        $("#card-res").classList.add("d-none");
      }
    } else {
      $("#card-res").classList.add("d-none");
      $(
        ".wrapper"
      ).innerHTML = `<h1 class=" no-result text-danger position-absolute">No Matching Results</h1>`;
    }
  }, 2000);
});
// ---------------Find Films Listener---------------//

// ---------------Find Films Render Function---------------//
function searchResultsRender(data = []) {
  $(".wrapper").innerHTML = "";

  data.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
        
        <img src="${e.minImg}" alt="img">
                            
        
        <div class="card-body">
        <h4 class="card-title text-white">
            ${e.title}
        </h4>
        <ul class="list-unstyled">
            <li> <strong class="text-danger">Year: <span class="card__text">${e.year}</span> </strong> </li>
            <li> <strong class="text-danger">Language: <span class="card__text">${e.lang}</span> </strong> </li>
            <li> <strong class="text-danger">Rating: <span class="card__text">${e.rating}</span> </strong> </li>
            <li> <strong class="text-danger">Category: <span class="card__text">${e.category}</span> </strong> </li>
            <li> <strong class="text-danger">Runtime: <span class="card__text">${e.time}</span> </strong> </li>
        </ul>
        
        <div class="social d-flex">
            <a href="${e.link}" target="_blanc" class=" btn btn-danger m-2 ">
                <p class="text-center p-0 mt-2">Trailer</p> 
            </a>
            <button class=" btn btn-success m-2" data-read="${e.id}">
              Read more...
            </button>
            <button class=" btn btn-primary m-2 fs-7 " data-add="${e.id}">
               Add bookmark
            </button>
        </div>
        </div>  

        `
    );

    $(".wrapper").appendChild(card);
  });
}
// ---------------Find Films Render Function---------------//
// ---------------FIND FILM FUNCTION---------------//


// ---------------SHOW MODAL---------------//

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-success")) {
    const idMovie = e.target.getAttribute("data-read");
    showModal(idMovie);
    $(".modal-window").classList.remove("modal-hide");
  }
});

function showModal(id) {
  const filmModal = AllMovies.filter((e) => {
    return e.id == id;
  });

  filmModal.forEach((e) => {
    const row = createElement(
      "div",
      "row",
      `
    
        <div class="col-md-4">
                <img src="${e.minImg}" alt="img" class="img-fluid" />
              </div>
              <div class="col-md-6">
                <h4 class="text-danger">${e.title}</h4>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Rating:</strong> ${e.rating} </li>
                  <li class="list-group-item"><strong>Year:</strong> ${e.year} </li>
                  <li class="list-group-item"><strong>Runtime:</strong> ${e.time}</li>
                  <li class="list-group-item"><strong>Category:</strong>  ${e.category}</li>
                </ul>
              </div>
              <div class="col-md-12 mt-2">
                <h4 class="text-danger">${e.title}</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  odit odio corporis amet iste dignissimos, tenetur officia
                  blanditiis quidem. Excepturi ipsa odio, quia, dolorum quo
                  omnis rerum provident eius nobis quisquam magni ab suscipit,
                  commodi beatae dolore ipsum maxime necessitatibus odit tempora
                  molestiae voluptatem. Veritatis voluptatibus pariatur quaerat
                  eveniet maiores!
                </p>
        </div>
    
       
        
    `
    );

    $(".modal-content").appendChild(row);
  });
}

$(".modal-x").addEventListener("click", () => {
  $(".modal-window").classList.add("modal-hide");
  $(".modal-content").innerHTML = "";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-window")) {
    $(".modal-x").classList.toggle("animate");
  }
});

// ---------------SHOW MODAL---------------//


// ---------------BOOKMARK---------------//

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    const idMovie = e.target.getAttribute("data-add");

    addBookmark(idMovie);
  }
});

const bookmark = [];

function addBookmark(ID) {
  const filmBook = AllMovies.filter((e) => {
    return e.id == ID;
  });

  if (!bookmark.includes(filmBook[0])) {
    bookmark.push(filmBook[0]);
  } else {
    alert("previously added");
  }

  localStorage.setItem("bookmark", JSON.stringify(bookmark));
}

// ---------------BOOKMARK---------------//
