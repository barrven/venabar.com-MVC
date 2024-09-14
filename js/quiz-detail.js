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