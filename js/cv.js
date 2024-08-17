//skills const must be set
// jquery must be imported

renderSkills(skills.skills);

function renderSkills(skillsArr) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    const ratingFilter = params.get('rating');
    const typeFilter = params.get('type');
    const categoryFilter = params.get('category');

    // Loop through skillsArr and create then attach each skill
    skillsArr.forEach((skill, index) => {
        // console.log('skill:', skill)
        if(ratingFilter && ratingFilter > skill.rating){
            // console.log('skipped',skill.rating, skill.title)
            return;
        }
        if(typeFilter && skill.type.toLowerCase() != typeFilter.toLowerCase()){
            // console.log('skipped',skill.type, skill.title)
            return;
        }
        if(categoryFilter && skill.category.toLowerCase() != categoryFilter.toLowerCase()){
            // console.log('skipped', skill.category)
            return;
        }

        const skillPill = $('<div>', {
            class: 'item-pill',
            click: ()=>{ handleSkillClick(index); },
            text: skill.title
        });

        $('#skillsCont').append(skillPill);
    });

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

