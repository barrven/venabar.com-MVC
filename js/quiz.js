
// note: jquery must be imported

function renderSections(arr, filterName) {
    document.getElementById('sections').innerHTML = "";

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const filterStr = params.get(filterName);
    let noneRendered = true;

    // Flatten the array of sections from the filtered items
    const sections = arr
        .filter((item) => filterStr === item.folder)
        .flatMap((item) => item.sections);

    // console.log(sections[0])
    // Loop through the flattened sections and attach each one
    sections.forEach((section) => {
        const itemElement = $('<li>', {
            class: 'section-item',
        });

        const span = $('<span>', {
            class: 'text-cont',
            text: section.title
        });

        itemElement.append(span);

        const btnExpand = $('<button>', {
            class: 'section-button',
            click: () => { handleExpandClick(section, itemElement); },
            html: '&#11206;'
        });
 
        itemElement.append(btnExpand);

        // const btnRandom = $('<button>', {
        //     class: 'section-button',
        //     click: () => { handleButtonClick(section, itemElement); },
        //     html: '&#11208;' //left facing arrow
        // });
 
        // itemElement.append(btnRandom);

        const divElement = $('<div>', {
            class: 'section-div',
            hidden: true,
        });

        attachSubSections(section, divElement);

        itemElement.append(divElement);

        $('#sections').append(itemElement);
        noneRendered = false;
    });
}

function handleItemClick(item){

    // console.log('clicked', item);
    
}

function handleButtonClick(item, e){
    console.log('clicked', e);
}

function handleExpandClick(item, e){
    let element = e[0].querySelector('div');
    element.hidden = !element.hidden;
    console.log('clicked expand', element)
    
    e.hidden = !e.hidden;
}

function attachSubSections(item, e){
    console.log(item.subSections[0]);
    item.subSections.forEach((ss) => {
        // console.log(ss)
        const p = $('<p>', {});
        const s = $('<span>', {text: `${ss}`})
        p.append(s);

        const btn = $('<button>', {
            class: 'ss-button',
            click: () => { handleQuizClick(ss); },
            html: '&#11208;' //sideways arrow
        });
 
        p.append(btn);
        e.append(p);
    });
}

function handleQuizClick(title){
    
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);

    if (!params.get('course')) {
        alert('course must be selected before opening quiz');
        return;
    }

    url.searchParams.delete('page');
    url.searchParams.set('page', 'quizDetail');
    url.searchParams.set('detail', title);

    console.log('go to quiz', 'new url',url.href);
    window.open(url.href, '_blank');

}