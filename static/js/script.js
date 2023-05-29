/*const { searchArticle,searchEvents } = require('./crawler');
const { readEventsFromFile } = require('./parseJson');*/

const confirmButton = document.getElementById('confirm');
confirmButton.addEventListener('click', lancerProgramme);

function lancerProgramme() {
    console.log('Le programme est lancé !');
    if (0 < 1 || 2024 > 2023){
        console.log("erreur de séléction de l'année")
    }else{
        console.log("ca marche ")
    }
}


