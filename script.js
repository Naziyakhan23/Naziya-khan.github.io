const apiKey=`360001c081b3e9436fd1198381f61172`

async function fetchweatherdata(city){
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
if(!response.ok){
    throw new Error("Unable to fetch weather information")
}
const data= await response.json()
updateui(data)
    }catch(error){
        console.error(error)

    }
}

const cityEl=document.querySelector(".city")
const temperature=document.querySelector(".temp")
const windEl=document.querySelector(".wind-speed")
const humid=document.querySelector(".humid-speed")
const visible=document.querySelector(".visible-speed")
const desc=document.querySelector(".description-text")
const date=document.querySelector(".date")
const descicon=document.querySelector(".description i")

function updateui(data){
    cityEl.textContent=data.name
    temperature.textContent=`${Math.round(data.main.temp)+"°"}`
    windEl.textContent=`${data.wind.speed} km/h`
    humid.textContent=`${data.main.humidity}%`
    visible.textContent=`${data.visibility/100}km`
    desc.textContent=data.weather[0].description
    const currentDate= new Date()
    date.textContent=currentDate.toDateString()
    const weathericonname=getweathericonname(data.weather[0].main)
    descicon.innerHTML=`<i class="material-icons">${weathericonname}</i>`

}
const formEl=document.querySelector(".searchform")
const inputEl=document.querySelector(".cityinput")
formEl.addEventListener("submit", function(e){
    e.preventDefault()
    const city=inputEl.value
    if(city!==""){
        fetchweatherdata(city)
        inputEl.value=""
    }
})
function getweathericonname(weatherconditions){
    const icon_map={
        Clear:"wb_sunny",
        Clouds:"wb_cloudy",
        Rain:"umbrella",
        Thunderstorm:"flash_on",
        Drizzle:"grain",
        Snow:"ac_unit",
        Mist:"cloud",
        Smoke:"cloud",
        Haze:"cloud",
        Fog:"cloud",


    }
    return icon_map[weatherconditions] || "Help"
}





