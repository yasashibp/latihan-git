const input = document.querySelector('.input-key')
const search = document.querySelector('.search-btn')

search.addEventListener("click", async function(){
    try{
        const movies = await getMovie(input.value)
        updateUI(movies)
    } catch(e) {
        console.log(e)
    }
})

function getMovies(keyword) {
}