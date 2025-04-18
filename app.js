const form = document.querySelector("form");
const input = document.getElementById("Liste-input");
const liste = document.querySelector(".Yapilacak-liste");

let gorevler = [];

window.addEventListener("DOMContentLoaded", () => {
  const kayitli = localStorage.getItem("gorevler");
  if (kayitli) {
    gorevler = JSON.parse(kayitli);
    gorevler.forEach(gorev => listeyeEkle(gorev));
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const metin = input.value.trim();
  if (metin === "") return;

  const yeniGorev = {
    id: "id-" + Date.now(),
    text: metin,
    completed: false
  };

  gorevler.push(yeniGorev);
  kaydetLocalStorage();
  listeyeEkle(yeniGorev);
  input.value = "";
});

function listeyeEkle(gorev) {
  const li = document.createElement("li");
  li.className = "Yapilacaklar";

  li.innerHTML = `
    <input type="checkbox" id="${gorev.id}" ${gorev.completed ? "checked" : ""}>
    <label for="${gorev.id}" class="custom-checkbox">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24px" height="24px">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <label for="${gorev.id}" class="Yapilacak-yazi">${gorev.text}</label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;

  const checkbox = li.querySelector(`input[type="checkbox"]`);
  checkbox.addEventListener("change", (e) => {
    gorev.completed = e.target.checked;
    kaydetLocalStorage();
  });

  const silButonu = li.querySelector(".delete-button");
  silButonu.addEventListener("click", () => {
    gorevler = gorevler.filter(item => item.id !== gorev.id);
    kaydetLocalStorage();
    li.remove();
  });

  liste.appendChild(li);
}
function kaydetLocalStorage() {
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
