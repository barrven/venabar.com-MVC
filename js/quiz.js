// note: jquery must be imported

function renderSections(arr, filterName) {
    document.getElementById('sections').innerHTML = "";

    $('#sectionTitle').text('');

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const filterStr = params.get(filterName);
    
    // Flatten the array of sections from the filtered items
    const sections = arr
    .filter((item) => filterStr === item.folder)
    .flatMap((item) => item.sections);

    if(sections.length !== 0){
        $('#sectionTitle').text('Sections');
    } else if (filterStr){
        $('#sectionTitle').text('No sections in this course');
    }
    // Loop through the flattened sections and attach each one
    sections.forEach((section) => {
        const itemElement = $('<li>', {
            class: 'section-item',
        });

        let sectionTitle = formatSectionTitle(section.title);

        const btnExpand = $('<button>', {
            class: 'section-button',
            click: () => { handleExpandClick(section, itemElement); },
            html: `
                <span>${sectionTitle}</span>
                <i class="fas fa-chevron-down"></i>`
        });
 
        itemElement.append(btnExpand);

        const divElement = $('<div>', {
            class: 'section-div',
            hidden: true,
        });

        attachSubSections(section, divElement);

        itemElement.append(divElement);

        $('#sections').append(itemElement);
    });

}

function handleButtonClick(item, e){
    // console.log('clicked', e);
}

function handleExpandClick(item, e){
    let element = e[0].querySelector('div');
    element.hidden = !element.hidden;
    e.hidden = !e.hidden;
}

function attachSubSections(item, e){
    
    item.subSections.forEach((ss) => {
        const p = $('<p>', {});
        
        const btn = $('<button>', {
            class: 'ss-button',
            click: () => { handleQuizClick(ss, formatSectionTitle(item.title)); },
            html: `
            <span>${ss}</span>
            <i class="fas fa-arrow-right"></i>
            `
        });

        p.append(btn);
        e.append(p);
    });
}

function handleQuizClick(title, section=''){
    
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);

    if (!params.get('course')) {
        alert('course must be selected before opening quiz');
        return;
    }

    url.searchParams.delete('page');
    url.searchParams.set('page', 'quizDetail');
    
    url.searchParams.set('section', section);
    url.searchParams.set('detail', title);

    window.open(url.href, '_blank');

}

function formatSectionTitle(str){
    return str.replace(/Book Chapter \d+ - /, '');
}