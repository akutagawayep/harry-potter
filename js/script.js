const search = document.querySelector(".search");
const btns = document.querySelectorAll(".btn");
let data;

const fetchData = async () => {
  const response = await fetch("https://hp-api.herokuapp.com/api/characters");
  const json = await response.json();
  data = await json;
  loadCharacters(data);
};

fetchData();
const imgCheck = (img, gender) => {
  if (img == "") {
    switch (gender) {
      case "male":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtg0eXQ-2krFQUI24nYBS6o9DLVjyKhb21A&usqp=CAU";
      case "female":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7WDUiDHaHyyhoDkMzac-HyDHCH5oXaDoSg&usqp=CAU";
      case "mur":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAc6vvNzgH5GagFaC1r7QZeOeIyPGvn4tdyQ&usqp=CAU";
      default:
        return "error";
    }
  } else {
    return img;
  }
};

const back = (house) => {
  switch (house) {
    case "Gryffindor":
      return "./img/harrypotter-gryffindor-lion-hogwarts-wizardfreetoedit-gryffindor-hogwarts-houses-11562916396lpfxs1ggwn.png";
    case "Ravenclaw":
      return "./img/png-transparent-ravenclaw-logo-ravenclaw-house-warner-bros-studio-tour-london-the-making-of-harry-potter-sorting-hat-hogwarts-harry-potter-and-the-deathly-hallows-ha.png";
    case "Slytherin":
      return "./img/png-clipart-harry-potter-slytherin-logo-slytherin-house-hogwarts-harry-potter-gryffindor-ravenclaw-house-harry-potter-emblem-logo.png";
    case "Hufflepuff":
      return "./img/Hufflepuff_ClearBG.webp";
    default:
      return "./img/magli.jpg";
  }
};

const main = document.querySelector("main");

function loadCharacters(data) {
  console.log(data);
  main.innerHTML = "";
  // let characters = Array.from(data);
  let characters = data;
  characters.forEach((character) => {
    const card = document.createElement("div");
    main.append(card);
    card.innerHTML = `<div class="card_container"><div class="card"> <img src="${back(
      character.house
    )}" class="herb" alt="huy">
    <div class="card_block">
      <img src='${imgCheck(character.image, character.gender)}' alt="" />
      <div class="card_text">
        <p>${character.species}</p>
        <p>${character.gender}</p>
        <p>${character.house}</p>
        <p>${character.ancestry}</p>
      </div>
    </div>
    <div class="card_text">
      <p>${character.name}</p>
      <p>Year of Birth: ${
        character.yearOfBirth == null ? "Unknown" : character.yearOfBirth
      }</p>
      <p>Actor: ${character.actor}</p>
    </div> </div>
  </div>`;
  });
}

search.addEventListener("change", (e) => {
  main.innerHTML = "";
  const filteredData = data.filter((character) =>
    character.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  filteredData.length === 0
    ? (main.innerHTML +=
        "<p style='font-size: 20px; text-align: center; margin-top: 20px; color: #fff;'>Персонаж с таким именем не найден<p>")
    : loadCharacters(filteredData);
});

const filteringDataByFaculties = (data, house) => {
  const filteredData = data.filter((character) =>
    character.house.toLocaleLowerCase().includes(house.toLocaleLowerCase())
  );
  loadCharacters(filteredData);
};

btns[0].addEventListener("click", () => loadCharacters(data));
btns[1].addEventListener("click", () => {
  filteringDataByFaculties(data, "Gryffindor");
});
btns[2].addEventListener("click", () =>
  filteringDataByFaculties(data, "Slytherin")
);
btns[3].addEventListener("click", () =>
  filteringDataByFaculties(data, "Hufflepuff")
);
