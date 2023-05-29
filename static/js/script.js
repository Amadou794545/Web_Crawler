document.getElementById('confirm').addEventListener('click', () => {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/?month=${month}&year=${year}`);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const reponseContent = document.getElementById('reponseContent');
            if (response.message) {
                reponseContent.textContent = response.message;
            } else {
                reponseContent.textContent = response.eventsText;
            }
        }
    };
    xhr.send();
});