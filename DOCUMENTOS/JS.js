


function arranca(){
	cargaPro()
	pintarcarro()
	tarjetas()
	corre()
	}
	
	/*__________________________________________*/	
	
	function cargaPro(){
	pintarcarro()
	
	let url ="DOCUMENTOS/productos.json";
	
	fetch(url)
		.then( response => response.json() )
		.then( data => mostrarData(data) )
		.catch( error => console.log(error) )
	const mostrarData = (data) => {
	  localStorage.setItem('localArchivos', JSON.stringify(data))	
	  tarjetas()
	}
	}
	
	/*__________________________________________*/	
	/*__________________________________________*/
	function tarjetas(){

	table.innerHTML = ``
	data = JSON.parse(localStorage.getItem('localArchivos')) ?? []
	data.forEach(function (value, i){      
	var table = document.getElementById('table')
	
	table.innerHTML += 
	`
	<tr class="perro0" >
	<td  class="perro2">
	<div class="imagenx">
	<img  src="blog-1.png" alt="blue">
	</div>
	<div class="padin">
	
	<div class="intruc-titulo">
	<button value="${data[i].codi}" id="idtar${[i]}">#${[i]}</button>
	<button>${data[i].codi}</button>
	<h1>${data[i].producto}</h1>
	</div>
	
	<div class="intruc-especificacion">
	<h2>${data[i].descripcion}</h2>
	</div>
	<div class="precio-tar">
	<h2>MXN $${data[i].precio}</h2>
	<h3>CODI-${data[i].id2}</h3>
	</div>
	<div class="intruc-visual">
	<a><i class="zmdi zmdi-local-offer zmdi-hc-fw"></i><span>${data[i].catego1}</span></a>
	<a><i class="zmdi zmdi-local-offer zmdi-hc-fw"></i><span>${data[i].catego2}</span></a>
	<a><i class="zmdi zmdi-local-offer zmdi-hc-fw"></i><span>${data[i].catego3}</span></a>
	</div>
	<div class="botones-con">
	<input type="number" value="1" class="number-text" id="${i}">
	<button class="btn-car" onclick="find2(${i})">agregar
</div>

	</div>

	</td>
	
	</tr>
	`
	})  
	}
	
	
	
	
	
	
	
	
	/*__________________________________________*/	
	
	
	/*__________________________________________*/	
	function find2(id){
	var value2 = JSON.parse(localStorage.getItem('localArchivos'));
	for (var i = 0; i < value2.length; i++) {             
	if([i]==id){
	
	var cant = document.getElementById([i]).value
	if (cant == 0){
	break;
	}
	var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
	Total:0.0,
	Items:0,
	Data:[]}; 
	
	var sub_total= parseFloat((cant * value2[i].precio)).toFixed(2);
	var total= parseFloat(sub_total)+parseFloat(cart.Total);
	cart.Total=parseFloat(total).toFixed(2);
	cart.Items=1+cart.Items;
	cart.Data.push({
			id:value2[i].id2,
			codi:value2[i].algo,
			producto:value2[i].producto,
			precio:value2[i].precio,
			imagen:value2[i].imagen,
			cantidad:parseInt(cant),
			subtotal:sub_total});
	
	localStorage.setItem('cart',JSON.stringify(cart)); 
	pintarcarro()
	break;
	}
	}
	}
	/*__________________________________________*/	
	
	
	
	/*__________________________________________*/	
	function pintarcarro(){   
	var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {
			Total:0.0,
			Items:0,
			Data:[]}; 
			$('#tbl_carts').empty();  
			for (var i = 0; i < cart.Data.length; i++) {             
	var newRow ='<tr class="pepa">'
	newRow+= '<td>'+cart.Data[i].codi+'</td>'
	newRow+= '<td>'+cart.Data[i].producto+'</td>'
	newRow+= '<td>'+cart.Data[i].precio+'</td>'
	newRow+= '<td><h3>'+cart.Data[i].cantidad+'</h3></td>'

	newRow+= '<td>'+cart.Data[i].evento+'</td>'
	newRow+= '<td>$'+cart.Data[i].subtotal+'</td>'
	newRow+= '<td><div class="boton-tabla"><input type="Submit" value="ELIMINAR" onclick="deleteCart('+[i]+');"></td>'
	newRow+= '</tr>'
	
	//---------------------------------------
	
	 $("#tbl_carts").append(newRow);         
	  } 
	
	$('#val_total').text(cart.Total);  
	$('#val_items').text(cart.Items);
	$("#alert_pedido").hide();
	$("#alert_carrito").hide();
	$("#alert_pedido_sucess").hide();               
	$("#alert_carrito_success").hide(); 
	
	  }
	
	function deleteCart(id){
	var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {Total:0.0,Items:0,Data:[]};
	for (var i = 0; i < cart.Data.length; i++) {             
	if([i]==id){
	cart.Total=parseFloat(parseFloat(cart.Total).toFixed(2)-parseFloat(cart.Data[i].subtotal).toFixed(2)).toFixed(2);
	cart.Items=parseInt(cart.Items) - 1;   
	cart.Data.splice(i,1);                  
	break;
	}    
	}
	localStorage.setItem('cart',JSON.stringify(cart));
	pintarcarro()
	 $("#alert_pedido_sucess").text("Se elimino el registro");
	$("#alert_pedido_sucess").fadeTo(2000, 500).slideUp(500, function() {
	 $("#alert_pedido_sucess").slideUp(500);
		});  
		}
	/*__________________________________________*/	
	
	
	/*__________________________________________*/	
	function savePedido(){
	var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {Total:0.0,Items:0,Data:[]};
	var pedido ='';
	let telefono = "529365638063";
	for (var i = 0; i < cart.Data.length; i++) {         
	pedido+=cart.Data[i].producto+"\t"+cart.Data[i].subtotal+"\t"+cart.Data[i].id+"\t"+cart.Total+"\t";
	}   
	
	let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
	*dettoven*%0A
	*PEDIDO*%0A
	${pedido}%0A
	`;
	
	window.open(url);
	}
	/*__________________________________________*/	
	


	
	
	/*==================== busqueda ====================*/
	function Buscar() {
		var tabla = document.getElementById('table');
		var busqueda = document.getElementById('txtBusqueda').value.toLowerCase();
		var cellsOfRow="";
		var found=false;
		var compareWith="";
		
		for (var i = 0; i < tabla.rows.length; i++) {
		cellsOfRow = tabla.rows[i].getElementsByTagName('td');
		found = false;
		for (var j = 0; j < cellsOfRow.length && !found; j++) { 
			compareWith = cellsOfRow[j].innerHTML.toLowerCase();
		 if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1))
		{
		found = true;
		}
		}
		if(found)
		{	
		tabla.rows[i].style.display = '';
		} else {
		tabla.rows[i].style.display = 'none';
		}
		}
		 }
		// ]]>
		/*==================================================*/	
		
	
























function corre() {
data = [
	{'id':'tarjeta',},
	{'id':'menus',},
	{'id':'botones',},
	{'id':'l2',},
	{'id':'nada',} 
	 ];
	data2 =JSON.parse(localStorage.getItem('localArchivos')) ?? []
	for (var i = 0; i < data.length; i++) { 
	if(data[i].id2==data[i].id2){      
	var table = document.getElementById('carga1')
	table.innerHTML += 
	`
	<button onclick="mane('${[i]}')" id='${[i]}'  value="${data[i].id}" class="xx44">${data[i].id}</button>
	`
	} 
	}
}
function mane(codigo){
for (var i = 0; i < data.length; i++) { 

if (codigo==[i]){
var tr = document.getElementById([i]).value;
document.getElementById('txtBusqueda').value=tr;
Buscar()
}
}}
function todo(){
document.getElementById('txtBusqueda').value="";
Buscar()
}












  



