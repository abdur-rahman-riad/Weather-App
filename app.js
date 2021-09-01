const searchButton = document.getElementById('search-button');
const searchFiled = document.getElementById('search-filed');
const mainContainer = document.getElementById('main-container');

searchButton.addEventListener('click', buttonAction);
function buttonAction() {
    // Getting Dynamic URL
    const searchCity = searchFiled.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=6354569da1e70ce6bb05b2a60692c4e6`;
    fetch(url)
        .then(response => response.json())
        .then(city => {

            // Error Handeling
            if (searchFiled.value == '') {
                document.getElementById('empty-city').style.display = 'block';
                document.getElementById('not-found').style.display = 'none';
                mainContainer.style.display = 'none';
            } else if (city.cod == '404') {
                document.getElementById('not-found').style.display = 'block';
                document.getElementById('empty-city').style.display = 'none';
                mainContainer.style.display = 'none';
            } else {
                document.getElementById('not-found').style.display = 'none';
                document.getElementById('empty-city').style.display = 'none';
                mainContainer.style.display = 'block';
            }

            // Calculating Temperature
            const apiTemp = city.main.temp;
            const actualTemp = parseInt(apiTemp);
            const calculateTemp = actualTemp / 10;
            const temp = parseInt(calculateTemp);

            // Set All Inner Text
            document.getElementById('temp-ID').innerText = temp;
            document.getElementById('city-name').innerText = city.name;
            document.getElementById('country-ID').innerText = city.sys.country;
            document.getElementById('weather-mode').innerText = city.weather[0].main;
            document.getElementById('weather-description').innerText = city.weather[0].description;
            document.getElementById('humidility').innerText = city.main.humidity;

            // Feels Like Calculation
            const apiFeelsLike = city.main.feels_like;
            const actualFeelsLike = parseFloat(apiFeelsLike);
            const calculateFeelsLike = actualFeelsLike / 10;
            const feelsLike = parseFloat(calculateFeelsLike);
            document.getElementById('feels-like').innerText = feelsLike.toFixed(2);

            // Date Calculation
            const unixDatestamp = city.dt;
            const milliseconds = unixDatestamp * 1000;
            const dateObject = new Date(milliseconds);
            const thisMonth = dateObject.toLocaleString("en-US", { month: "long" });
            const thisDay = dateObject.toLocaleString("en-US", { day: "numeric" });
            const thisYear = dateObject.toLocaleString("en-US", { year: "numeric" });
            document.getElementById('toDay').innerText = thisDay;
            document.getElementById('currentMonth').innerText = thisMonth;
            document.getElementById('thisYear').innerText = thisYear;

            // Clear Input Filed
            searchFiled.value = '';
        })
}
