"use strict";

movies.splice(50)



// ---------------NORMALIZE ALL MOVIES ---------------//

const AllMovies=movies.map((movies)=>{
    return {
        title:movies.title,
        year:movies.year,
        lang:movies.language,
        category:movies.categories,
        id:movies.imdbId,
        time:`${Math.floor(movies.runtime/60)}h ${movies.runtime%60}m`,
        info:movies.summary,
        link:`https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg:movies.bigThumbnail,
        minImg:movies.smallThumbnail,
        rating:movies.imdbRating,
    }   
})

console.log(AllMovies);

// ---------------NORMALIZE ALL MOVIES ---------------//



// ---------------RENDER FUNCTIONS---------------//

function renderAllMovies(){

    AllMovies.forEach((e)=>{
        const card=createElement('div','card shadow-lg',`
    
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
            <button class=" btn btn-danger m-2">
                Trailer
            </button>
            <button class=" btn btn-success m-2">
              Read more...
            </button>
            <button class=" btn btn-primary m-2 fs-7">
               Add bookmark
            </button>
        </div>
        </div>  

        `);


        $('.wrapper').appendChild(card)
        
    }) 
}
renderAllMovies()

// ---------------RENDER FUNCTIONS---------------//



// ---------------FIND FILM FUNCTION---------------//


const findFilm=(regexp, rating)=>{

    return AllMovies.filter((film)=>{
        return film.title.match(regexp) && film.rating >= rating
    })    

}




// ---------------Find Films Listener---------------//
$('#submitForm').addEventListener('submit', ()=>{
    
    $('.wrapper').innerHTML=`<span class="loader"></span>`
    
    const searchValue=$('#filmName').value;
    const filmRating=$('#filmRating').value
    const regexp=new RegExp(searchValue, "gi");
    const searchResult=findFilm(regexp, filmRating)

    setTimeout(() => {
        if(searchResult.length>0){

            searchResultsRender(searchResult);

            $('#card-res').classList.remove('d-none');
            $('.res').innerHTML=`<strong>${searchResult.length}</strong> movies found`;

            if(searchValue.length === 0 && filmRating.length === 0 ){
                $('#card-res').classList.add('d-none');
            }

        }else{
            $('#card-res').classList.add('d-none');            
            $('.wrapper').innerHTML=`<h1 class=" no-result text-danger position-absolute">No Matching Results</h1>`;
        }
    }, 2000);

    
 
})
// ---------------Find Films Listener---------------//


// ---------------Find Films Render Function---------------//
function searchResultsRender(data=[]){
    
    $('.wrapper').innerHTML='';

    data.forEach((e)=>{
       
        const card=createElement('div','card shadow-lg',`
        
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
            <button class=" btn btn-danger m-2">
                Trailer
            </button>
            <button class=" btn btn-success m-2">
              Read more...
            </button>
            <button class=" btn btn-primary m-2 fs-7">
               Add bookmark
            </button>
        </div>
        </div>  

        `);


        $('.wrapper').appendChild(card)
        
    }) 
}
// ---------------Find Films Render Function---------------//

// ---------------FIND FILM FUNCTION---------------//


