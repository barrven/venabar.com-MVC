

async function callAPI() {
    // const currUrl = new URL(window.location);
    // const url = `${currUrl.origin}${currUrl.pathname}?page=get-quiz&mode=api`;
    const url = new URL(window.location);
    // const params = new URLSearchParams(url.search);
    url.searchParams.delete('page');
    url.searchParams.set('page', 'get-quiz');
    url.searchParams.set('mode', 'api');
    

    const data = {
        history: [
            {role: 'system', content: 'some content'},
            {role: 'user', content: 'please  give me another question.'}
        ]
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

