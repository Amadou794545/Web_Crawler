const { searchArticle,searchEvents } = require('./crawler');
const { readEventsFromFile } = require('./parseJson');


const monthSelect = document.getElementById('month');
const selectedMonth = monthSelect.value;

const yearInput = document.getElementById('year');
const selectedYear = yearInput.value;


const confirmButton = document.getElementById('confirm');
confirmButton.addEventListener('click', lancerProgramme);

function lancerProgramme() {
    console.log('Le programme est lancé !');
    if (selectedYear < 1 || selectedYear > 2023){
        console.log("erreur de séléction de l'année")
    }else{
        searchEvents(selectedMonth, selectedYear)
        var eventsJSON = readEventsFromFile()
        console.log("ca marche ")
    }
    // Vous pouvez appeler votre fonction ou exécuter d'autres opérations ici
}


