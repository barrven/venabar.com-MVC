class Player{
    constructor(name = 'player', isHuman = false){
        this.name = name
        this.hand = []
        this.suitStats = []
        this.isHuman = isHuman
    }

    takeCard(){
        return this.hand.pop()
    }

    takeCardByIndex(index){
        return this.hand.splice(index, 1)[0]
    }

    addCard(card){
        return this.hand.push(card)
    }

    getHand(){
        return this.hand
    }

    getSuitStats(){
        return this.suitStats
    }

    generateSuitStats(suits){
        let i = 0
        let count = 0
        for (const suit of suits) {
            
            count = this.hand.reduce((numMatches, card) => {
                if (card.suit === suit) {
                    numMatches++
                    return numMatches
                }

                return numMatches
            }, 0)

            this.suitStats[i++] = { suit, count }
        }

        //adds the isSmallest attribute to suitStats
        this.findSmallestSuitCount()
        return this.suitStats
    }

    findSmallestSuitCount(){
        
        //filter out the suits which the player doesn't have in their hand
        let filtered = this.suitStats.filter((stat) =>{
            return stat.count > 0
        })
        
        //find the suit with the smallest count
        let smallestCountIndex = 0
        for (let i = 0; i < filtered.length; i++){
            if(filtered[i].count < filtered[smallestCountIndex].count){
                smallestCountIndex = i
            }
        }
        
        let smSuit = filtered[smallestCountIndex].suit
        for (const stat of this.suitStats) {
            if(stat.suit === smSuit){
                stat.isSmallest = true //mark it as smallest count
                continue
            }
            stat.isSmallest = false
        }
        
    }

    getCardIndexBySuit(suit){
        let i = 0
        for(const card of this.hand){
            if (card.suit===suit) return i
            i++
        }
        return -1
    }
}