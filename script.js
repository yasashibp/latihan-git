const input = document.querySelector('.input-key')
const search = document.querySelector('.search-btn')

search.addEventListener("click", async function(){
    try{
        const movies = await getMovies(input.value)
        updateUI(movies)
    } catch(e) {
        console.log(e)
    }
})

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=51d2c137&s='+ keyword)
    .then(respon => {
        if(!respon.ok){
            throw new Error(respon.statusText)
        }
        return respon.json()
    })
    .then(respon => {
        if(respon.Respon === "False")
        {
            throw new Error(respon.Error)
        }
        return respon.Search
    })
}

function updateUI(isi) {
    let card ='';
    isi.forEach(m => card += showCard(m));
    const movieCont = document.querySelector('.theMovie')
    movieCont.innerHTML = card
}

// ketika tombolnya di klik (menggunakan event binding) 
document.addEventListener("click", async function(a) {
    if(a.target.classList.contains('modal-btn'))
    {
        const imdbid = a.target.dataset.imdbid
        const movieDetail = await getMovieDetail(imdbid)
        updateUIDetail(movieDetail)
    }
})

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=51d2c137&i=' + imdbid)
    .then(response => response.json())
    .then(m => m)
}

function updateUIDetail (m) {
    const movieDetail = showTheFIlm(m)
    const mbdy = document.querySelector('.modal-body')
    mbdy.innerHTML = movieDetail
}


function showCard(m) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <p class="card-text">${m.Year}</p>
          <a href="#" class="btn btn-primary modal-btn" data-imdbid="${m.imdbid}">description</a>
        </div>
      </div>
</div>`
}

function showTheFIlm (m) {
    return`<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title}(${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actros : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writers : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>plot : </strong>${m.Plot}</li>
              </ul>
        </div>
    </div>
  </div>`
}