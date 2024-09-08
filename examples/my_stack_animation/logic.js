stack = new Stack(); //instantiate the stack object

function populate(){
    let display = document.getElementById('display');
    display.innerHTML = ''; //clear the last output

    if (stack.isEmpty()){
        display.innerHTML = '<div>Stack is empty</div>'
    }
    else{
        //set the top item (last item in the list)
        display.innerHTML = `<div><strong>Top&xrarr; </strong>${stack.list[stack.numItems-1]}</div>`;
        //loop backwards through the list
        for (let i = stack.numItems-2; i > -1; i--){
            display.innerHTML += `<div>${stack.list[i]}</div>`;
        }
    }

}

function push(){
    let input = document.getElementById('input');
    let value = input.value.trim();
    input.value = ''; //clear input value
    if (value === '') {
        alert('no value entered');
    }
    else {
        stack.push(value);
    }
    populate();
}

function pop(){
    if (stack.isEmpty()){
        alert('Stack is already empty');
    }
    else{
        stack.pop();
        populate();
    }
}

function peek(){
    alert('The top item in the stack is ' + stack.peek());
}