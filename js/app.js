document.addEventListener("DOMContentLoaded", function () {
  
  let elSearch = document.getElementById("search");
  let elementsArray = [];


  if (elSearch) {
    elSearch.addEventListener("input", (evt) =>
      searchUiWrite(evt.target.value)
    );
  }

  loadCarsData();

  async function loadCarsData() {
    try {
      const response = await fetch(
        "https://json-api.uz/api/project/fn44-amaliyot/cars",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        const res = await response.json();
        if (res.data && Array.isArray(res.data)) {
          elementsArray = res.data;
        } else if (Array.isArray(res)) {
          elementsArray = res;
        }
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.warn("API dan ma'lumot olishda xato:", error);
      elementsArray = getFallbackData();
    } finally {
      uiWrite(elementsArray);
    }
  }

  function uiWrite(arr) {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      document.getElementById("container").innerHTML = `
        <div class="text-center p-8">
          <p class="text-yellow-500"></p>
        </div>
      `;
      return;
    }

    document.getElementById("container").innerHTML = "";

    arr.forEach((el) => {
      if (!el) return;

      const safeImage =
        el.image || "https://via.placeholder.com/700x210?text=Car+Image";
      const safeName = el.name 
      const safeType = el.type 
      const safeFuel = el.fuel 
      const safeGearbox = el.gearbox 

      let htmlElements = `<div class="card bg-base-10 flex-wrap w-[700px] shadow-sm">
              <figure>
                <img src="${safeImage}" alt="${safeName}" class="w-full min-h-[210px] object-cover">
              </figure>
              <div class="card-body">
                <h2 class="card-title">${safeName}</h2>
                <p>${safeType}</p>
                <p>${safeFuel}</p>
                <p>${safeGearbox}</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary bg-gray-500">More Information</button>
                </div>
              </div>
            </div>`;

      document.getElementById("container").innerHTML += htmlElements;
    });
  }

  function searchUiWrite(val) {
    if (!elementsArray.length) return;

    let filteredArray = elementsArray.filter((el) => {
      return el && el.name && el.name.toLowerCase().includes(val.toLowerCase());
    });

    uiWrite(filteredArray);
  }

  function getFallbackData() {
    return [
      {
        name: "Toyota Camry",
        type: "Sedan",
        fuel: "Benzin",
        gearbox: "Avtomat",
        image:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700&h=210&fit=crop",
      },
      {
        name: "Hyundai Sonata",
        type: "Sedan",
        fuel: "Benzin",
        gearbox: "Avtomat",
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&h=210&fit=crop",
      },
    ];
  }
});

// let elSearch = document.getElementById("search");

// let elementsArray = [];
// fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     res.data.forEach((el) => {
//       elementsArray.push(el);
//     });
//   })
//   .finally((res) => {
//     uiWrite(elementsArray);
//   });

// function uiWrite(arr) {
//   elementsArray[3].image =
//     "https://www.hyundai.com/content/dam/hyundai/uz/ru/images/find-a-car/pip/elantra-2023/highlights/elntra-2023-gallery-3.jpg";
//   document.getElementById("container").innerHTML = null;
//   arr.forEach((el) => {
//     let htmlElements = `<div class="card bg-base-10 flex-wrap w-[700px] shadow-sm">
//             <figure>
//               <img id="card-img"
//                 src="${el.image}"
//                 alt="${el.name}"
//                 class="w-full min-h-[210px]"
//               />
//             </figure>
//             <div class="card-body">
//               <h2 class="card-title" id="card-title">${el.name}</h2>
//               <p  id="card-text">
//                 ${el.type}
//               </p>
//               <p  id="card-text">
//                 ${el.fuel}
//               </p>

//               <p  id="card-text">
//                 ${el.gearbox}
//               </p>

//               <div class="card-actions justify-end">
//                 <button class="btn btn-primary bg-gray-500">More Information</button>
//               </div>
//             </div>
//           </div>
//         `;
//     document.getElementById("container").innerHTML += htmlElements;
//   });
// }

// function searchUiWrite(val) {
//   let filteredArray = [];
//   elementsArray.filter((el) => {
//     if (el.name.toLowerCase().includes(val.toLowerCase()))
//       return filteredArray.push(el);
//   });
//   uiWrite(filteredArray);
// }

// elSearch.addEventListener("input", (evt) => searchUiWrite(evt.target.value));
