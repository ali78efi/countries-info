//https://restcountries.com/v3.1/name/${country}
const input = document.getElementById('input');
const form = document.querySelector('form');
const container = document.querySelector('.container');
const msg = document.querySelector('.msg');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addCountry(input.value);
    input.value = ''
})




function addCountry(country) {
    const url = `https://restcountries.com/v3.1/name/${country}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const info = data[fixedData(data, country)];
            console.log(info);
            const {
                name,
                flags,
                population,
                capital
            } = info;
            const markup = `
            <div class="flag">
                <img src="${flags.svg}" alt="${name.common}'s flag">
                </div>
            <div class="description">
            <h3>${name.common}</h3>
            <h4>capital: ${capital[0]}</h4>
            <h4>Population: ${(+population / 1000000).toFixed(1)}M</h4>
            </div>
            `;
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');
            countryDiv.innerHTML = markup;
            container.appendChild(countryDiv);
        })
        .catch(err => {
            alert("country not found");
            console.log(err);
        })
}


function fixedData(dataArr, countryName) {
    let trueIndex=0
    dataArr.forEach((item, index) => {
        Object.values(item.name).forEach(countryNamesItem => {
            console.log(typeof countryNamesItem);
            console.log(typeof countryName);
            if ((typeof countryNamesItem == "string") && countryNamesItem.toUpperCase() == countryName.toUpperCase()) {
                trueIndex = index;
            }
        })
    });
    return trueIndex;
}