let events = [push, pop, peek]; //list the events
let buttons = document.getElementsByTagName('button'); //get a list of all the button elements in the document
for (let i =0; i < events.length; i++){ //loop through each button and add the event listeners
  buttons[i].addEventListener('click', events[i]);
}

document.addEventListener('keydown', function(e) {  //add event listener to the document and pass the event as an arg
  console.log(e.keyCode);

  if (e.which == 13) { //if the event code matches our terget key, trigger the click event
    $("#push").click();
  }

  if(e.which == 8){
    $("#pop").click();
    e.preventDefault(); //prevent the default behavior for these event (delete key)
  }

  if(e.which == 220){
    $('#peek').click();
    e.preventDefault(); //prevent the default behavior for these event (backslash key)
  }

});

