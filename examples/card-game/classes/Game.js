class Game{
    constructor(displayContID, players = []){
        this.displayContID = displayContID
        
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'],
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades']
        this.deck = new Deck(this.values, this.suits)
        
        this.maxPlayers = 5
        this.players = players
        this.numPlayers = players.length
        
        this.winner
        this.nextPIndex = 0
        this.currPIndex =0
        this.rounds = 0
        this.discardIndex
        this.player = this.players[0]
        this.card
    }

    //calls to methods from the Game class from this function must refenrece this.parent
    //since it is called by the button in the document
    startGame() {
        let sp = document.getElementById('selectPanel')
        sp.hidden = true
        //construct the players list from readStartMenu()
        let pList = this.parent.readStartMenu() //get the contents of selectionTable
        let temp
        for (const p of pList) {
            if (p.type === 'empty') continue
            temp = new Player(p.name, p.type !== 'ai')
            this.parent.players.push(temp)
            this.parent.numPlayers++
        }
        this.parent.deal()
        this.parent.play()
    }

    readStartMenu() {
        const tableRows = document.getElementById('selectionTable').getElementsByTagName('tbody')[0].rows
        let row, type, name
        let choices = []
        for (let i = 0; i < tableRows.length - 1; i++) { //ignore the last row with the button
            row = tableRows[i]
            type = row.cells[0].getElementsByTagName('select')[0].value
            name = row.cells[1].getElementsByTagName('input')[0].value
            choices.push({ type, name })
        }
        return choices
    }   

    deal(){
        //deal all the cards to the players
        for(let i = 0; i < 4; i++){
            for (const player of this.players){
                player.addCard(this.deck.takeCard()) //take card decrements deck.size
            }
        }
    }

    //===== gameplay ========
    /*
    object of game is to be the first player with 4 cards matching suit 
    or 4 consecutive values
    deal card to player, player eveluates hand to decide which card to keep
    and which card to pass to the next player
    */
 
    play(){
        //loop until winning condition
        while(this.winner === undefined){
            // back at the first player so they take from the deck
            if(this.nextPIndex === 0){
                this.card = this.deck.takeCardFromFront()
            }

            //Grab the next player then increment and loop playerIndex back to zero
            this.player = this.players[this.nextPIndex]
            this.currPIndex = this.nextPIndex
            this.nextPIndex = (this.nextPIndex + 1) % this.numPlayers
            this.player.addCard(this.card)
            //console.log('---hand',this.player.name)
            //this.log(this.player.hand)
            this.rounds++

            if(this.player.isHuman){
                this.getHumanChoice(this.player)
                break
            }

            this.discardIndex = this.evaluateHand(this.player) //also checks for winning condition
            
            this.card = this.player.takeCardByIndex(this.discardIndex)
            // console.log('---discard',this.player.name)
            // this.log(this.card)
            //the last player in the rotation puts their discard back into the deck
            if(this.currPIndex === this.numPlayers-1){
                this.deck.addCard(this.card) //adds card to end
            }
        }

        if(this.winner !== undefined && !this.player.isHuman){
            this.trackWinner(this.winner, this.rounds)
        }

    }

    trackWinner(winner, rounds) {
        let player = winner.player
        let stat = winner.stat
        //console.log(this.players)
        this.writeToScreen(`Winner! ${player.name} found ${stat.count} ${stat.suit} in ${rounds} turns`)
        this.writeCardTableToScreen(player.hand)
        this.writeToScreen('<button onClick="window.location.reload()">Play again!</button>')
    }

    //looks at player hand, checks for winning condition and sets the Game.winner object if it finds a winner
    //then returns the recommended discard index for the player.hand
    evaluateHand(player){
        // console.log(player.name, '--hand',player.hand)
        let suitStats = player.generateSuitStats(this.suits)
        // console.log('**suitStats:', player.name)
        // this.log(suitStats)
        //todo: get value stats
        
        //check if winner/find which card to discard
        let indexOfSmSuit
        for (const stat of suitStats){
            if(stat.count === 4){
                //console.log('found a winner!')
                this.winner = { player, stat }
            }
            if(stat.isSmallest){
                indexOfSmSuit = player.getCardIndexBySuit(stat.suit)
            }

        }

        //todo: add generate value stats
        //todo: add scoring system to choose whether to go for
        //suit or run of values
        // console.log('#discIndx',indexOfSmSuit)
        return indexOfSmSuit
    }

    getHumanChoice(player){
        //check if this hand is a winner
        let sd = this.evaluateHand(player)
        if(this.winner !== undefined){
            //display winning message
            player.takeCardByIndex(sd) // remove the not needed card from the player hand
            this.trackWinner(this.winner, this.rounds)
            return
        }
        this.writeToScreen(`${player.name}, choose a card to discard`)
        
        //display cards to human player
        this.writeCardTableToScreen(player.hand) //writes table with id cardDisplay
        //make displayed cards clickable
        let dispList = this.getDisplayedCards()
        let item
        for(let i = 0; i < dispList.length; i++){
            item = dispList[i]
            item.parent = this
            item.player = player
            item.selected = false
            item.onclick = this.trackCardClick
            item.index = i
        }
        //add the continue button
        let button = document.createElement('button')
        button.parent = this
        button.player = player
        button.innerText = 'Continue'
        button.onclick = this.continueGame
        document.getElementById(this.displayContID).appendChild(button)
    }

    getDisplayedCards() {
        let cardDisplay = document.getElementById('cardDisplay')
        return cardDisplay.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].cells
    }
    
    //parent of this function is Game
    trackCardClick() {
        let parent = this.parent
        parent.unselectOtherCards(this.index)
        this.selected = !this.selected
        if (this.selected) {
            this.classList.add('selected-card')
            parent.discardIndex = this.index //passed the card index as a property of the button
        }
        else {
            this.classList.remove('selected-card')
        }
    }

    unselectOtherCards(selectedIndex){
        
        let cardElements = this.getDisplayedCards()
        //console.log(cardElements[selectedIndex])
        for(let i =0; i < cardElements.length; i++){
            if(i === selectedIndex) continue
            cardElements[i].selected = false
            cardElements[i].classList.remove('selected-card')
        }
    }

    //function is called by a button displayed in the document
    continueGame() {
        let parent = this.parent
        parent.clearScreen()
        parent.card = parent.player.takeCardByIndex(parent.discardIndex)
        //the last player in the rotation puts their discard back into the deck
        if (parent.currPIndex === parent.numPlayers - 1) {
            parent.deck.addCard(parent.card) //adds card to end
        }
        parent.play()
    }

    //=========================output methods=================================

    renderMenu(){
        const selectionTableBody = document.getElementById('selectionTable').getElementsByTagName('tbody')[0]

        let row, randNameList, randName
        selectionTableBody.innerHTML = 
        `
        <tr><td colspan="2"><p class="text-center">...Loading</p></td></tr>
        `
        this.getRandomPlayerName().then((data)=>{
            selectionTableBody.innerHTML = ''
            randNameList = data.results
            //create a row for each possible player
            for (let i = 0; i < this.maxPlayers; i++) {
                randName = randNameList[i].name.first
                row = selectionTableBody.insertRow(selectionTableBody.rows.length)
                row.innerHTML =
                `
                <td class="col-width-30">
                    <select name="playerType">
                        <option value="ai">AI</option>
                        <option value="human">Human</option>
                        <option name="none">empty</option>
                        </select>
                </td>
                <td class="col-width-70">
                    <input name="playerName" value="${randName}" placeholder="${randName}">
                </td>
                `
            }

            //add the following to the table
            //<td colspan="2"><button class="start-button" onClick="">Start Game</button></td>
            row = selectionTableBody.insertRow(selectionTableBody.rows.length)
            let button = document.createElement('button')
            button.parent = this
            button.innerText = 'Start Game'
            button.className = 'start-button'
            button.onclick = this.startGame
            let td = document.createElement('td')
            td.colSpan = 2
            td.appendChild(button)
            row.appendChild(td)
        })     
       

       
    }

    async getRandomPlayerName(){
        const response = await fetch(`https://randomuser.me/api/?inc=name&results=${this.maxPlayers}&nat=us`)
        let data = await response.json()
        return data
        // return "Mr Robot"
    }

    writeToScreen(msg) {
        let out = document.getElementById(this.displayContID)
        out.innerHTML += `<p>${msg}</p>`
    }

    clearScreen(){
        document.getElementById(this.displayContID).innerHTML = ''
    }

    writeCardTableToScreen(list){
        const tbl = document.createElement('table')
        tbl.id = 'cardDisplay'
        const tr = tbl.insertRow()
        for (const card of list) {
            const td = tr.insertCell()
            td.className = 'card-displayed'
            let img = document.createElement('img')
            img.src = `assets/cards-svg/${card.value}_of_${card.suit}.svg`
            td.appendChild(img)
        }
        document.getElementById(this.displayContID).appendChild(tbl)
    }

    log(object){
        console.log(JSON.stringify(object))
    }
}