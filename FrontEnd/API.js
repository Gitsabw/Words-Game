// http://localhost:82/Agile%20TP/Words%20Game/BackEnd/Index.php/api/getword
const URL = 'http://localhost:82/Agile%20TP/Words%20Game/BackEnd/Index.php/api/';


function GetWelcomeMessage() {
    return fetch(URL + 'home')
        .then(response => response.json())
        .then(data => data.message);
}

function LogoutUser(){
    return fetch(URL + 'logout')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data})
}

function GetWord() {
    return fetch(URL + 'getword')
        .then(response => response.json())
        .then(data => { 
            console.log('fetched word:', data)
            return data; 
        })
}

function SubmitAnswer(userAnswer) {
    console.log('Submitting answer:', userAnswer);

    return fetch(URL + 'submitanswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: userAnswer }),
        credentials: 'include' // ✅ important to send cookies
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        // console.log('Response from SubmitAnswer:', data);
        return data;
    });
}

export { GetWelcomeMessage, GetWord, SubmitAnswer, LogoutUser };