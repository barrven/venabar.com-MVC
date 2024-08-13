
class Stack{
    constructor(){
        this.list = [];
        this.numItems = 0;
    }
    push(item){
        this.list.push(item);
        this.numItems++;
    }
    pop(){
        this.list.pop();
        this.numItems--;
    }
    peek(){
        return this.list[this.numItems -1];
    }
    getNumItems(){
        return this.numItems;
    }
    isEmpty(){
        return this.numItems === 0;
    }
}