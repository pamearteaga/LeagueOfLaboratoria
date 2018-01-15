var globalData = {};
var callbackCounter = 0;

$(document).ready(function() {
    $.ajax({
        url: "https://la2.api.riotgames.com/lol/platform/v3/champions?freeToPlay=false&api_key=RGAPI-c0c5021a-5f0e-4708-b1e9-6d28fbd23c3c",
        dataType: "json",
        success: function(data) {
            console.log("Datos de campeones > " + JSON.stringify(data));
            globalData.champions = data;
            for (var i = 0; i < data.champions.length; ++i) {
                loadChampionData(data.champions[i].id)
            }
        }
    });
    console.log("Holi Holi");
});

function loadChampionData(id) {
    $.ajax({
        url: "https://la2.api.riotgames.com/lol/platform/v3/champions/" + id + "?api_key=RGAPI-c0c5021a-5f0e-4708-b1e9-6d28fbd23c3c",
        dataType: "json",
        success: function(data) {
            globalData[id] = data;
            $("#champions").append("<h2>" + data.id + " está activo : " + data.active + "</h2>");
            contador();
        },
        complete: contador
    });
}

function contador() {
    callbackCounter++;
    console.log("Counter " + callbackCounter);
    console.log("globalData.champions.length > " + globalData.champions.champions.length)
    if (globalData.champions.champions.length == callbackCounter) {
        miOtraFunction();
    }
}

function miOtraFunction() {
    console.log("Terminé de procesar los campeones");
}