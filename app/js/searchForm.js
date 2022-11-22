"use strict"

const searchFormFeatures = () => {
    const { searchInput, clearInput } = searchFormGlobals();

    const setFocus = () => {
        qs("[data-search-input]").focus()
    };

    const showClearTextBtn = () => {
        
        if (searchInput.value.length) {
            clearInput.classList.remove("none")
            clearInput.classList.add("flex")
        }
        else {
            clearInput.classList.add("none")
            clearInput.classList.remove("flex")
        }
    };

    const clearSearchText = e => {
        e.preventDefault()
        searchInput.value = "";
        clearInput.classList.add("none")
        clearInput.classList.remove("flex")
        setFocus()
    };

    const clearOnKeypress = e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            clearInput.click()
        }
    };

    return {setFocus, showClearTextBtn, clearSearchText, clearOnKeypress}
};

const { setFocus, showClearTextBtn, clearSearchText, clearOnKeypress } = searchFormFeatures();