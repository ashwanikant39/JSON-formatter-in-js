let paste = document.querySelector("#paste");
let copy = document.querySelector("#copy");
let format = document.querySelector("#format");
let remWhiteSpace = document.querySelector("#rem-white-space");
let clear = document.querySelector("#clear");
let loadJson = document.querySelector("#load-json");
let textField = document.querySelector("#text-field");
let urlPopup = document.querySelector(".hide-popup");
let crossIcon = document.querySelector("#cross-icon");
let linkUrl = document.querySelector("#link-url");

let loadDataBtn = document.querySelector("#load-data-btn");

async function fetchApi(url) {
  console.log(url);
  try {
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    // console.log(JSON.stringify(data));
    textField.value = JSON.stringify(data);

    urlPopup.classList.add("hide-popup");
    urlPopup.classList.remove("url-popup");
  } catch (error) {
    console.log(error);
  }
}

loadDataBtn.addEventListener("click", () => {
  // console.log(linkUrl.value);
  let url = linkUrl.value;
  fetchApi(url);
});

loadJson.addEventListener("click", () => {
  urlPopup.classList.add("url-popup");
  urlPopup.classList.remove("hide-popup");
});
crossIcon.addEventListener("click", () => {
  urlPopup.classList.add("hide-popup");
  urlPopup.classList.remove("url-popup");
});

paste.addEventListener("click", async () => {
  let text = await navigator.clipboard.readText();
  textField.value = text;
});

async function copied() {
  try {
    await navigator.clipboard.writeText(textField.value);
    alert("Text copied");
  } catch (err) {
    alert("Failed to copy");
  }
}
copy.addEventListener("click", () => {
  if (textField.value !== "") {
    copied();
  } else {
    alert("Text field is Empty");
  }
});

clear.addEventListener("click", () => {
  // console.log(textField.value)
  if (textField.value !== "") {
    textField.value = "";
  }
});
remWhiteSpace.addEventListener("click", () => {
  let spaceRem = textField.value.replace(/\s/g, "");
  textField.value = spaceRem;
});

format.addEventListener("click", () => {
  let fromatted = JSON.stringify(JSON.parse(textField.value), null, 2);
  //   console.log(fromatted)
  textField.value = fromatted;
});
