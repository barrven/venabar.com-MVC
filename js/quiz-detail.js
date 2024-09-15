async function callAPI(history) {
    
    const url = new URL(window.location);
    url.searchParams.delete('page');
    url.searchParams.set('page', 'get-quiz');
    url.searchParams.set('mode', 'api');
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history)
        });

        if (!response.ok) {
            // console.log('API call completed', response);
            // throw new Error('Network response was not ok');
            return {error: `API call returned HTTP status code: ${response.status}`};
        }

        const result = await response.json();
        // console.log('API call completed', result);
        // const rawResponse = await response.text();
        // console.log('Raw Response:', rawResponse);
        // const result = JSON.parse(rawResponse);
        
        return result;
        
    } catch (error) {
    
        console.error(error);
    }
}

// Adjust footer position on load
$(document).ready(()=>{
    adjustFooter();
});

// Adjust footer position whenever the window resizes 
//(including address bar hide on scroll)
$(window).on('resize',()=>{
    adjustFooter();
});

function adjustFooter() {
    // Get the viewport height
    let windowHeight = window.innerHeight;
    let footerHeight = $('.footer').outerHeight();
    let mainContentHeight = $('main').outerHeight();
    
    // Calculate total height and see if we need to push the footer down
    if (mainContentHeight + footerHeight < windowHeight) {
        $('.footer').css({
            position: 'absolute',
            bottom: '0',
            width: '100%',
        });
    } else {
        $('.footer').css({
            position: 'static',
        });
    }
}