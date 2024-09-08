data = [
    {
        title: 'Fullstack Programming Tutor',
        company: 'George Brown College – Toronto, ON',
        date: 'January 2020 – Current',
        description: 'Help fellow students to understand assignment instructions, approach, and general IT and computer science concepts for their semester 1-6 coursework. Help setup necessary software. Create programming challenge questions for the Mobihelp website.'

    },
    {
        title: 'English Tutor',
        company: 'Tutoring and Learning Centre GBC – Toronto, ON',
        date: 'September 2019 – Current',
        description: 'Tutor fellow students in grammar, sentence structure, and assignment planning. Tutor ESL students in conversation, comprehension, pronunciation, and vocabulary.'

    },
    {
        title: 'Media Administrator',
        company: 'OMD Media - Toronto, ON',
        date: 'May 2019 - August 2019',
        description: 'Review discrepancy reports and resolv erroneous flags. Communicate with media partners to negotiate credit for ad spots that did not follow contract guidelines, or to obtain updated documents to show what acceptable changes took place. Note changes in hard copy file and update electronic system to reflect changes before billing. Communicate with Accounting department to identify other billing discrepancies'
    },
    {
        title: 'Office Clerk',
        company: 'TBO Capital – King City, ON',
        date: 'November 2012 – May 2017',
        description: 'Perform data entry tasks, maintain file system, handle incoming and outgoing mail, draft emails to customers, perform research tasks. Create weekly reports in excel using basic functions such as vlookup and pivot tables.'
    }
]


let tbody = document.getElementById('work-xp-content')
document.onload = renderXpTable()

function renderXpTable(){
    for (item of data) {
        let row, cell, text
        //row
        row = tbody.insertRow()
        row.classList.add("bg-light")
        row.classList.add("font-weight-bold")

        //cell 1
        cell = row.insertCell()
        text = document.createTextNode(item.title)
        cell.appendChild(text)

        cell = row.insertCell()
        text = document.createTextNode(item.company)
        cell.appendChild(text)

        cell = row.insertCell()
        text = document.createTextNode(item.date)
        cell.appendChild(text)

        //second row
        row = tbody.insertRow()

        cell = row.insertCell()
        cell.colSpan = 3

        text = document.createTextNode(item.description)
        cell.appendChild(text)
    }
}

function sortByTitle(){
    
}

