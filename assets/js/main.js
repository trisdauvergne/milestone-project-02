var data = null;

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// Function to clear search bar when user clicks in it to type an artist name
function clearFunction() {
    document.getElementById("search").value = "";
}

// Function to reset the preset value in the search bar after the search is activated
function clearSearch() {
    document.getElementById("search").value = "artist name";
}

function clearResults() {
    document.getElementById("song-list").innerHTML = "";
    document.getElementById("small-songs-list").innerHTML = "";
    document.getElementById("small-songs-header").innerHTML = "";
    document.getElementById("song-header-xs").innerHTML = "";
    document.getElementById("sm-listen-header").innerHTML = "";
    document.getElementById("lg-song-listen").innerHTML = "";
    document.getElementById("sm-song-listen").innerHTML = ""; 
    document.getElementById("lg-artwork-box").innerHTML = "";
}

// First user step: artist name search function
function search() {

    let inputValue = document.getElementById("search").value;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var response = JSON.parse(this.responseText);

            // The data received from the search function
            var responseData = response.data;

            // Search action to filter results that only include words from inputValue and removes duplicates 
            var artistList = [];

            // To reset the search when a new artist is clicked
            // document.getElementById("artist-names").innerHTML = "";

            var html_string = ""; // added by Xav 11/03

            for (i = 0; i < responseData.length; i++) {
                var initialArtistNames = responseData[i].artist.name;
                if (initialArtistNames.toLowerCase().includes(inputValue.toLowerCase())) {
                    if (artistList.includes(initialArtistNames) == false) {
                        artistList.push(initialArtistNames);

                        html_string += `<button type="button" id="artists" class="highlighted-buttons" onclick="artistSong('${initialArtistNames}')">` + initialArtistNames.toLowerCase() + "</button>" + "<br>"; // added by Xav 11/03     

                        // Send names to column in larger screens
                        document.getElementById("artist-names").innerHTML += `<button type="button" id="artists" class="highlighted-buttons" onclick="artistSong('${initialArtistNames}')">` + initialArtistNames.toLowerCase() + "</button>" + "<br>";

                        // Send names to column in smaller screens
                        document.getElementById("small-artist-names").innerHTML += `<button type="button" id="artists" class="highlighted-buttons" onclick="artistSong('${initialArtistNames}')">` + initialArtistNames.toLowerCase() + "</button>" + "<br>";
                        console.log("FIRST pass");
                    }
                }
            }

            document.getElementById("artist-names").innerHTML = html_string;
            document.getElementById("small-artist-names").innerHTML = html_string;
            document.getElementById("artist-header").innerHTML = `<h2 class="category-header disappear-small">artist</h2>
            <h3 id="next-step">select an artist.</h3>`;
            document.getElementById("small-artist-header").innerHTML = `<h2>artist</h2>
            <h3 id="next-step">select an artist.</h3>`;
            document.getElementById("artist-header").style.borderLeft = "1px solid #000";
            document.getElementById("artist-results").style.borderLeft = "1px solid #000";
            document.getElementById("artist-bottom").style.borderLeft = "1px solid #000";
            // document.getElementById("artist-bottom").innerHTML = `<h3 id="next-step">click on a name.</h3>`;
            // document.getElementById("artist-bottom-small").innerHTML = `<h3 id="next-step">click on a name.</h3>`;

        }
    });

    xhr.open("GET", "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + inputValue);
    xhr.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "188d30da21msh99fa3832c206cd5p1eb131jsn0acc1b025fc9");
    xhr.send(data);

}

// // Second function: When the user clicks on an artist name, that element generates a new search for that artist's popular songs

