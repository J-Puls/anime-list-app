let entries = [{
        "mal_id": 1,
        "title": "Canaan",
        "score": 7.32,
        "airing": false,
        "rated": "R",
        "episodes": 13,
        "synopsis": `Oosawa Maria is a Japanese photographer currently working in Shanghai, China.
Along with her partner Mino, she searches for potential newsworthy stories throughout the city.
When strange events occur...`,
        "image_url": "https://cdn.myanimelist.net/images/anime/4/75789.jpg?s=c71e1f90921987c2db158f058bac662d",
        "url": "https://myanimelist.net/anime/5356/Canaan",
    },
    {
        "mal_id": 2,
        "title": "Elfen Lied",
        "score": 7.69,
        "airing": false,
        "rated": "R+",
        "episodes": 13,
        "synopsis": `Lucy is a special breed of human referred to as \"Diclonius,\" born with a short pair of horns and invisible telekinetic hands
that lands her as a victim of inhumane scientific experimentation by the go...`,
        "image_url": "https://cdn.myanimelist.net/images/anime/10/6883.jpg?s=f1ecd7a51aced2b82578e42520d112e0",
        "url": "https://myanimelist.net/anime/226/Elfen_Lied",
    },
    {
        "mal_id": 3,
        "title": "Needless",
        "score": 7.34,
        "airing": false,
        "rated": "R",
        "episodes": 24,
        "synopsis": `At the onset of World War III, nobody could have predicted the effect it would have on Japan. While it had officially ended
fifty years ago in 2150, its battles still persist. Large, mysterious areas...`,
        "image_url": "https://cdn.myanimelist.net/images/anime/2/23457.jpg?s=93f287a1c7cebc79f417a6837605aec8",
        "url": "https://myanimelist.net/anime/6030/Needless",
    },
    {
        "mal_id": 4,
        "title": "Initial D First Stage",
        "score": 8.3,
        "airing": false,
        "rated": "PG-13",
        "episodes": 26,
        "synopsis": `Unlike his friends, Takumi Fujiwara is not particularly interested in cars, with little to no knowledge about the world of
car enthusiasts and street racers. The son of a tofu shop owner, he is tasked...`,
        "image_url": "https://cdn.myanimelist.net/images/anime/13/6801.jpg?s=0bdc7c73cec8c42ea46a668da41221e0",
        "url": "https://myanimelist.net/anime/185/Initial_D_First_Stage",
    }
]

function drawEntries() {
    let contents = $('#content-container');
    $(contents).html("")
    for (let i = 0; i < entries.length; i++) {
        $(contents).append(`
        <div class="col-6 col-sm-4 col-md-3 p-sm-3">
            <figure class="figure w-100">
                <img src="` + entries[i].image_url + `" class="figure-img display-img img-fluid rounded w-100" alt="` +
                    entries[i].title + ` thumbnail">
                <figcaption class="lead text-white">` + entries[i].title + `</figcaption>
                <figcaption class="figure-caption text-light">Rating: ` + entries[i].score + ` / 10</figcaption>
                <button class="btn btn-outline-info more-info w-100 my-1" data-toggle="modal" data-obj_id="` + entries[i].mal_id +
            `" type="button" data-target="#moreInfoModal">More Info</button>
            <button class="btn btn-danger w-100 delete-btn" data-obj_id="` + entries[i].mal_id +`">Delete</button>
            </figure>
        </div>`);
    };

    addInfoBtnListeners();
}
function addInfoBtnListeners() {
    $('.more-info').on('click', function () {
        $('#info-modal-body').html("")
        let chosenID = $(this).data('obj_id');
        var index = entries.findIndex(function (item, i) {
            return item.mal_id === chosenID;
        });
        let chosenData = entries[index];
        $('#info-modal-body').append(`
            <p class="lead">Title: ` + chosenData.title + `</p>
            <p><span class="lead">Synopsis:<br></span>
                <span>
                    ` + chosenData.synopsis + `
                </span>
            </p>
            <p><span class="lead">Airing: </span><span>` + chosenData.airing + `</span></p>
            <p><span class="lead"># of episodes: </span><span>` + chosenData.episodes + `</span></p>
            <p><span class="lead">Score: </span><span>` + chosenData.score + ` / 10</span></p>
            <p><span class="lead">Rated: </span><span>` + chosenData.rated + `</span></p>
            <p><span class="lead">Information Source: </span><span><a href="` + chosenData.url + `" target="_black" rel="noopener">External Link</a>
            </span></p>
            `)
    });
    $('.delete-btn').on('click', function(){
        let chosenID = $(this).data('obj_id');
        var index = entries.findIndex(function (item, i) {
            return item.mal_id === chosenID;
        });
        entries.splice(index, 1);
        drawEntries();
    })
}

function addObj(obj){
    entries.unshift(obj);
}

$(document).ready(function () {
    $('#add-new').on('show.bs.collapse', function () {
        $('#add-new-btn').html('<i class="material-icons text-white font-weight-bold">close</i>')
    });

    $('#add-new').on('hide.bs.collapse', function () {
        $('#add-new-btn').html('<i class="material-icons text-white font-weight-bold">add</i>')
    });
    drawEntries()
    $('#add-new').on("submit", async function (e) {
        e.preventDefault();
        $('#confirm-btn').off("click");
        let query = $('#title').val();
            if (query != "") {
                let request = {},
                response= {},
                result= {};

                request = await fetch('https://api.jikan.moe/v3/search/anime?q='+ query +'&limit=1');
                response = await request.json();
                result = response.results[0];
                console.log(result)
                $('#preview-modal-body').html("");
                $('#preview-modal-body').append(`
                <div class="row">
                    <div class="col-4">
                        <img src="` + result.image_url + `" class="figure-img img-fluid rounded" alt="`+
                        result.title + ` thumbnail">
                    </div>
                    <div class="col-8">
                        <p class="lead">Title: ` + result.title + `</p>
                        <p><span class="lead">Synopsis:<br></span>
                        <span>
                            ` + result.synopsis + `
                        </span>
                    </p>
                        </div>
                </div>`);
                    $('#confirm-btn').on('click', function(){
                        addObj(result);
                        drawEntries();
                        $('#title').val("");
                        $('#previewModal').modal('hide');
                    })
                    $('#decline-btn').on('click', function(){
                        $('#title').val("");
                        $('#previewModal').modal('hide');
                    })
                    $('#previewModal').modal('show');
  
            }
        })
    });


    