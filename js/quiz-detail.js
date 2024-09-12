let temp = {
    error: 'this is response from quiz-detail.js'
}


async function callAPI() {
    // const currUrl = new URL(window.location);
    // const url = `${currUrl.origin}${currUrl.pathname}?page=get-quiz&mode=api`;
    const url = new URL(window.location);
    // const params = new URLSearchParams(url.search);
    url.searchParams.delete('page');
    url.searchParams.set('page', 'get-quiz');
    url.searchParams.set('mode', 'api');
    

    const data = {
        name: 'John Doe',
        email: 'john@example.com'
    };
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);

        // const rawResponse = await response.text();
        // console.log('Raw Response:', rawResponse);
        // const result = JSON.parse(rawResponse);
        
        return result;
        
    } catch (error) {
    
        console.error(error);
    }
}

