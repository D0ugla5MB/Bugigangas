const auxFetch = new Map([
    ['home', false],
    ['clickpaint', true],
]);

function fetchDomContent(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch HTML content from ${url}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            document.getElementById(containerId).innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching HTML content:', error);
        });
}
function fetchShadowDomContent(url, containerId) {
    const container = document.getElementById(containerId);
    let shadowRoot = container.shadowRoot || container.attachShadow({ mode: 'open' });

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch Shadow DOM content from ${url}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            shadowRoot.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching Shadow DOM content:', error);
        });
}

function selectFetchFuncType(fetType) {
    return !fetType ? fetchDomContent : fetchShadowDomContent;
}

export function fetchContent(currentUrl) {
    try {
        let fetchType = auxFetch.has(currentUrl) ? auxFetch.get(currentUrl) : null;

        if (!fetchType) {
            fetchType = (function () {
                const keys = [...auxFetch.keys()];
                const matchedKey = keys.find(key => key.includes(currentUrl));
                return matchedKey ? auxFetch.get(matchedKey) : null;
            })();
        }
        if (!fetchType) {
            throw new Error(`The URL '${currentUrl}' does not have a corresponding fetch type in auxFetch.`);
        }
        return selectFetchFuncType(fetchType);
    } catch (error) {
        console.error("Error in fetchContent:", error.message);
        throw error;
    }
}


