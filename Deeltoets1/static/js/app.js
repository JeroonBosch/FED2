var favMovies = favMovies||{}; //namespace

(function() { //self-invoking anonymous function

    var myRequest = new XMLHttpRequest();
    var movieData;
    //var myReponse;

	favMovies.controller = { //controllers
		init : function (){
			favMovies.router.init(); //initialize routie
            favMovies.httpReq.init(); //data opvragen
            favMovies.section.init(); //initialize transparency -> render
            favMovies.swipe.init();
		}
	};


	favMovies.router = {
        init: function () {
            //document.getElementsByClassName("movieTitle").onclick = function() {favMovies.router.showDetails(this.innerHTML)};

            routie({ 
                "about": function () {
                    favMovies.section.toggle('about');
                    console.log("about"); //this gets called when hash == #about
                },
                "movies/id/?:name": function (name) {
                    favMovies.section.toggle('detail');
                    console.log("detail"); //this gets called when hash == #movies/id/name
                },
                "movies/genre/?:genre": function (genre) {
                     favMovies.section.toggle('loading');
                    // Delay ingevoegd om spinner te laten zien.
                    setTimeout(function() {
                        favMovies.section.toggle('movies');
                        favMovies.section.movies(genre);
                        console.log("movies/genre: " + genre);
                    }, 2000);
                }
            });
        },

        showDetails: function (element) {

            parent.location.hash = "movies/id/" + element;

            console.log(element);

            var detailData = JSON.parse(localStorage.getItem('moviedb'));

            var detailData = 
                _.filter(detailData, function (data) {
                    /*var escapedUrl = data.title.replace(/ /g,"-").toLowerCase();
                    console.log(escapedUrl);*/
                    if (element === data.title) {
                        console.log("swag");
                        return data;
                    };
                });

            console.log(detailData);

            _.map(detailData, function (movie) {
                movie.reviews = _.reduce(movie.reviews, function (totalScore, review) {
                    return totalScore + review.score;
                }, 0) / _.size(movie.reviews);
            });

            favMovies.pageContent.movieDetail = detailData;
            favMovies.section.detail();
        }
    };

    //swipeEffect
    favMovies.swipe = {
        init: function() {
            var element = document.getElementById('detail');
            var hammertime = Hammer(element).on("swiperight", function(event) {
                document.getElementById('movieClick').click();
            });
        }
    };

    //Content rendered by favMovies.section
    favMovies.pageContent = { //titel, releaseDate, etc. verwijzen naar HTML 'data-bind'
        about : {
            titel: "About this app",
            paragraaf1: "This app shows some movies with some random details for shits and giggles.",
            paragraaf2: "Click on things to do things so you may see that things sometimes work.",
            link: "Like here!"
         },

        movies : [
        ],

        movieDetail : [
        ],

        directives: {
            cover: {
                src: function () {
                    return this.cover; //verwijst naar URL in de favMovies.content.movies.cover
                }
            }
        },
    };

    favMovies.section = {

        init: function () {
            this.about();
            this.movies("none");
            this.detail();
        },

        about: function () {
            Transparency.render(document.getElementById("about"), favMovies.pageContent.about); //rendert de HTML section 'about'
            favMovies.section.toggle('about');
        },

        movies: function (filter) {
            //document.getElementById("paginatitel").innerHTML = "Favorite movies";
            var filteredData = JSON.parse(localStorage.getItem('moviedb'));
            if(filter == "" || filter == "All") {
                //nothing
            } else if(filter) {
                filteredData = _.filter(filteredData, function(movie) {
                    return _.contains(movie.genres, filter);
                });
            };

            var el = document.getElementsByClassName("movieTitle");
            console.log("el: " + el.length);
            for (var i=0;i<el.length; i++) {
                el[i].onclick = function() {favMovies.router.showDetails(this.innerHTML)};
            }

            Transparency.render(document.getElementById('movieArticle'), filteredData, favMovies.pageContent.directives); 
        },

        detail: function () {
            Transparency.render(document.getElementById("movieDetail"), favMovies.pageContent.movieDetail, favMovies.pageContent.directives);
        },

        toggle: function (section) {
            var sections = document.querySelectorAll('section');

            for (i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
                sections[i].classList.add('inactive');
            }

            document.getElementById(section).classList.remove('inactive');
            document.getElementById(section).classList.add('active'); //voegt een .active class aan de sections toe, wanneer deze geselecteerd is
        }
    };

    favMovies.httpReq = {
        init: function () {
            myRequest.onreadystatechange = function()
            {
                if (myRequest.readyState==4 && myRequest.status==200)
                {
                    movieData = JSON.parse(myRequest.responseText); //krijg response array met objecten, moet movies vervangen
                    localStorage.setItem('moviedb', myRequest.responseText);
                }
            }

            if (JSON.parse(localStorage.getItem('moviedb')) != null) { //als er al movie data is
                movieData = JSON.parse(localStorage.getItem('moviedb')) //dan gebruik dit
                console.log("DEBUG: Data gevonden.");
            } else {
                myRequest.open("GET", "http://dennistel.nl/movies", true); //anders, haal op
                myRequest.send();
                console.log("DEBUG: Data opgehaald.");
            }
           
            _.map(movieData, function (movie) {
                movie.reviews = _.reduce(movie.reviews, function (totalScore, review) {
                    return totalScore + review.score;
                }, 0) / _.size(movie.reviews);
            });

            _.map(movieData, function (movie) {
                movie.genres = movie.genres.toString();
            });

            console.log(movieData); //after: de review gemiddelde berekenen
            favMovies.pageContent.movies = movieData;
        }
    }

    /*favMovies.filter = {
    }*/

    favMovies.controller.init(); //uitvoeren van de controller, om ook daadwerkelijk iets te doen
})();