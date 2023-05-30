const inputs = document.forms['date-input-form'].elements;

for (let i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener('blur', function() {

        //Different validation for different inputs
        switch(this.tagName) {
            case 'SELECT':
                if (this.value > 0) {
                    this.className = 'hasInput';
                } else {
                    this.className = '';
                }
                break;

            case 'INPUT':
                if (this.value !== '') {
                    this.className = 'hasInput';
                } else {
                    this.className = '';
                }
                break;

            default:
                break;
        }
    });
}



//Confirm button
var confirmButton = document.querySelector("#confirm");

// Ajouter un gestionnaire d'événement lorsque le bouton "Confirm" est cliqué
confirmButton.addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du bouton (rechargement de la page)

    // Récupérer les valeurs des champs de formulaire
    var month = document.querySelector("#options").value;
    var year = document.querySelector("input[name='year']").value;

    // Afficher les valeurs
    var resultContainer = document.createElement("div");
    resultContainer.textContent = "Month: " + month + ", Year: " + year;
    document.body.appendChild(resultContainer);
});


//calendrier
// Code JavaScript pour générer les jours du calendrier

// Obtenez la date actuelle
var date = new Date();

// Obtenez le mois et l'année actuels
var month = date.getMonth();
var year = date.getFullYear();

// Définissez le premier jour du mois
var firstDay = new Date(year, month, 1);

// Obtenez le nombre de jours dans le mois
var daysInMonth = new Date(year, month + 1, 0).getDate();

// Obtenez le jour de la semaine du premier jour
var firstDayOfWeek = firstDay.getDay();

// Créez une variable pour suivre le jour actuel
var currentDay = 1;

// Obtenez une référence à la tbody du tableau
var tbody = document.querySelector("tbody");

// Boucle pour générer les lignes du calendrier
for (var i = 0; i < 6; i++) {
    // Créez une nouvelle ligne dans le tbody
    var row = document.createElement("tr");

    // Boucle pour générer les cellules de chaque ligne
    for (var j = 0; j < 7; j++) {
        // Créez une nouvelle cellule dans la ligne
        var cell = document.createElement("td");

        // Vérifiez si nous devons afficher un jour ou une case vide
        if (i === 0 && j < firstDayOfWeek) {
            // Afficher une case vide avant le premier jour du mois
            cell.textContent = "";
        } else if (currentDay > daysInMonth) {
            // Afficher une case vide après le dernier jour du mois
            cell.textContent = "";
        } else {
            // Afficher le jour dans la cellule
            cell.textContent = currentDay;
            currentDay++;
        }

        // Ajoutez la cellule à la ligne
        row.appendChild(cell);
    }

    // Ajoutez la ligne au tbody
    tbody.appendChild(row);
}

