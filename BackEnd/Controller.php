<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

class Controller {
    public function Home() {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Welcome to the Words Game, " . $_SESSION['Username']]);
    }

    public function Login() {
        header('Content-Type: application/json');
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        $username = $data['username'];
        $password = $data['password'];

        // Here you would typically validate the username and password against a database
        // For this example, we'll just check for hardcoded values
        if ($username === 'user' && $password === 'pass') {
            $_SESSION['Username'] = $username;
            echo json_encode(["status" => "success",'sessionId'=> session_id(), "message" => "User $username logged in successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Username or password is incorrect"]);
        }
    }

    public function Logout(){
        session_unset();
        session_destroy();
        echo json_encode(["status" => "success", "message" => "You Loged Out successfully"]);
    }



    public function GetWord() {
        header('Content-Type: application/json');
        $WordToGuess = file_get_contents('https://random-word-api.vercel.app/api?words=1&length=4&type=uppercase');
        $WordToGuess = json_decode($WordToGuess)[0];
        $_SESSION['CorrectWord'] = $WordToGuess;
        $_SESSION['NumberOfAttempts'] = 5;

        echo json_encode(["word" => count($_SESSION['CorrectWord']), "attempts" => $_SESSION['NumberOfAttempts']]);
    }

    public function SubmitAnswer() {
            // Just In Case Frontend Fails to Call GetAttempts First
            if($_SESSION['NumberOfAttempts'] == 0) {
                echo json_encode(["error" => "Maximum number of attempts reached."]);
                return;
            }

            // echo json_encode(["correct" => 'A', "correctWord" => 'B']);
            header('Content-Type: application/json');
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);
            $userAnswer = $data['answer'];
            // Compare words case-insensitively and send back only the correct letters
            // testing
            
            $correctWord = $_SESSION['CorrectWord'] ?? null;
            if (!$correctWord) {
                echo json_encode(["error" => "No word has been generated yet."]);
                exit;
            }
            
            $correctWord = strtoupper($correctWord);
            $userAnswer = strtoupper($userAnswer);

            $correctLetters = [];
            for ($i = 0; $i < strlen($correctWord); $i++) {
                if ($userAnswer[$i] === $correctWord[$i]) {
                    $correctLetters[] = $userAnswer[$i];
                }else {
                    $correctLetters[] = null;
                }
            }

            $_SESSION['NumberOfAttempts'] --;
            echo json_encode(["correct" => $correctLetters, "attempts" => $_SESSION['NumberOfAttempts'], "correctWord" => $correctWord]);
            
    }

    public function Test() {
        echo json_encode(["message" => "Test endpoint hit"]);
    }

}