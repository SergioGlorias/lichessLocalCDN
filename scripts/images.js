const fedRegex =
  /https:\/\/lichess1\.org\/assets(?:\/_\w{6,9})?\/images\/fide-fed(?:-webp)?\/([A-Z]{3})\.(?:svg|webp)/;
const flagRegex =
  /https:\/\/lichess1\.org\/assets(?:\/_\w{6,9})?\/images\/flags\/([\w\-]+)\.png/;
const flairRegex =
  /https:\/\/lichess1\.org\/assets(?:\/_\w{6,9})?\/flair\/img\/([\w\-\.]+)\.webp/;

const substituirURL = (img) => {
  const fedMatch = img.src.match(fedRegex);
  const flagMatch = img.src.match(flagRegex);
  const flairMatch = img.src.match(flairRegex);

  let nameFile;
  if (fedMatch) nameFile = `img/fide-fed/${fedMatch[1]}.webp`;
  if (flagMatch) nameFile = `img/flags/${flagMatch[1]}.png`;
  if (flairMatch) nameFile = `img/flair/${flairMatch[1]}.webp`;

  if (nameFile) img.src = chrome.runtime.getURL(nameFile);
};

const processarTodasImagens = (node) => node.forEach(substituirURL);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === "IMG") substituirURL(node);
      else if (node.querySelectorAll)
        processarTodasImagens(node.querySelectorAll("img"));
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });

processarTodasImagens(document.querySelectorAll("img"));
