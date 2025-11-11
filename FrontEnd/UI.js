
function showWelcomeMessage(message) {
    document.getElementById('welcome_Message').innerText = message;
}

function RedirectToPage(pageUrl) {
    window.location.href = pageUrl;
}

function showWordToGuess(word) {
    // console.log('', word);
    
    let div = document.getElementById('word_to_guess');
    
    for (let i = 0; i < word; i++) {
        let inp = document.createElement('input');
        inp.type = 'text';
        inp.maxLength = 1;
        div.appendChild(inp);
    }
}

function showAnswers(answerData) {
    // Show attempts left
    document.getElementById('attemptsNumber').innerText = answerData.attempts;
    
    let answersDiv = document.getElementById('answers');
    let div = document.createElement('div');
    div.classList.add('answer-attempt');
    answersDiv.appendChild(div);

    // If attempts are over disable the button
    if (answerData.attempts === 0) {
        document.getElementById('submitAnswer').disabled = true;
        answerData.correct.forEach((letter, index) => {
        let input = document.createElement('input');
        input.value = letter;
        input.type = 'text';
        input.maxLength = 1;
        input.disabled = true;
        input.style.backgroundColor = letter === null ? "#ffd1caff" : "";
        input.style.borderColor = letter === null ? "#bd6254ff" : "";
        div.appendChild(input);
        });
        return;
    }

    answerData.correct.forEach((letter) => {
    let input = document.createElement('input');
    input.value = letter;
    input.type = 'text';
    input.maxLength = 1;
    input.disabled = letter === null ? false : true;
    div.appendChild(input);
    });

    // disable the button if the game is over
    if (answerData.correct.every(letter => letter !== null)) {
        document.getElementById('submitAnswer').disabled = true;
        alert('Congratulations! You guessed the word!');
    }

    
}

export { showWelcomeMessage, showWordToGuess, showAnswers, RedirectToPage };