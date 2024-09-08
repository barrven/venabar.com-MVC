class AmmortizationTable {
    constructor(startDate, principal, rate, {pmt, numPeriods}){
        this.startDate = new Date(startDate.getTime())
        this.currentDate = new Date()
        this.principal = principal
        this.rate = rate
        this.pmt = pmt
        this.numPeriods = numPeriods
        this.table = []
        this.dateDiffList = []
        if (this.numPeriods === undefined && this.pmt === undefined) {
            console.error('either pmt or numPeriods must be defined')
            return
        }
        if(this.numPeriods === undefined){
            //calc based on fixed pmt
           this.calcTableByPmt()
        }
        if(this.pmt === undefined){
            //calc based on fixed num periods
            this.calcPmtByFixedNumPeriods()
            this.calcTableByPmt()
        }
    }

    calcTableByPmt(){
        let remPrincipal = this.principal
        let numPmts = 0
        let intCost
        let towardsPrinc
        let periodDate

        while (true) {
            
            intCost = remPrincipal * this.rate / 12
            towardsPrinc = this.pmt - intCost
            remPrincipal = remPrincipal - towardsPrinc
            
            if (remPrincipal < 0) return //ending condition
            
            periodDate = this.getPmtDate(numPmts)
            this.dateDiffList[numPmts] = Math.abs(periodDate.getTime()-this.currentDate.getTime())

            //create period object and add to table array
            this.table[numPmts] = {
                periodNum: numPmts+1,
                periodDate: periodDate,
                pmtDateString: periodDate.toLocaleDateString("en-CA"),
                towardsPrinc,
                intCost,
                remPrincipal
            }

            numPmts++
        }
    }

    calcPmtByFixedNumPeriods(){
        let intRate = this.rate / 12
        let n = this.numPeriods
        this.pmt = this.principal * ((intRate * (1 + intRate) ** n) / (((1 + intRate) ** n) - 1))
    }

    //returns date object
    getPmtDate(pmtNum){
        //copy the current date so that it is not mutated
        let periodDate = new Date(this.startDate.getTime())
        periodDate.setMonth(this.startDate.getMonth() + pmtNum)
        return periodDate
    }

    getNearestPeriod(){
        let index = 0
        let smallest = this.dateDiffList[index]
        this.dateDiffList.forEach((element, i) => {  
            if(element < smallest){
                index = i
                smallest = this.dateDiffList[i]
            }
        })

        return index
    }

}