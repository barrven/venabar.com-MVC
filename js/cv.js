//skills const must be set
// jquery must be imported

renderSkills(skills.skills);

function renderSkills(skillsArr) {
    
    const mainContainer = $('<div>', { class: 'col-md mb-2' });
    const titleBox = $('<div>', { class: 'bg-dark text-white text-center box-title' });
    const titleText = $('<div>', { text: 'Skills', css: { paddingTop: '12px' } });
    titleBox.append(titleText);

    const skillsContainer = $('<div>', { class: 'border-primary-round p-2' });
    
    // Loop through skillsArr and create each skill pill
    skillsArr.forEach((skill, index) => {
        const skillPill = $('<div>', {
            class: 'item-pill',
            click: ()=>{ handleSkillClick(index); },
            // attr: { index: index }
        });

        const skillTitle = $('<span>', { text: skill.title });
        skillPill.append(skillTitle);
        skillsContainer.append(skillPill);
    });

    mainContainer.append(titleBox).append(skillsContainer);

    // Finally, append the main container to the desired parent element in the DOM
    $('#skillsCont').append(mainContainer);
}

function handleSkillClick(index){

    if(!skills){
        console.error('const skills is not set');
        return;
    }

    $('#btnModal').trigger('click');
    $('#myModalLabel').text(`${skills.skills[index].title}`);
    
    let html = `
    <table class="table table-striped table-hover">
        <tr>
            <td>Rating (1-5)</td>
            <td>${skills.skills[index].rating}</td>
        </tr>
        <tr>
            <td>Skill (hard/soft)</td>
            <td>${skills.skills[index].type}</td>
        </tr>
        <tr>
            <td>Category</td>
            <td>${skills.skills[index].category}</td>
        </tr>
    </table>
    `;

    $('#modalBody').html(html);
}

