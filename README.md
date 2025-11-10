# Words-Game
API URL: http://localhost:82/Agile%20TP/Words%20Game/Backend/api


// GET
    -- Welcome Message --
    End PointURL: /api/home
    
    Returns:
        {'message', 'Welcome to the Words Game'}

    -- Get The Word To Guess --
    End PointURL: URL/api/getword

    Returns:
        {'word', 'ExampleWord'}

    -- Get Attempts 
    End PointURL: /api/attempts

    Returns:
        if (attempts >= 6) :
            {"attempts" : 6, "message" : "Maximum number of attempts reached."}
        else :
            {"attempts" : 6, "message" : "You have 4 attempts left, keep going!"}


// POST
    End PointURL: URL/api/submitanswer

    Takes: // userAnswer = 'HITTO'
        body: JSON.stringify({ answer: userAnswer })
    
    Returns:
        if () :
            {"error" => "Maximum number of attempts reached."}
        else :
            {correct: Array['H',null, null, null, 'o'], correctWord: 'HITTO'}
    
