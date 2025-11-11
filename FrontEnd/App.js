import  { GetWelcomeMessage, GetWord, SubmitAnswer, LogoutUser } from './API.js';
import {showWelcomeMessage, showWordToGuess, showAnswers, RedirectToPage} from './ui.js';

let WordToGuess = '';
document.addEventListener('DOMContentLoaded', () => {
    VerifySession()
    GetWelcomeMessage().then(message => {  
        showWelcomeMessage(message);
    });

    GetWord().then(data => {
        showWordToGuess(data.word);
        document.getElementById('attemptsNumber').innerText = data.attempts;
        WordToGuess = data.word;
    });
     
    document.getElementById('submitAnswer').addEventListener('click', handleSubmit);

    function handleSubmit() {
        
        // Logic to handle the submission of the guessed word
        let inputs = document.querySelectorAll('#wordsContainer input');

        let lastInputs = Array.from(inputs).slice(-WordToGuess); // get the last N inputs
        
        let invalid = Array.from(lastInputs).filter(inp => inp.value === '' || !isNaN(inp.value));

        if (invalid.length !== 0) {
            alert('All inputs must be filled with letters!');
            Array.from(invalid).map(inp => inp.value = '');
            return;
        }

        let userAnswer = lastInputs.map(input => input.value).join('');
        console.log('Last user attempt:', userAnswer);
            
        // use promise to get response
        SubmitAnswer(userAnswer).then(response => {
            console.log('Response:', response);
            showAnswers(response);
        });
    }

    document.getElementById('Logout').addEventListener('click', Logout)

    function Logout() {
        LogoutUser().then(response => {
            if(response.status === 'success'){
                localStorage.removeItem('sessionId');
                RedirectToPage('Home.html');
            }else{
                alert('Coudnt Logout!!')
            }
        });
    }

    function VerifySession() {
        // Logic to verify session
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            RedirectToPage('login.html');
        }
    }

});