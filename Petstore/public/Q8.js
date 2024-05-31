function findPet() {
    document.addEventListener("submit", handlingFind);
}

function givePet() {
    document.addEventListener("submit", handlingGive);
}

function updateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.getElementById("date").innerHTML = currentDateTime;
    setTimeout(updateTime, 1000);
}

function handlingGive(event) {
    event.preventDefault();
    let dog = document.querySelector('input[id="dog"]:checked');
    let cat = document.querySelector('input[id="cat"]:checked');
    let pet = document.querySelector('input[name="pet"]:checked');
    var breedDog = document.querySelector('#selectDogBreed');
    var breedCat = document.querySelector('#selectCatBreed')
    var breedDog_value = breedDog.value;
    var breedCat_value = breedCat.value;
    let age = document.getElementById("age").value;
    let gender = document.querySelector('input[name="gender"]:checked');

    let ownerName = document.getElementById("ownerName").value;
    let ownerEmail = document.getElementById("ownerEmail").value;
    let submitted = true;

    if (!pet){
        alert("No pet selected");
        submitted = false;
    } if (dog && breedDog.value === "none") {
        alert("No dog breed selected");
        submitted = false;
    } if (cat && breedCat_value === "none") {
        alert("No cat breed selected");
        submitted = false;
    } if (dog && breedCat_value !== "none") {
        alert("Please put cat breed to none");
        submitted = false;
    } if (cat && breedDog_value !== "none") {
        alert("Please put dog breed to none");
        submitted = false;
    } if (age < 0 || age.match(/^$/) || age.match(/\D+/)) {
        alert("Invalid age");
        submitted = false;
    } if (!gender) { 
        alert("No gender selected");
        submitted = false;
    } if (ownerName.match(/^$/) || ownerEmail.match(/^$/)) {
        alert("Blank owner name or email");
        submitted = false;
    }
    if (submitted) {
        alert("Submitted!");
    }
}

function handlingFind(event) {
    event.preventDefault();
    let dog = document.querySelector('input[id="dog"]:checked');
    let cat = document.querySelector('input[id="cat"]:checked');
    let pet = document.querySelector('input[name="pet"]:checked');
    var breedDog = document.querySelector('#selectDogBreed');
    var breedCat = document.querySelector('#selectCatBreed')
    var breedDog_value = breedDog.value;
    var breedCat_value = breedCat.value;
    let age = document.getElementById("age").value;
    let gender = document.querySelector('input[name="gender"]:checked');

    let submitted = true;

    if (!pet){
        alert("No pet selected");
        submitted = false;
    } if (dog && breedDog.value === "none") {
        alert("No dog breed selected");
        submitted = false;
    } if (cat && breedCat_value === "none") {
        alert("No cat breed selected");
        submitted = false;
    } if (dog && breedCat_value !== "none") {
        alert("Please put cat breed to none");
        submitted = false;
    } if (cat && breedDog_value !== "none") {
        alert("Please put dog breed to none");
        submitted = false;
    } if (age < 0 || age.match(/^$/) || age.match(/\D+/)) {
        alert("Invalid age");
        submitted = false;
    } if (!gender) { 
        alert("No gender selected");
        submitted = false;
    }

    if (submitted) {
        alert("Submitted!");
    }
}