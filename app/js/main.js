"use strict"

const appInit = () => {
    const { searchInput, clearInput } = searchFormGlobals();

    document.addEventListener("readystatechange", e => {
        if (e.target.readyState === "complete") {
            setSearch();
        }
    });

    const setSearch = () => {
        setFocus();
        searchInput.addEventListener("input", showClearTextBtn);
        clearInput.addEventListener("click", clearSearchText)
        clearInput.addEventListener("keydown", clearOnKeypress)

        const form = qs("[data-search-form]")
        form.addEventListener("submit", searchSubmit)
    };

    const searchSubmit = e => {
        e.preventDefault();
        deleteSearchResults();
        performSearch();
    };

    const performSearch = async () => {
        clearStatsLine()
        const searchTerm = getSearchTerm();

        if (searchTerm === "") return;
        const resultsArray = await getSearchResults(searchTerm);
        // console.log(resultsArray)
        if (resultsArray.length) {
            createSearchResult(resultsArray)
        }
        setStatsLine(resultsArray.length) 
    };
};

appInit();