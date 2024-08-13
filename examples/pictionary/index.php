<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pictionary Word Generator</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>
</head>

<body>
    <h1>Pictionary!</h1>

    <div id="select-panel" class="select-panel">
        <table>
            <tr>
                <td>
                    <span class="dropdown-label">Select Difficulty</span>
                </td>
                <td>
                    <select name="level" id="level">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="custom">Custom</option>
                    </select>
                </td>
                <td>
                    <button id="btnSubmit" onclick="displayWord()" class="button">Generate</button>
                </td>
            </tr>
        </table>
    </div>

    <div class="display" id="display"></div>

    <div class="btn-holder">
        <a href="add-word.php" class="button-link">
            Add a Custom Word
        </a>
        <button class="btn-clear" onclick="clearCustomWords()">Clear custom words</button>
    </div>

    <?php require "dataConnector.php"; ?>

    <script>
        const easyWords = [<?php echo $easy ?>];
        const mediumWords = [<?php echo $medium ?>];
        const hardWords = [<?php echo $hard ?>];
        const customWords = [<?php echo $custom ?>];


        function clearCustomWords() {
            let res = confirm('Are you sure you want to clear the custom word list?')
            if (!res) return

            $.ajax({
                url: "clear-custom-words.php", //the page containing php script
                type: "post", //request type,
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        customWords = []
                    }
                }
            });

        }
    </script>
    <script src="app.js"></script>

</body>

</html>