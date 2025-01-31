const fedRegex = /https:\/\/lichess1\.org\/assets\/_\w{6,9}\/images\/fide-fed(?:-webp)?\/([A-Z]{3})\.(?:svg|webp)/;
const flagRegex = /https:\/\/lichess1\.org\/assets\/_\w{6,9}\/images\/flags\/([\w-]+)\.png/;


function substituirURL(img) {
    const fedMatch = img.src.match(fedRegex);
    if (fedMatch) {
        const nameFile = fedMatch[1];
        const imgLocal = chrome.runtime.getURL(`img/fide-fed/${nameFile}.webp`);
        img.src = imgLocal;
        return
    }
    const flagMatch = img.src.match(flagRegex);
    if (flagMatch) {
        const nameFile = flagMatch[1];
        const imgLocal = chrome.runtime.getURL(`img/flags/${nameFile}.png`);
        img.src = imgLocal;
        return
    }
}

function processarTodasImagens() {
    document.querySelectorAll("img").forEach(substituirURL);
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.tagName === "IMG") {
                substituirURL(node);
            } else if (node.querySelectorAll) {
                node.querySelectorAll("img").forEach(substituirURL);
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

processarTodasImagens();