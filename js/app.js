let elSearch = document.getElementById("search");
let elError = document.getElementById("error");

setTimeout(elError, 3000);

let elementsArray = [];
fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    res.data.forEach((el) => {
      elementsArray.push(el);
    });
  })
  .finally((res) => {
    uiWrite(elementsArray);
  });

function uiWrite(arr) {
  elementsArray[3].image =
    "https://www.hyundai.com/content/dam/hyundai/uz/ru/images/find-a-car/pip/elantra-2023/highlights/elntra-2023-gallery-3.jpg";
  document.getElementById("container").innerHTML = null;
  arr.forEach((el) => {
    let htmlElements = `<div class="card bg-base-10 flex-wrap w-[700px] shadow-sm">
            <figure>
              <img id="card-img"
                src="${el.image}"
                alt="${el.name}"
                class="w-full min-h-[210px]"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title" id="card-title">${el.name}</h2>
              <p  id="card-text">
                ${el.type}
              </p>
              <p  id="card-text">
                ${el.fuel}
              </p>

              <p  id="card-text">
                ${el.gearbox}
              </p>

              <div class="card-actions justify-end">
                <button class="btn btn-primary bg-gray-500">More Information</button>
              </div>
            </div>
          </div>
        `;
    document.getElementById("container").innerHTML += htmlElements;
  });
}

function searchUiWrite(val) {
  let filteredArray = [];
  elementsArray.filter((el) => {
    if (el.name.toLowerCase().includes(val.toLowerCase()))
      return filteredArray.push(el);
  });
  uiWrite(filteredArray);
}

// elSearch.addEventListener("input", (evt) => searchUiWrite(evt.target.value));
