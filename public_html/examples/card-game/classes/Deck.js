class Deck{
    constructor(values, suits){
        this.cards = [] //array of card objects
        this.values = values // index order determines value
        this.suits = suits
        this.size = values.length
        this.populate()
        this.shuffle()
    }

    populate(){
        //iterate through values and combine with suits
        for (const suit of this.suits) {
            for (const value of this.values) {
                //store as string so shuffle can randomize
                this.cards.push(`${value}-${suit}`)
            }
        }
        
    }

    shuffle(){
        this.cards = this.randomizeArray(this.cards)
        
        //convert strings to objects
        this.cards.forEach((card, i) => {
            let temp = card.split('-')
            this.cards[i] = {value: temp[0], suit: temp[1]}
        })
    }

    takeCard(){
        let temp = this.cards.pop()
        this.size = this.cards.length
        return temp //returns undefined if cards is empty
    }

    takeCardFromFront(){
        let temp = this.cards.shift()
        this.size = this.cards.length
        return temp
    }

    addCard(card){
        if(this.cards.size === this.values.size) return false //don't allow if deck is full
        this.size = this.cards.push(card)
        return true
    }

    randomizeArray(arr){
        let output = []
        let random
        let i = 0
        while (i < arr.length) {
            random = this.getRandomInt(0,arr.length-1)
            //if the temp value is already in the list, skip this iteration
            if(output.includes(arr[random])) continue
            //otherwise add it to the list and incrememnt i
            output[i++] = arr[random]
        }
        return output
    }

    getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

}