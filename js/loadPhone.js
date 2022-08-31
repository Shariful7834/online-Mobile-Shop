const loadPhones = (search) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
  const containerPhones = document.getElementById("phonesContainer");
  containerPhones.innerHTML = "";

  const showAllBtn = document.getElementById("showAllbtn");

  phones = phones.slice(0, 15);

  // display 15 phone

  const noFoundText = document.getElementById("noFoundText");
  if (phones.length === 0) {
    noFoundText.classList.remove("d-none");
  } else {
    noFoundText.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const loadPhoneDiv = document.createElement("div");
    loadPhoneDiv.classList.add("col");
    loadPhoneDiv.innerHTML = `
    <div class="card h-100 p-4">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal"
                data-bs-target="#exampleModal">See Details</button>
              </div>
            </div>
    
    `;
    containerPhones.appendChild(loadPhoneDiv);
  });
  loader(false);
};

document.getElementById("searchBtn").addEventListener("click", function () {
  loader(true);
  const searchInputField = document.getElementById("searchInputField");
  const searchTextField = searchInputField.value;
  loadPhones(searchTextField);
  searchInputField.value = "";
});

// spinner option function
const loader = (isloading) => {
  const loaderField = document.getElementById("loaderSpinner");
  if (isloading) {
    loaderField.classList.remove("d-none");
  } else {
    loaderField.classList.add("d-none");
  }
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

const displayDetails = (phone) => {
  console.log(phone);
  const displayDetails = document.getElementById("displayDetailsPhone");
  displayDetails.innerText = phone.name;
  const othersDetails = document.getElementById("otherDetailsPhone");
  const sensors = phone.mainFeatures.sensors;
  for (const sensor of sensors) {
    const newSensor = sensor;
    console.log(newSensor);
  }

  othersDetails.innerHTML = `
  <img src="${phone.image}" class="card-img-top p-4" alt="..." />
    <p> Brand: ${phone.brand}</p>
    <p> Release Date: ${phone.releaseDate}</p>
    <p> Storage: ${
      phone.mainFeatures.storage
        ? phone.mainFeatures.storage
        : "Not enough information"
    }</p>
    <ol>
    Sensors:
     <li>${phone.mainFeatures.sensors[0]}</li>
     <li>${phone.mainFeatures.sensors[1]}</li>
     <li>${phone.mainFeatures.sensors[2]}</li>
     <li>${phone.mainFeatures.sensors[3]}</li>
   
    </ol>

  `;
};
document.getElementById("btn-showAll").addEventListener("click", function () {
  console.log("clicked");
});

//loadPhones("a");
