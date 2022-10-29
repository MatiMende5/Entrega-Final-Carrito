 

const url = "https://fakestoreapi.com/products";
const urlTexto = "/src/data/informacion.json";

getAPI(url, "all");     
cargarTema();           
informacion(urlTexto);  

document.querySelector('.menu-btn').addEventListener('click', () => {
  console.log('click...');
  document.querySelector('.nav-menu').classList.toggle('show');
});


/****************************************************************************************************
  * @param {ninguno} Parametros: 
  * @returns   
*/

function cargarTema() {
  if("tema" in localStorage){
    const data = localStorage.getItem('tema');
    document.documentElement.setAttribute('tema', data);
    if (data == "ligth"){
        document.querySelector('#switch input[type="checkbox"]').checked = true;
        document.documentElement.setAttribute('tema', 'light');
    }    
  }
  const colorSwitch = document.querySelector('#switch input[type="checkbox"]');
  colorSwitch.addEventListener('change', cambiaTema);
}

/****************************************************************************************************
  * @param {boolean} Parametros
  * @returns   
*/
function cambiaTema(ev){
    if(ev.target.checked){
        document.documentElement.setAttribute('tema', 'light');
        localStorage.setItem('tema', 'ligth');

    } else {
        document.documentElement.setAttribute('tema', 'dark');
        localStorage.setItem('tema', 'dark');

    }
}
            



/****************************************************************************************************
  * @param {string} Parametros
  * @returns   
*/
function informacion(urlTexto) {
  fetch (urlTexto)
    .then(response =>response.json())
    .then(dataText => {
        const myleni = dataText[0].title;           
        document.getElementById("textoLeni").title = myleni; 
    })
    .catch(error => console.log("error =>", error));
        
}



/****************************************************************************************************
  * @param {string} Parametros
  * @returns   
*/
function popup(text) {
    document.getElementById("popup").innerHTML = "<div class='popupText'><h3>" + text + "</h3></div>";
    document.getElementById("popup").style.height = "100px";
    setTimeout(function(){ 
    document.getElementById("popup").style.height = "0";
  }, 3000);

}
//***************************************************************************************************** */


