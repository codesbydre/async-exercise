// ## **Part 2: Deck of Cards**

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
const baseURL = "https://deckofcardsapi.com/api/deck";

async function drawCard() {
  let deck = await $.getJSON(`${baseURL}/new/draw/?count=1`);
  let card = deck.cards[0];
  console.log(`${card.value} of ${card.suit}`);
}

drawCard();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
//     Once you have both cards, ***console.log*** the values and suits of both cards.
async function draw2Cards() {
  let deck = await $.getJSON(`${baseURL}/new/draw/?count=1`);
  let card1 = deck.cards[0];
  console.log(`${card1.value} of ${card1.suit}`);

  let deckId = deck.deck_id;
  let sameDeck = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
  let card2 = sameDeck.cards[0];
  console.log(`${card2.value} of ${card2.suit}`);
}

draw2Cards();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
let deckId;

async function newDeck() {
  let deck = await $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`);
  deckId = deck.deck_id;
}

async function draw1Card() {
  let cardData = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
  let card = cardData.cards[0];

  let cardValue = card.value;
  let cardSuit = card.suit;
  let cardContainer = $("#cardResult");

  let pElement = $("<p>").text(`${cardValue} of ${cardSuit}`);
  cardContainer.append(pElement);
}

$(document).ready(async function () {
  await newDeck();

  $("#drawCard").click(draw1Card);
});
