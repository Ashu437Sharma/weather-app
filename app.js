let data1= document.querySelector(".one");
let data2= document.querySelector(".two");
let data3= document.querySelector(".three");
let data4= document.querySelector(".four");
let data5= document.querySelector(".five");
let btn= document.querySelector("button");
let inp= document.querySelector("input");
btn.addEventListener("click",async function() {
    
    let input= inp.value.trim();
    if(input.length!=0){
        let url= `https://wttr.in/${input}?format=j1`;
        let resp= await getWeather(url);
        data1.innerHTML= `${resp.current_condition[0].temp_C}°C`;
        data2.innerHTML= `${resp.current_condition[0].humidity}%`;
        data3.innerHTML= `${resp.current_condition[0].windspeedKmph}Km/h`;
        data4.innerHTML= resp.current_condition[0].weatherDesc[0].value;
        data5.innerHTML= resp.nearest_area[0].country[0].value;
        let img= document.querySelector("img");
        img.src= resp.current_condition[0].weatherIconUrl[0].value;
        img.style.display= "block";
    }else{
        alert("Enter a city");
    }
})
async function getWeather(url) {
    btn.innerHTML= `<span class="material-symbols-outlined">
progress_activity
</span>`;
    btn.disabled= true;
    try{
        let data= await fetch(url);
        data= await data.json();
        return data;
    }catch(e){
        alert(`Weather didn't shown due to ${e}`);
    }finally{
        btn.innerHTML= `<span class="material-symbols-outlined">
search
</span>`;
        btn.disabled= false;
        inp.value="";
    }
    
}