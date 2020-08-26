const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

const getQoute = async () => {
  showLoadingSpinner();
  const proxyUrl = "https://arcane-caverns-15245.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorText.innerText = "unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    console.log("error", error);
  }
};

const twitterQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twiiter = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twiiter, "_blank");
};

newQuoteBtn.addEventListener("click", getQoute);
twitterBtn.addEventListener("click", twitterQuote);

getQoute();
