<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Add Word</title>
</head>

<body>
    <h1>Enter a custom word</h1>

    <div class="select-panel main-parent">
        <form method="post" id="form">
            <table class="control-table">
                <tr class="control-row">
                    <td>
                        <a class="button-link" href="index.php">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
                        </a>
                    </td>
                    <td><input id="inputBox" name="newWord" class="input-box"></td>
                    <td><button id="btnSubmit" class="button" onclick="validateInput">Submit</button></td>
                    <!-- <input name="submitted" hidden value="true"> -->
                </tr>
            </table>
        </form>
    </div>

    <div class="display" id="msgDisplay"></div>

    <div class="btn-holder">
        <button class="btn-clear" hidden id="btnUndo">Undo</button>
    </div>

    <script>
        const msgDisplay = document.getElementById('msgDisplay')
        const btnSubmit = document.getElementById('btnSubmit')
        const inputBox = document.getElementById('inputBox')
        const form = document.getElementById('form')
        form.addEventListener('submit', validateInput)
        const btnUndo = document.getElementById('btnUndo')
        btnUndo.addEventListener('click', undoAdd)

        inputBox.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                validateInput(event)
            }
        })

        function validateInput(event) {
            event.preventDefault()
            if (inputBox.value === '') {
                alert('Please type a word before clicking Submit')
                return
            }

            const alphanumeric = /^[A-Za-z\s]*$/
            if (!inputBox.value.match(alphanumeric)) {
                alert('Word must contain only letters, numbers, and/or spaces')
                return
            }

            sendData()
            inputBox.value = ''
        }

        function sendData() {
            $.ajax({
                url: "add-custom-words.php", //the page containing php script
                type: "post", //request type,
                dataType: 'json',
                data: {
                    newWord: inputBox.value,
                },
                success: function(result) {
                    // console.log(result.success);
                    if (result.success) {
                        msgDisplay.innerHTML = `You successfully added the word:<br> <span class='added-word'>${result.word}</span>`
                        btnUndo.hidden = false
                        return
                    }

                    //response if not successful
                    msgDisplay.innerHTML = `${result.msg}:<br> <span class='added-word'>${result.word}</span>`

                }
            });
        }

        function undoAdd() {
            console.log('undo!')
            $.ajax({
                url: "remove-last-word.php", //the page containing php script
                type: "post", //request type,
                dataType: 'json',
                success: function(result) {
                    console.log(result.msg);
                    msgDisplay.innerHTML = `word removed:<br> <span class='added-word'>${result.msg}</span>`
                    btnUndo.hidden = true
                    inputBox.value = ''
                    setInterval(() => {
                        msgDisplay.innerHTML = ''
                    }, 3000)
                }
            });
        }
    </script>
</body>

</html>