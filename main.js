/* Getting the elements */

const categoryBtn = document.querySelector(".category-btn-container");
const addingBtn = document.querySelector(".adding-btn");
const background = document.querySelector(".background");
const addingForm = document.querySelector(".adding");
const closingBtns = document.querySelectorAll(".icon-div");
let deletingElementBtns = document.querySelectorAll(".element-icon-div");
const elementContainer = document.querySelector(".recipes");
const elementImages = document.querySelectorAll(".element-img");
const itemView = document.querySelector(".item-view");

const imageInput = document.querySelector("#image-file");
const nameInput = document.querySelector("#name");
const ingredientsInput = document.querySelector("#ingredients");
const descriptionInput = document.querySelector("#description");
const submitBtn = document.querySelector("form");

const nameDiv = document.querySelector(".name");
const ingredientsDiv = document.querySelector(".ingredient-list");
const descriptionDiv = document.querySelector(".description-div");
const itemImg = document.querySelector(".item-img");


/* |||| ONLOAD |||| */
    let itemCount = 0;

    if("itemCount" in localStorage){
        itemCount = localStorage.getItem("itemCount");
    }else {
        localStorage.setItem("itemCount", JSON.stringify(itemCount));
    }

    document.addEventListener("DOMContentLoaded", () => {

        for(let i=0; i<itemCount; i++){

            let currentDataset = JSON.parse(localStorage.getItem(i + 1));

            const htmlElement = `<div class="element">
                <div class="element-icon-div" data-id="${i + 1}"><i class="fa-solid fa-x"></i></div>
                <img class="element-img" src="${currentDataset[3]}" alt="An image of a food" width="310" height="310">
                <p class="name">${currentDataset[0]}</p>
                </div>`;

                console.log(htmlElement);

                elementContainer.innerHTML += htmlElement;
        }





        settingTheEventsForButtons();
        settingTheEventsForItemViewing();
    });

/* Adding button */

addingBtn.addEventListener("click", () => {
    background.style.display = "block";
    addingForm.style.display = "block";
});


/* || Adding An Element || */

submitBtn.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        itemCount++;
        localStorage.setItem("itemCount", JSON.stringify(itemCount));

        const reader = new FileReader();
        let imgSrc;
        let name = nameInput.value;
        let ingredients = '-' + ingredientsInput.value.replaceAll(',', '<br>-').replaceAll('<br>- ', '<br>-');
        let description = descriptionInput.value;

        console.log(name);
        console.log(description);
        console.log(ingredients);

            reader.addEventListener("load", function() {
                imgSrc = reader.result;
                console.log(imgSrc);
                console.log(reader.result);

                const htmlElement = `<div class="element">
                <div class="element-icon-div" data-id="${itemCount}"><i class="fa-solid fa-x"></i></div>
                <img class="element-img" src="${imgSrc}" alt="An image of a food" width="310" height="310">
                <p class="name">${name}</p>
                </div>`;

                console.log(htmlElement);

                elementContainer.innerHTML += htmlElement;
                const dataArray = [name, ingredients, description, imgSrc];
                localStorage.setItem(itemCount, JSON.stringify(dataArray));

                settingTheEventsForButtons();
                settingTheEventsForItemViewing();
            });
        
            reader.readAsDataURL(imageInput.files[0]);  

            
        
});

/* ||Viewing an Item|| */

function settingTheEventsForItemViewing(){

    const elementImages = document.querySelectorAll(".element-img");

    elementImages.forEach((image) => {
    image.addEventListener("click", (e) => {
        let currentId = e.currentTarget.previousElementSibling.dataset.id;
        console.log(currentId);
        let currentDataset = JSON.parse(localStorage.getItem(currentId));
        console.log(currentDataset);
        nameDiv.innerText = currentDataset[0];
        ingredientsDiv.innerHTML = currentDataset[1];
        descriptionDiv.innerText = currentDataset[2];
        console.log(currentDataset[3]);
        itemImg.src = currentDataset[3];

        itemView.style.display = "block";
        background.style.display = "block";
        itemView.style.top =  `${window.scrollY + 20}px`;
        console.log(window.scrollY);
        });
    });

    

;}

/* Close button */

closingBtns.forEach((closingBtn) => {
    closingBtn.addEventListener("click", () => {

            background.style.display = "none";
            addingForm.style.display = "none";
            itemView.style.display = "none";

            
    
    });
})

/* Element Delete */

function settingTheEventsForButtons(){

    deletingElementBtns = document.querySelectorAll(".element-icon-div");

    deletingElementBtns.forEach((deletingElementBtn) => {
    deletingElementBtn.addEventListener("click", (e) => {

        localStorage.removeItem(itemCount);
        itemCount--;
        localStorage.setItem("itemCount", JSON.stringify(itemCount));


        console.log(e.target.parentElement.dataset.id);
        e.target.parentElement.parentElement.style.animationName = "disappearing"

        setTimeout(() => {e.target.parentElement.parentElement.remove()}, 700);
        });
    })
;}