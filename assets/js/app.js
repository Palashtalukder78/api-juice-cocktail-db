const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    // Make empty field
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.textContent = '';

    const nullError = document.getElementById('null-error');
    nullError.style.display = 'none';

    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';

    if (inputValue == '') {
        const emptyError = document.getElementById('empty-error');
        emptyError.style.display = 'block';
    }
    else {
        const emptyError = document.getElementById('empty-error');
        emptyError.style.display = 'none';
        // Spinner show
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayItems(data.drinks))
    }
});

const displayItems = items => {
    if (items == null) {
        const nullError = document.getElementById('null-error');
        nullError.style.display = 'block';
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
        const juiceContainer = document.getElementById('juice-details');
        juiceContainer.style.display = 'none';
    } else {
        const itemsContainer = document.getElementById('items-container');
        itemsContainer.textContent = '';

        // Spinner Off
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
        //Null warning Off
        const nullError = document.getElementById('null-error');
        nullError.style.display = 'none';

        items.forEach(item => {
            console.log(item);
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
            <div class="card m-1">
                <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h6 class="card-title">${item.strDrink}</h6>
                <p class="card-text">${(item.strInstructions.slice(0, 50))}</p>
                <button onclick="itemDetails('${item.idDrink}')" class="btn btn-primary" >Details</button>
                </div>
            </div>
        `;
            itemsContainer.appendChild(div);
        });
    }
}
const itemDetails = itemId =>{
    //Show Spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.drinks[0]))
}
const displayDetails = juice => {
    //Hide Spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';

    const juiceContainer = document.getElementById('juice-details');
    juiceContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col-md-7');
    div.classList.add('mx-auto');
    div.innerHTML = `
        <div class="card mb-3">
            <div class="card-header text-center">
                ${juice.strDrink}
            </div>
            <div class="card-body">
                <div class="text-center">
                    <img src="${juice.strDrinkThumb}" class="img-fluid w-25 rounded-circle" alt="">
                </div>
                <h5 class="card-title">Name: ${juice.strDrink} </h5>
                <p class="card-text">${juice.strInstructions}</p>
            </div>
        </div>
    `;
    juiceContainer.appendChild(div);
}