var articulos = [];  
var stock = [];      


/***************************************************************************************************************
  * @param {string|string} Parametros
  * @returns {Array}  
***************************************************************************************************************** */
function getAPI(urlCall, filter) {
    fetch (urlCall)
    .then(response =>response.json())
    .then(data => {
        articulos = data;        
        llenarStockCount(data);     
        mostrarArticulos(filter); 
    })
    .catch(error => console.log("error =>", error)); 
       
}




/*****************************************************************************************************************
  * @param {string} Parametros
  * @returns {Array}  
  * *****************************************************************************************************************/
function mostrarArticulos(filter) {     
    if(filter == "all"){
        articulosF = articulos
    }else {
    let resultCat = articulos.filter(item => item.category == filter);
        articulosF = resultCat;
    }    
    var articleNew = articulosF.map((bar) => {
        var cantidadDisponible = buscarStock(bar.id)    
         if(cantidadDisponible == 0) {
            buttonAdd = '<div class="cajaBtn"> <p><b>AGOTADO...</b></P>  </div> ' ;
        } else {
            buttonAdd = '\
            <div class="cajaBtn">\
                <img class="btnCar" src="./img/add-to-cart-1747164_960_720.png" onclick="llenarCarrito('+bar.id+')">  \
            </div> ' ;      
        }
        return ' \
            <div class="caja">  \
                <div class="cajaImg">     \
                <abbr title="' + bar.description + '"><img src="'+bar.image+'" ></abbr>  \
                </div>   \
                <div class="arText">        \
                    <h3 id="tituloL">'+bar.title+'</h3> \
                    <p id="especificacionesL"> '+bar.category+'</p> \
                    <p> Disponibles: ' + cantidadDisponible +'</p> \
                    <p>Solo por: $<span id="precio">'+bar.price+'</span></p> \
                </div> '+buttonAdd+'     \
            </div>'
        })
        document.getElementById("article").innerHTML = articleNew;  
}


/*****************************************************************************************************************
  * @param {Array Object} Parametros
  * @returns {Array} 
  * *****************************************************************************************************************/
function llenarStockCount(articulosStock) {
    articulosStock.forEach(function(item) { 
        
        let stockCantidad = {
            id: item.id,
            disponible: 20
        }   
        stock.push(stockCantidad);         
    })
}



/*****************************************************************************************************************
  * @param {number} Parametros
  * @returns {Number} 
  * *****************************************************************************************************************/
function buscarStock(idx) {
    let result = stock.filter(item => item.id == idx);
    return result[0].disponible;
}



/*****************************************************************************************************************
  * @param {string} Parametros
  * @returns {Array}
  * *****************************************************************************************************************/
let dataCat;
function filtrarCategoria() {
    dataCat = document.getElementById("filtroCat").value;
    localStorage.setItem("filtroCategoria", dataCat)
    mostrarArticulos(dataCat);
}
