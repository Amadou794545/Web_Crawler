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


