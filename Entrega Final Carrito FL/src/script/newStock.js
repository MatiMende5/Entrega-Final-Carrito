/***************************************************************************************************************
  * @param {Ninguno} Parametros: 
  * @returns {vacio}  
***************************************************************************************************************** */
function openNav() {
  document.getElementById("newStock").style.width = "80%";
}
  
function closeNav() {
  document.getElementById("newStock").style.width = "0";
}



/***************************************************************************************************************
  * @param {number|string} Parametros: 
  * @returns {Array}  
***************************************************************************************************************** */
function agregar_articulo() {
  let idNumber = articulos.length + 1;
  const newTitulo = document.getElementById("titulo").value;
  const newespecificaciones = document.getElementById("especificaciones").value;
  const newCategoria = document.getElementById("categoria").value;
  const newPrecio = document.getElementById("costo").value; 
  const newCantidad = document.getElementById("cantidad").value;
  const newImg = document.getElementById("imagen").textContent;
  if (newTitulo === "" || newespecificaciones === "" || newPrecio === "" || newImg == "" || newCategoria == "") { 
      popup("...Debe llenar todos los campos del formulario.Intente de nuevo..."); 
  } else {  
      let newArticulo = {
          id: idNumber,
          title: newTitulo,
          description: newespecificaciones,
          category: newCategoria,
          price: newPrecio,
          image: newImg
      }   
      articulos.push(newArticulo); 
      let stockCantidad = {
          id: idNumber,
          disponible: newCantidad
      }   
      stock.push(stockCantidad); 
      document.getElementById("titulo").value = "";
      document.getElementById("especificaciones").value = "";
      document.getElementById("costo").value = ""; 
      document.getElementById("cantidad").value = "";
      document.getElementById("imagen").textContent = "";
      document.getElementById("div1").textContent = "";
      document.getElementById("categoria").value = "";
      mostrarArticulos("all");
      popup("El artículo se ha registrado correctamente...");
  }
}

/****************************************************************************************************
* @param {string} Parametros
* @returns {string}   
******************************************************************************************************/

function addImg(text) {  
  document.getElementById("div1").innerHTML = '<img id="drag" src="' + text + '"></img>'
  document.getElementById("imagen").innerHTML = text;
}


