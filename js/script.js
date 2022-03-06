"use strict";

let nameValue;
let listValue;
let rateValue;
let id = 0;
let counter = 0;

let nameSelect = document.getElementById("name");
let listSelect = document.getElementById("list");
let rateSelect = document.getElementById("rate");
let filterSelect = document.getElementById("filter");

let saveButtonValue = document.getElementById("save-button");

let deleteButtons = document.getElementsByClassName("last");
let deleteButtonValue = "Удалить";

let tbody = document.getElementById("tbody");

let data = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

const start = () => {
    data.forEach((item) => {
        nameValue = item.name;
        listValue = item.list;
        rateValue = item.rating;

        let newItem = document.createElement("tr");
        // if (nameValue.length < 1 || listSelect.selectedIndex == 0 || rateSelect.selectedIndex == 0) {
        //     alert("Введите все необходимые данные!");
        // }

        if (item.list == 1) {
            newItem.id = `a${id++}`;
            newItem.className = "new";
            newItem.innerHTML = `<td>${nameValue}</td><td class='like'>Понравившиеся</td><td>${rateValue}</td><td id=b${newItem.id} class="last">${deleteButtonValue}</td>`;
            tbody.append(newItem);
        } else if (item.list == 2) {
            newItem.id = `a${id++}`;
            newItem.className = "new";
            newItem.innerHTML = `<td>${nameValue}</td><td class='toWatch'>Хочу посмотреть</td><td>${rateValue}</td><td id=b${newItem.id} class="last">${deleteButtonValue}</td>`;
            tbody.append(newItem);
        }
    });
};
start();

const formFiller = () => {
    console.log(data);

    nameValue = document.getElementById("name").value;
    listValue = document.getElementById("list").value;
    rateValue = document.getElementById("rate").value;

    let newItem = document.createElement("tr");
    if (nameValue.length < 1 || listSelect.selectedIndex == 0 || rateSelect.selectedIndex == 0) {
        alert("Введите все необходимые данные!");
    }

    if (listSelect.selectedIndex == 1) {
        newItem.id = `a${id++}`;
        newItem.className = "new";
        newItem.innerHTML = `<td>${nameValue}</td><td class='like'>Понравившиеся</td><td>${rateValue}</td><td id=b${newItem.id} class="last">${deleteButtonValue}</td>`;
        tbody.append(newItem);
    } else if (listSelect.selectedIndex == 2) {
        newItem.id = `a${id++}`;
        newItem.className = "new";
        newItem.innerHTML = `<td>${nameValue}</td><td class='toWatch'>Хочу посмотреть</td><td>${rateValue}</td><td id=b${newItem.id} class="last">${deleteButtonValue}</td>`;
        tbody.append(newItem);
    }

    // counter++;

    let newFilm = {
        name: nameValue,
        rating: rateValue,
        list: listSelect.selectedIndex,
    };

    data.push(newFilm);

    localStorage.setItem("data", JSON.stringify(data));
    // localStorage.setItem(`name`, newFilm);

    nameSelect.value = "";
    listSelect.selectedIndex = 0;
    rateSelect.selectedIndex = 0;

    deleteFunct();
};

const deleteFunct = () => {
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", (e) => {
            let findClosest = e.target.id.substr(2);
            let parent = document.querySelector(`#a${findClosest}`);
            parent.remove();
        });
    }
};

const filterFunction = () => {
    let likedList = document.querySelectorAll("td.like");
    let toWatchList = document.querySelectorAll("td.toWatch");
    // console.log(likedList);

    if (filterSelect.selectedIndex == 0) {
        return;
    } else if (filterSelect.selectedIndex == 1) {
        toWatchList.forEach((item) => {
            item.closest("tr").classList.add("hide");
        });
        likedList.forEach((item) => {
            item.closest("tr").classList.remove("hide");
        });
    } else if (filterSelect.selectedIndex == 2) {
        likedList.forEach((item) => {
            item.closest("tr").classList.add("hide");
        });
        toWatchList.forEach((item) => {
            item.closest("tr").classList.remove("hide");
        });
    } else if (filterSelect.selectedIndex == 3) {
        likedList.forEach((item) => {
            item.closest("tr").classList.remove("hide");
        });
        toWatchList.forEach((item) => {
            item.closest("tr").classList.remove("hide");
        });
    }
};

filterSelect.addEventListener("change", filterFunction);

saveButtonValue.addEventListener("click", formFiller);