function artistSong(artistName) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            console.log(this.responseText);
            var artistResponse = JSON.parse(this.responseText);

            // The data received from the specific artist name search
            var artistData = artistResponse.data;

            // Empty array 
            var duplicateList = [];

            //Search function
            document.getElementById("song-list").innerHTML = "";
            for (i = 0; i < artistData.length; i++) {
                var songList = artistData[i].title;
                var artwork = artistData[i].artist.picture_medium;
                // Input song titles in a large screen
                document.getElementById("song-list").innerHTML += `<div><button type="button" id="clickable-songs" onclick="songListen('${artistData[i].preview}');albumArtwork('${artistData[i].album.cover_big}')">` + songList.toLowerCase() + "</button>" + "</div>";
                // Input song titles in a smaller screen
                document.getElementById("small-songs-list").innerHTML += `<div><button type="button" id="clickable-songs" onclick="songListen('${artistData[i].preview}')">` + songList.toLowerCase() + "</button>" + "</div>";
                console.log("SECOND pass");
            }

            document.getElementById("popular-songs").innerHTML = `<h2 class="category-header disappear-small">songs</h2>
            <h3 class="disappear-small" id="next-step">click on a song.</h3>`;
            document.getElementById("small-songs-header").innerHTML = `<h2>songs</h2><h3 id="next-step">click on a song.</h3>`;
            document.getElementById("song-header-xs").innerHTML = `<h2>songs</h2><h3 id="next-step">click on a song and it will appear at the top.</h3>`;
            document.getElementById("popular-songs").style.borderLeft = "1px solid #000";
            document.getElementById("song-results").style.borderLeft = "1px solid #000";
            document.getElementById("song-bottom").style.borderLeft = "1px solid #000";
            document.getElementById("small-songs-header").style.borderLeft = "1px solid #000";
            document.getElementById("small-songs-list").style.borderLeft = "1px solid #000";
            // document.getElementById("song-bottom").innerHTML = `<h3 id="next-step">click on a song.</h3>`;
            // document.getElementById("song-bottom-small").innerHTML = `<h3 id="next-step">click on a song.</h3>`;
            // document.getElementById("song-bottom-xs").innerHTML = `<h3 id="next-step">click on a song and it'll appear at the top.</h3>`;
        }
    });

    xhr.open("GET", "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artistName);
    xhr.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "188d30da21msh99fa3832c206cd5p1eb131jsn0acc1b025fc9");
    xhr.send(data);
}


// Function to preview song & see album artwork

function songListen(preview) {

    document.getElementById("lg-listen-header").innerHTML = `<h2 class="category-header disappear-small">listen</h2>
    <h3 id="next-step">listen to the clip.</h3>`;
    document.getElementById("sm-listen-header").innerHTML = `<h2>listen</h2>
    <h3 id="next-step">listen to the clip.</h3>`;
    // document.getElementById("sm-song-listen").innerHTML = `<h2>listen</h2>
    // <h3 id="next-step">listen to the clip above.</h3>`;

    document.getElementById("lg-listen-header").style.borderLeft = "1px solid #000";
    document.getElementById("lg-preview-column").style.borderLeft = "1px solid #000";
    document.getElementById("lg-preview-bottom").style.borderLeft = "1px solid #000";
    document.getElementById("sm-listen-header").style.borderLeft = "1px solid #000";
    document.getElementById("sm-song-results").style.borderLeft = "1px solid #000";

    document.getElementById("lg-song-listen").innerHTML = `<audio controls volume=0.1 src="` + preview + `" type="audio/mpeg" class="audio-player"></audio>`;   
    document.getElementById("sm-song-listen").innerHTML = `<audio controls volume=0.1 src="` + preview + `" type="audio/mpeg" class="audio-player"></audio>`;
    document.getElementById("xs-song-listen").innerHTML = `<audio controls volume=0.1 src="` + preview + `" type="audio/mpeg" class="audio-player"></audio>`;
}

function albumArtwork(artworkLink) {
    document.getElementById("lg-artwork-box").innerHTML = `<img src="` + artworkLink + `"></img>`;
    document.getElementById("sm-artwork-box").innerHTML = `<img src="` + artworkLink + `"></img>`;     
}

// $("#search").toggleClass("foo")

// $("#search").toggleClass("foo")