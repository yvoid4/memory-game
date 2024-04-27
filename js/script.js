const cards = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
];
const game = document.querySelector(".game");
const attempts = document.querySelector(".attempts");
const guessed = document.querySelector(".guessed");
const animation = document.querySelector("h2");
const button = document.querySelector("button");
let flippedcards = [];
let lockboard = false;
let attemptsCount = 0;
let guessedCount = 0;
function createcard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = value;
  img.classList.add("hidden");
  card.appendChild(img);
  card.addEventListener("click", () => flipcard(card, img));
  return card;
}
function flipcard(card, img) {
  if (lockboard || flippedcards.includes(card)) {
    return;
  }
  img.classList.remove("hidden");
  card.classList.add("flip");
  flippedcards.push(card);
  if (flippedcards.length === 2) {
    const [card1, card2] = flippedcards;
    attemptsCount++;
    if (card1.firstChild.src === card2.firstChild.src) {
      card1.removeEventListener("click", flipcard);
      card2.removeEventListener("click", flipcard);
      flippedcards = [];
      guessedCount++;
      if (guessedCount === cards.length / 2) {
        setTimeout(() => {
          animation.style.display = "block";
        }, 500);
      }
    } else {
      lockboard = true;
      setTimeout(() => {
        card1.firstChild.classList.add("hidden");
        card2.firstChild.classList.add("hidden");
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedcards = [];
        lockboard = false;
      }, 1000);
    }
  }
  attempts.textContent = attemptsCount;
  guessed.textContent = guessedCount;
}
function crategame() {
  game.innerHTML = "";
  cards.sort(() => 0.5 - Math.random());
  cards.forEach((card) => {
    const element = createcard(card);
    game.appendChild(element);
  });
}
const reset = () => {
  attemptsCount = 0;
  guessedCount = 0;
  attempts.textContent = attemptsCount;
  guessed.textContent = guessedCount;
  flippedcards = [];
  lockboard = false;
  animation.style.display = "none";
  crategame();
};
button.addEventListener("click", reset);
crategame();
