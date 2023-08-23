require('dotenv').config();
const axios = require("axios");
const mediaArray = require("./mediaArr");

async function searchBox(app) {
    app.post("/search", async (req, res) => {
        try {
            let movieData = (await mediaArray((await axios.get("https://api.themoviedb.org/3/search/movie?api_key="+process.env.TMDB_KEY+"&query=" + req.body.searchText)).data, "movie"));

            let tvData = (await mediaArray((await axios.get("https://api.themoviedb.org/3/search/tv?api_key="+process.env.TMDB_KEY+"&query=" + req.body.searchText)).data, "tv"));

            res.json(movieData, tvData);
        }
        catch (err) {
            console.log(err);
        }
    })
    app.post('/query', async (req, res) => {
        if (req.body.type == 'movie' || 'null') {
            try {
                let movieData = (await axios.get('https://api.themoviedb.org/3/movie/' + req.body.id + '?api_key='+process.env.TMDB_KEY))
                // console.log(movieData);
                res.json(movieData.data)
            }
            catch (e) {
                try {
                    let tvData = (await axios.get('https://api.themoviedb.org/3/tv/' + req.body.id + '?api_key='+process.env.TMDB_KEY))
                    res.json(tvData.data)
                    // console.log(tvData);
                }
                catch (err) {
                    res.json('not found')
                }
            }
        }
        else if (req.body.type == 'tv') {
            try {
                let tvData = (await axios.get('https://api.themoviedb.org/3/tv/' + req.body.id + '?api_key='+process.env.TMDB_KEY))
                // console.log(tvData);
                res.json(tvData.data)
            }
            catch(e)
            {
                res.json('not found')
            }
        }

    })
}
module.exports = searchBox