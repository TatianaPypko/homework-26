import { goods } from "./goods.js";

const categories = document.querySelector(".categories");
const goodsContainer = document.querySelector(".goods");
const cardContainer = document.querySelector(".card");
const form = document.querySelector("form");
const button = document.createElement("button");
const btn = document.querySelector(".btn");

categories.addEventListener("click", (event) => {
  goodsContainer.replaceChildren();
  cardContainer.replaceChildren();

  const { target } = event;

  let filterCategories = goods.filter((good) => {
    if (target.name === good.category) return good;
  });

  filterCategories.map((good) => {
    const card = document.createElement("div");
    card.className = "good-card";
    card.setAttribute("data-id", good.id);
    card.textContent = good.name;
    goodsContainer.appendChild(card);
  });
});

goodsContainer.addEventListener("click", (event) => {
  cardContainer.replaceChildren();
  const { target } = event;

  const chosenGoodId = target.dataset.id;
  let chosenGood = goods.filter((good) => {
    if (good.id == chosenGoodId) return good;
  });

  const { name, weight, price, category, image } = chosenGood[0];

  const titleContainer = document.createElement("h1");
  titleContainer.textContent = name;

  const weightContainer = document.createElement("span");
  weightContainer.innerHTML = weight;

  const categoryContainer = document.createElement("span");
  categoryContainer.innerText = category;

  const priceContainer = document.createElement("span");
  priceContainer.textContent = price;

  const picture = document.createElement("img");
  picture.setAttribute("src", image);

  const containerForImage = document.createElement("div");
  containerForImage.className = "image-card";
  containerForImage.appendChild(picture);

  button.className = "button-buy";
  button.innerText = "Купити";

  cardContainer.prepend(
    titleContainer,
    containerForImage,
    categoryContainer,
    weightContainer,
    priceContainer,
    button
  );

  const buttonBuy = document.querySelector(".button-buy");
  buttonBuy.addEventListener("click", (event) => {
    for (let i = 1; i < 7; i++) {
      form[i].value = '';
    }
    form.style.display = "block";
  });
});



btn.addEventListener("click", (event) => {
  event.preventDefault();
  const { form } = event.target;

  let isError = 0;
  for (let index = 1; index < 7; index++) {
    if (!form[index].value.length) {

      if (form[index].nextElementSibling?.className !== 'error') {
        form[index].insertAdjacentHTML("afterEnd", "<span class='error'>Поле обов'язкове для заповнення!</span>");
      }
      isError++;

    } else {
      if (form[index].nextElementSibling?.className === 'error') {
        form[index].nextElementSibling.remove();
      }
    }
  }

  if (!isError) {
    const name = form[1].value;
    const city = form[2].value;
    const address = form[3].value;
    const payment = form[4].value;
    const amount = form[5].value;
    const comment = form[6].value;

    const tableName = document.querySelector(".table__name");
    tableName.nextElementSibling.textContent = name;

    const tableCity = document.querySelector(".table__city");
    tableCity.nextElementSibling.textContent = city;

    const tableAddress = document.querySelector(".table__address");
    tableAddress.nextElementSibling.textContent = address;

    const tablePayment = document.querySelector(".table__payment");
    tablePayment.nextElementSibling.textContent = payment;

    const tableGoods = document.querySelector(".table__goods");
    tableGoods.nextElementSibling.textContent = amount;

    const tableComment = document.querySelector(".table__comment");
    tableComment.nextElementSibling.textContent = comment;

    form.style.display = "none";
    const table = document.querySelector(".table");
    table.style.display = "block";
    setTimeout(() => {
      table.style.display = "none";
    }, 3000);
  }
});