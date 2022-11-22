"use strict"

function qs(selector, parent = document) {
    return parent.querySelector(selector)
};

function searchFormGlobals() {
    const searchInput = qs("[data-search-input]")
    const clearInput = qs("[data-clear-input]")

    return {searchInput, clearInput}
};

function searchResultsGlobals() {
    const searchResults = qs("[data-search-results]")
    const statsLine = qs("[data-stats]")

    return {searchResults, statsLine}
};

function ce(element, parent = document) {
    return parent.createElement(element)
};