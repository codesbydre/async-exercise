// ## ****Part 1: Number Facts****

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
const baseURL = "http://numbersapi.com";
let favoriteNum = 13;

async function getFact() {
  let fact = await $.getJSON(`${baseURL}/${favoriteNum}?json`);
  console.log(fact);
}

getFact();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let favoriteNums = [3, 7, 9];

async function getFacts() {
  let facts = await $.getJSON(`${baseURL}/${favoriteNums}?json`);
  for (let num in facts) {
    console.log(`${num} Fact: ${facts[num]}`);
  }
}

getFacts();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

//     *(Note: You’ll need to make multiple requests for this.)*

async function get4Facts() {
  let facts = [];
  for (let i = 0; i < 4; i++) {
    let fact = await $.getJSON(`${baseURL}/${favoriteNum}?json`);
    facts.push(fact.text);
  }

  for (let fact of facts) {
    console.log(fact);
  }
}

get4Facts();
