/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
const cityField = document.getElementById('zip');

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

const api = '&appid=af62cf116e5b076dad6f914248c270e3&units=metric';

//Get Todays feelings

const feel = document.getElementById('feelings');

//Add GET request function
const getWeatherData =  async function(URL,name,key) {
    const response = await fetch(URL+name+key);
    try {
       const data = await response.json();
       console.log(data);
       return data;
           
    } catch(error) {
        console.log('error',error);
    }

}



//Create a POST request function

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error',error);
    }
}

//Create updateUI function

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const dataUI = await request.json();
        console.log(dataUI);
        document.getElementById('date').innerHTML = `Date: ${dataUI[0].date}`;
        document.getElementById('temp').innerHTML = `Current Temperature: ${dataUI[0].current} C`;
        document.getElementById('content').innerHTML = `This is ${cityField.value}, today is ${dataUI[0].date}. Current Temperature is ${dataUI[0].current} C, with a minimum of ${dataUI[0].min} C and a mximum of ${dataUI[0].max} C, the sky should be a ${dataUI[0].sky}. You are feeling ${feel.value}. Have a good day!`;
    } catch(error) {
        console.log('error',error);
    }
}


//Create chained promises

const generateData = function() {
    getWeatherData(baseURL,cityField.value,api)
    .then(data => postData('/weather',{
        name: data.name, 
        current:data.main.temp, 
        min:data.main.temp_min, 
        max:data.main.temp_max, 
        date:newDate, 
        feels:feel.value, 
        sky:data.weather[0].description
        }
        )
        .then(
            updateUI()
        )
        
        )
  
        
    
}

//Add eventListener to the generate button
const gen = document.getElementById('generate');

gen.addEventListener('click',generateData);





