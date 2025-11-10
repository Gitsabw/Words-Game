<?php
// http://localhost:82/Agile%20TP/Words%20Game/Backend/Index.php

class Api {
    public function handleRequest($requestUri) {
        $Controller = new Controller();
        // Get
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            switch ($requestUri) {
                case '':
                    echo "Server is working";
                    break;
                case '/api/logout':
                    $Controller->Logout();
                    break;
                case '/api/home':
                    $Controller->Home();
                    break;
                case '/api/getword':
                    $Controller->GetWord();
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(["message" => "Not Found"]);
                    break;
            }
        }

        // Post
        elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

            switch ($requestUri) {
                case '/api/submitanswer':
                    // echo json_encode(["message" => "Submit Answer endpoint hit"]);
                    $Controller->SubmitAnswer();
                    break;
                case '/api/login':
                    $Controller->Login();
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(["message" => "Not Found"]);
                    break;
            }
        }

       
    }
}

