var globalData = {};
var callbackCounter = 0;

$(document).ready(async function() {
    try {
        //Acá se ejecuta el código peligroso
        //Terrores más comunes son : undefined, null, formatos esperados que el usuario no cumple
        $.ajax({
            url: "https://la2.api.riotgames.com/lol/platform/v3/champions?freeToPlay=false&api_key=RGAPI-c0c5021a-5f0e-4708-b1e9-6d28fbd23c3c",
            dataType: "json",
            success: function(data) {
                console.log("Datos de campeones > " + JSON.stringify(data));
                globalData.champions = data;
                for (var i = 0; i < data.champions.length; ++i) {
                    loadChampionData(data.champions[i].id)
                }
            },
            fail: function() {

            }
        });
        console.log("Holi Holi");
        throw new Error("No te quiero saludar...");
    } catch (error) {
        //Acá se ejecuta el código en caso de falla
        console.error("Holi Holi Failure > " + error + " | stack > " + error.stack);
    } finally {
        //Acá se ejecuta el código que viene después del código peligroso
    }
    //Uso de función "lenta"
    downloadPhoto(
        //Callback de éxito 
        (doge /*respuesta de la función*/ ) => {
            //Convertir BLOB (objeto binario muy grande) en URL falsa
            var dogeURL = URL.createObjectURL(doge);
            //Append de nueva imagen del doge
            $("#champions").append('<img src="' + dogeURL + '"/>');
        },
        //Callback de error en caso de que las cosas fallen
        (error) => {
            console.log("Doge error, oh noes > " + error);
        }
    );
    /* VERSION ULTRA MODERNA ES8
    try {
        let responses = await downloadDogeAndCatte();
        let blobs = await Promise.all(responses.map((response) => { return response.blob() }));
        blobs.forEach((animale) => {
            var animaleURL = URL.createObjectURL(animale);
            $("#champions").append('<img src="' + animaleURL + '"/>');
        });
    } catch (error) {

    }*/
    //Version ES6
    downloadDogeAndCatte().then((responses) => {
        //A través de .map, transformamos el arreglo responses, en uno que contiene solo sus .blob()
        //SIN .map habría quedado : [responses[0].blob(), responses[1].blob()]
        return Promise.all(responses.map((response) => { return response.blob() }));
    }).then((animaleBlobs) => {
        animaleBlobs.forEach((animale) => {
            var animaleURL = URL.createObjectURL(animale);
            $("#champions").append('<img src="' + animaleURL + '"/>');
        });
    }).catch((error) => {

    });
});

//Función lenta, que no puede retornar inmediatamente, por lo tanto pide callbacks
function downloadPhoto(callback, errorCallback) {
    let dogePromise = fetch("http://i0.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg");
    let doge = null;
    dogePromise.then(
        //Callback de dogePromise
        (response) => {
            let blobPromise = response.blob();
            return blobPromise;
        }
    ).then(
        //Este callback pertenece a la promesa blobPromise
        (dogeRes) => {
            //Acá es como si retornaramos la respuesta
            callback(dogeRes);
            doge = dogeRes;
            return Promise.resolve(42);
        }
    ).then((el42) => {
        console.log("cuarenta y dos es > " + el42 + " y el doge es > " + doge);
    }).catch(
        //Este callback de error se llamará para CUALQUIERA de las promesas
        (error) => {
            console.error("Doge error wow > " + error);
            //Así es como avisamos de que falló lo que se quería hacer
            errorCallback(error);
        }
    );
}

/*Retornará una promesa*/
function downloadDogeAndCatte() {
    return new Promise((resolve, reject) => {
        let dogePromise = fetch("http://i0.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg");
        let cattePromise = fetch("https://pbs.twimg.com/profile_images/378800000691127784/b7d06c12e25a747b205954a58210a4c6.jpeg");

        Promise.all([dogePromise, cattePromise])
            .then(
                //Solo se ejecutará este callback en caso de que ambas retornen bien
                (responses) => {
                    console.log("Responses > " + JSON.stringify(responses));
                    console.log("Doge y catte llegaron bien");
                    resolve(responses);
                }
            ).catch(
                //Cualquiera que falle veremos el error acá
                (error) => {
                    reject(error);
                }
            )
    });
}

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

function facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("Facebook user > " + JSON.stringify(user));
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("Error > " + error);
    });
}