"use strict"

const searchResults = () => {
    const { searchResults, statsLine } = searchResultsGlobals();

    const deleteSearchResults = () => {
        const parentElement = searchResults;
        let child = parentElement.lastElementChild;

        while (child) {
            parentElement.removeChild(child)
            child = parentElement.lastElementChild;
        }
    };

    const clearStatsLine = () => {
        statsLine.textContent = "";
    };

    const createSearchResult = results => {
        results.forEach(result => {
            const resultItem = createResultItem(result)

            const resultContent = ce("div")
            resultContent.classList.add("result-content")

            if (result.img) {
                const resultImage = createResultImage(result)
                resultContent.append(resultImage)
            }
            const resultText = createResultText(result)
            resultContent.append(resultText)
            resultItem.append(resultContent)

            searchResults.append(resultItem)
        });
    };

    const setStatsLine = numOfResults => {
        if (numOfResults) {
            statsLine.textContent = `Displaying ${numOfResults} results`
        }
        else {
            statsLine.textContent = "No results to display"
        }
    };

    const createResultItem = result => {
        const resultItem = ce("div")
        resultItem.classList.add("result-item")

        const resultTitle = ce("div")
        resultTitle.classList.add("result-title")

        const link = ce("a")
        link.href = `https://en.wikipedia.org/?curid=${result.id}`;
        link.target = "_blank";

        resultTitle.append(link)
        resultItem.append(resultTitle)

        return resultItem;
    };

    const createResultImage = result => {
        const resultImage = ce("div")
        resultImage.classList.add("result-image")

        const img = ce("img")
        img.src = result.img;
        img.alt = result.title;

        resultImage.append(img)
        return resultImage;
    };

    const createResultText = result => {
        const resultText = ce("div")
        resultText.classList.add("result-text")

        const resultDescription = ce("p")
        resultDescription.classList.add("result-description")
        resultDescription.textContent = result.text;

        resultText.append(resultDescription)
        return resultText;
    };

    return {deleteSearchResults, clearStatsLine, createSearchResult, setStatsLine}
};

const { deleteSearchResults, clearStatsLine, createSearchResult, setStatsLine } = searchResults();