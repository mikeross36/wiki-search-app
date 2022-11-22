"use strict"

const wikiSearch = () => {
    const getSearchTerm = () => {
        const term = qs("[data-search-input]").value.trim();
        const regex = /[ ]{2,}/gi; // regex finds 2 or more empty spaces in the row
        const searchTerm = term.replaceAll(regex, " ");

        return searchTerm;
    };

    const getSearchResults = async (term) => {
        const searchUrl = getSearchUrl(term)
        const resultsData = await fetchData(searchUrl)
        let resultsArray = [];

        if (resultsData.hasOwnProperty("query")) {
            resultsArray = setResults(resultsData.query.pages)
        }
        // console.log(resultsArray)
        return resultsArray;
    };

    const getSearchUrl = term => {
        const maxChars = setMaxChars();
        const queryString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${term}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
        const url = encodeURI(queryString)

        return url;
    };

    const setMaxChars = () => {
        const width = window.innerWidth || document.body.clientWidth; 0
        let maxChars;
        if (width < 414) maxChars = 65;
        if (width >= 414 && width < 1400) maxChars = 100;
        if (width >= 1400) maxChars = 130;

        return maxChars;
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data)
            return data;
        }
        catch (error) {
            console.log(error)
        }
    };

    const setResults = results => {
        const resultsArray = [];
        Object.keys(results).forEach(key => {
            const id = key;
            const text = results[key].extract;
            const title = results[key].title;
            const img = results[key].hasOwnProperty("thumbnail")
                ? results[key].thumbnail.source
                : null;
            
            const resultItem = {
                id: id,
                text: text,
                title: title,
                img: img
            };

            resultsArray.push(resultItem)
        });
        // console.log(resultsArray)
        return resultsArray;
    };

    return {getSearchTerm, getSearchResults}
};

const { getSearchTerm, getSearchResults } = wikiSearch();