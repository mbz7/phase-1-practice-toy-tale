document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", handleSubmit);

  displayForm();
  fetchToys();
});

// Global
let addToy = false;
const BASE_ENDPOINT = `http://localhost:3000/toys`;

const displayForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};

// Fetch Andy's toys
const fetchToys = () => {
  fetch(BASE_ENDPOINT)
    .then((r) => r.json())
    .then((toys) => toys.forEach((toy) => renderToy(toy)));
};

//* With the response data, make a `<div class="card">` for each toy and

// Add Toy Info to the Card

const renderToy = (toy) => {
  // console.log(toy);
  // make a `<div class="card">`
  let div = document.createElement("div");
  div.className = "card";

  // * h2 tag with the toy's name
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  // * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
  let img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = toy.image;

  // *  `p` tag with how many likes that toy has
  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  // * `button` tag with a class "like-btn" and an id attribute set to the toy's id number
  let likeButton = document.createElement("button");
  likeButton.innerText = "Like <3";
  likeButton.className = "like-bt";
  likeButton.id = toy.id;

  // like event listener

  likeButton.addEventListener("click", patchLikes);

  // append card information
  div.append(h2, img, p, likeButton);

  // add it to the toy-collection 'div'
  let toyDiv = document.querySelector("#toy-collection");
  toyDiv.append(div);
};

// Add a New Toy

const handleSubmit = (event) => {
  event.preventDefault();

  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObj),
  };

  // * A `POST` request should be sent to `http://localhost:3000/toys` and the new toy added to Andy's Toy Collection.
  fetch(BASE_ENDPOINT, configObj)
    .then((res) => res.json())
    .then((toy) => renderToy(toy));

  // * If the post is successful, the toy should be added to the DOM without reloading the page.

  event.target.reset();
};

// Increase a Toy's Likes

const patchLikes = (event) => {
  console.dir(event.target);
};

// * A `patch` request (i.e., `method: "PATCH"`) should be sent to the server at `http://localhost:3000/toys/:id`, updating the number of likes that the specific toy has
// * If the patch is successful, the toy's like count should be updated in the DOM without reloading the page

// 1. capture that toy's id,
// 2. calculate the new number of likes,
// 3. submit the `patch` request, and
// 4. update the toy's card in the DOM based on the `Response` returned by the fetch request.
