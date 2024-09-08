const CONT = document.getElementById('cont') //output container
const DROPDOWN = document.getElementById('dropdown') //date selector
DROPDOWN.onchange = onDropdownChange

//todo: grab these from user input
const STARTDATE = new Date(2021, 6, 30) //July 30 2021
const PRINCIPAL = 21717.53
const PMT = 356.73
const RATE = 0.0576

//custom class must be included as script in the html file
//let tableObject = new AmmortizationTable(STARTDATE, PRINCIPAL, RATE, {numPeriods: 72}) //set either pmt or nPeriods
let tableObject = new AmmortizationTable(STARTDATE, PRINCIPAL, RATE, { pmt: PMT }) //set either pmt or nPeriods


populateDropdown(tableObject)

// select the closest date to current, then use it to set the value of the dropdown
DROPDOWN.value = tableObject.getNearestPeriod()
onDropdownChange() //populate the output container

// ==================== functions ===============================

function formatCurrency(num){
    let fixed = num.toFixed(2)
    return parseFloat(fixed).toLocaleString("en-US")
}

function writeOutput(str){
    let p = document.createElement('p')
    let text = document.createTextNode(str)
    p.appendChild(text)
    CONT.appendChild(p)
}

function populateDropdown(tableObj){
    let arr = tableObj.table
    arr.forEach((element, i) => {
        addDropdownItem(i, element.pmtDateString)
    })
}

function addDropdownItem(value, text){
    let o = document.createElement('option')
    o.value = value
    o.text = text
    DROPDOWN.add(o)
}

function onDropdownChange(){
    
    let selected = tableObject.table[DROPDOWN.value]
    CONT.innerHTML = '' // clear the output container
    
    //====== object template =========
    // table[periodNum] = {
    // pmtDateString
    // towardsPrinc,
    // intCost,
    // remPrincipal
    // }
    
    writeOutput(`====== period: ${selected.periodNum} ========`)
    writeOutput(selected.pmtDateString)
    writeOutput(`principal pmt: $ ${formatCurrency(selected.towardsPrinc)}`)
    writeOutput(`intCost: $ ${formatCurrency(selected.intCost)}`)
    writeOutput(`remPrincipal: $ ${formatCurrency(selected.remPrincipal)}`)
}
