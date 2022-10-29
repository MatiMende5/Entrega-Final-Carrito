var articuloCarrito = []; 


/***************************************************************************************************************
  * @param {number} Parametros
  * @returns {Array} 
***************************************************************************************************************** */
function llenarCarrito(idx) {
    let exist = false;
    articuloCarrito.forEach( function(product) {
        if (product.id == idx) {
            exist = true;                   
        } 
    } )
    if(exist){
        popup("Ya elegiste este artículo"); 
    }else{
    let articuloCarritoTemp = {
        id: articulos[idx - 1].id,
        title: articulos[idx - 1].title,
        description: articulos[idx-1].description,
        category: articulos[idx - 1].category,
        price: articulos[idx - 1].price,
        image: articulos[idx - 1].image,
        cantidad: 1
    }
    articuloCarrito.push(articuloCarritoTemp);    
    mostrarResumenCarrito();       
    }
}



 
/****************************************************************************************************
  * @param {ninguno} Parametros
  * @returns {Array}  
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function mostrarDetallesCarrito() {
    var monto = montoAcumulado();
    let menuVenta = '\
        <div class = "franjaSuperior">   \
          <div class="menuVenta"> \
            <div><button class="openbtn" onclick="ejecutarVenta()">Finalizar la compra</button> </div> \
            <div><button class="openbtn" onclick="vaciar()">Vaciar carrito</button> </div> \
            <div><button class="openbtn" onclick="cerrarVentana()">Cerrar</button> </div> \
          </div> \
          <div class="info"> \
            <div> <p>Cantidad de artículos: ' + articuloCarrito.length + '</p> </div>\
            <div><p>Monto a pagar: $ <span id="precio"><b>' + monto.toFixed(2) + '</b></span></p></div>   \
          </div>    \
        </div> '
    document.getElementById("comprar").style.display = "block";
    document.getElementById("superior").style.display = "block";
    document.getElementById("superior").innerHTML = menuVenta;
    if (monto == 0){
        cerrarVentana();
        popup("No tiene articulos en el carrito....");        
    } else {
        var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
            var cantidadDisponible = buscarStock(bar.id)
            return ' \
                <div class="caja2">  \
                <div class="caja2Img">     \
                    <abbr title="' + bar.description + '"><img src="'+bar.image+'" ></abbr>  \
                </div> \
                <div>        \
                    <h3>'+bar.title+'</h3> \
                    <p> '+bar.category+'</p> \
                    <p> Disponibles: ' + cantidadDisponible +'</p> \
                    <p>Precio: $ <span id="precio"><b>'+bar.price+'</b></span></p> \
                    <div class="cantDisp">\
                        <input type="number"  id="nrItems'+bar.id+'" value='+bar.cantidad+' size="3" readonly>\
                        <input type="button"  onclick="agregarQuitar(1, '+bar.id+')" value="+">\
                        <input type="button"  onclick="agregarQuitar(2, '+bar.id+')" value="-">\
                    </div>\
                </div>      \
                <div>\
                    <button class="openbtn" onclick="quitarArtCart('+bar.id+')">Quitar Articulo</button> </div> \
                </div> '       
        })
        var monto = montoAcumulado();
        document.getElementById("comprar").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
    }
}


/****************************************************************************************************
  * @param {Array} Parametros
  * @returns {Array} 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function mostrarResumenCarrito() {
    let monto = montoAcumulado().toFixed(2)
    document.getElementById("counter").innerHTML = articuloCarrito.length;   
    document.getElementById("total").innerHTML = "<br><hr><br><b style='color: Red;'>Total: $ " + monto + "</b><br>";     //muestra el monto total
    document.getElementById("btnVaciar").innerHTML = '<h2 onclick="vaciar()">Vaciar</h2> ';
    document.getElementById("btnComprar").innerHTML = '<h2 onclick="mostrarDetallesCarrito()">Detalles</h2> ';
}


/***************************************************************************************************************
  * @param {Ninguno} Parametros
  * @returns {Number} 
***************************************************************************************************************** */
function montoAcumulado(){
    let montoTmp = 0;
    var articleCarrito = articuloCarrito.map((bar) => montoTmp += Number(bar.price * bar.cantidad));
    return montoTmp;
}



/***************************************************************************************************************
  * @param {number} Parametros
  * @returns {Array}  
***************************************************************************************************************** */
function quitarArtCart(idx) {
     let indice = articuloCarrito.findIndex(function(index){
        return index.id == idx;
    });
    articuloCarrito.splice(indice,1);
    mostrarDetallesCarrito();
    mostrarResumenCarrito();
}


/****************************************************************************************************
  * @param {Ninguno} Parametros
  * @returns {Array} 
*/
function vaciar() {
    articuloCarrito = [];
    articleCarrito = [];
    document.getElementById("muestraCarrito").innerHTML = ""; 
    document.getElementById("total").innerHTML = "";    
    document.getElementById("counter").innerHTML = articuloCarrito.length;   
    document.getElementById("total").innerHTML = "";     
    document.getElementById("btnVaciar").innerHTML = "";
    document.getElementById("btnComprar").innerHTML = "";
    cerrarVentana();
    popup("El carrito fue vaciado....");

}



/****************************************************************************************************
  * @param {Ninguno} Parametros
  * @returns {ninguno}  
*/
function cerrarVentana(){
    document.getElementById("superior").style.display = "none";
    document.getElementById("comprar").style.display = "none";
}


/****************************************************************************************************
  * @param {Ninguno} Parametros
  * @returns {Array}  
*/
function ejecutarVenta() {
    let montoFacturado = montoAcumulado();
    articuloCarrito.forEach(function(product) {  
        const idArt = product.id;
        const elemento = "nrItems" + idArt; 
        let result = stock.filter(item => item.id == product.id);
        const nrItems = document.getElementById(elemento).value;
        result[0].disponible -= nrItems ; 
    })
    dataCat = document.getElementById("filtroCat").value;
    mostrarArticulos(dataCat);                         
    vaciar();
    cerrarVentana()
    popup("Operacion exitosa, su compra de $ "+ montoFacturado.toFixed(2)+  " se ha realizado...");
}


/****************************************************************************************************
  * @param {number|number} Parametros
  * @returns {Array}  
*/
function agregarQuitar(operador,idx){
    const elemento = "nrItems" + idx;       
    let indice = articuloCarrito.findIndex(indiceCarrito => indiceCarrito.id === idx);
    let cantidadEnStock = stock[idx-1].disponible;
    let cantidadAComprar = articuloCarrito[indice].cantidad
   
    if(operador == 1){
        if(cantidadAComprar != cantidadEnStock) articuloCarrito[indice].cantidad += 1;
    }else {
        if (cantidadAComprar  > 1) articuloCarrito[indice].cantidad -= 1;
    }
    document.getElementById(elemento).value = articuloCarrito[indice].cantidad; 
    mostrarDetallesCarrito();
    mostrarResumenCarrito();

}