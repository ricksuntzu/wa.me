var url_atual = window.location.href;
const urlAll = new URL(url_atual);
const cel = urlAll.searchParams.get("c");

// link da minha planilha
const url = "https://script.google.com/macros/s/AKfycby04nvvnEzl1SsHql0JRWt1z2ZVGjJVCYTnbtd3-uqu4OKN97JFGy5r5mqU4P9FJxdAgw/exec";

const cod = "1n-awSHonxw85zjeoZXH9xUu6BcG134UY8vBLPsgSe7c";
const pagina = "CELL";//"CTRL";
const celulasAllUnits = "A1:G2"
 
//https://codepen.io/ecupaio/pen/QVrQov
document.addEventListener('DOMContentLoaded',loadDataAll);


function loadDataAll(){

  var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );
  //if(!dadosCll){
    fetch(url + `?cod=${cod}&pagina=${pagina}&celulas=${celulasAllUnits}` ).then((res)=>{return res.json()}).then((data)=>{
      makeLocalStorage(data,'dadosCll');
    })
  //}// if(!dadosCll){


}




function makeLocalStorage(dados,name){
  var { data } = dados;


  var vtrCell = data.find((a,b) => a.campo1===parseInt(cel) );   
  
  if(vtrCell){
    document.getElementById('grp_name').innerText = vtrCell.campo4;
    document.getElementById('grp_img').setAttribute("style",`background-image: url(${vtrCell.campo5})`);// = vtrCell.campo4;
    Object.assign(vtrCell,{latLong:{lat:0,lon:0,acc:0,alt:0,dir:0,spd:0}})
    
    localStorage.setItem(name, JSON.stringify(vtrCell) )    
  }
}


















function locate()
{
  if(navigator.geolocation){
    var optn = {enableHighAccuracy : true, timeout : 30000, maximumage: 0};
    //navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 0 });

    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  }else{
    alert('Geolocation is not Supported by your Browser...');
  }

  function showPosition(position){

    var lat = position.coords.latitude;
    if( lat ){
      lat = lat;// + ' deg';
    }
    else {
      lat = 'Not Available';
    }
    var lon = position.coords.longitude;
    if( lon ){
      lon = lon;// + ' deg';
    }
    else {
      lon = 'Not Available';
    }
    var acc = position.coords.accuracy;
    if( acc ){
      acc = parseInt( acc );// + ' m';
    }
    else {
      acc = 'Not Available';
    }
    var alt = position.coords.altitude;
    if( alt ){
      alt = alt;// + ' m';
    }
    else {
      alt = 'Not Available';
    }
    var dir = position.coords.heading;
    if( dir ){
      dir = dir;// + ' deg';
    }
    else {
      dir = 'Not Available';
    }
    var spd = position.coords.speed;
    if( spd ){
      spd = spd;// + ' m/s';
    }
    else {
      spd = 'Not Available';
    }

    /**
     * <div jsname="o6bZLc">
     * <input type="hidden" name="entry.465063029" value="COORDENADAS">
     * <input type="hidden" name="entry.1153408710" value="ID">
     * <input type="hidden" name="entry.2102713265" value="OBJETO COORDENADAS">
     * <input type="hidden" name="dlut" value="1686320953736">
     * </div>
     */

    var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );
    



    if(dadosCll){
      const distance = calculateDistance( [dadosCll.latLong.lat, dadosCll.latLong.lon], [lat, lon] );

      console.log(distance) 
      //latLong:{lat:0,lon:0,acc:0,alt:0,dir:0,spd:0}
      if( distance>dadosCll.campo6 ){
        Object.assign(dadosCll,{latLong:{lat,lon,acc,alt,dir,spd}})
        console.log(dadosCll)
        localStorage.setItem('dadosCll', JSON.stringify(dadosCll) )   

        $.ajax({
          url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdg8rMJSzLnVtzWIvBONE_mnGIiw62KSBGTyWN4Bluk6WnH9A/formResponse',     //The public Google Form url, but replace /view with /formResponse
          type: 'POST', //tells ajax to post the data to the url
          data: `entry.1153408710=${cel}&entry.465063029=${lat},${lon}&entry.2102713265=${JSON.stringify(dadosCll)}`,//$('#my-form').serialize(), //Nifty jquery function that gets all the input data 
          dataType: "json", //json xml      the standard data type for most ajax requests
          statusCode: { //the status code from the POST request
              0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
                  //success
                  //$('#form-success').text('Registro realizado com sucesso!');
                  //$("#form-success").fadeIn().delay(5000).fadeOut(clearFormsInput);
              }, 
              200: function(data) {//200 is a success code. it went through!
                  //success
                  //$('#form-success').text('Registro realizado com sucesso!');
                  //$("#form-success").fadeIn().delay(5000).fadeOut(clearFormsInput);
              },
              403: function(data) {//403 is when something went wrong and the submission didn't go through
              //error
                  alert('Algo deu errado. devemos verificar nosso código para garantir que tudo corresponda ao Google');
              }
          }  
      });






      }



    }
    /*
    $.ajax({
      type: 'POST',
      url: 'result_handler.php',
      data: {Status: ok_status,Lat: lat, Lon: lon, Acc: acc, Alt: alt, Dir: dir, Spd: spd},
      success: function(){popup();},
      mimeType: 'text'
    });
    */
  };
}

function showError(error)
{
  var err_text;
  var err_status = 'failed';

	switch(error.code)
  {
		case error.PERMISSION_DENIED:
			err_text = 'User denied the request for Geolocation';
      alert('Atualize esta página e permita a permissão de localização...');//Please Refresh This Page and Allow Location Permission...');
      break;
		case error.POSITION_UNAVAILABLE:
			err_text = 'Location information is unavailable';
			break;
		case error.TIMEOUT:
			err_text = 'The request to get user location timed out';
      alert('Please Set Your Location Mode on High Accuracy...');
			break;
		case error.UNKNOWN_ERROR:
			err_text = 'An unknown error occurred';
			break;
	}

  /*
  $.ajax({
    type: 'POST',
    url: 'error_handler.php',
    data: {Status: err_status, Error: err_text},
    success: function(){$('#change').html('Failed');},
    mimeType: 'text'
  });
  */
}










function calculateDistance(latlongAnterior, latlongNext) {
  const [lat1, lon1] = latlongAnterior;
  const [lat2, lon2] = latlongNext;
  // Função para converter graus em radianos
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Raio médio da Terra em metros
  const earthRadius = 6371000;

  // Convertendo as coordenadas de graus para radianos
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  // Fórmula de Haversine para calcular a distância entre dois pontos na Terra
  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância em metros
  const distance = earthRadius * c;

  return distance;
}


/**
 *  git config --global init.defaultBranch ricksuntzu
 * git init
 * git remote add origin https://github.com/ricksuntzu/wa.me.git
 * git add .
 * git commit -m "first commit"
 * git push -u origin master
 */
































async function gerarHash(string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}


























/*


    function filtrarOpcoes(_valor) {
      var select = document.getElementById('lista_del');
      var options = select.options;

      var filtro = _valor.toLowerCase();

      if (filtro) {
        for (var i = 0; i < options.length; i++) {
          var optionText = options[i].innerText.toLowerCase();
          if (optionText.includes(filtro)) {
            options[i].style.display = 'block';  // Exibe a opção
          } else {
            options[i].style.display = 'none';   // Oculta a opção
          }
        }
      } else {
        for (var i = 0; i < options.length; i++) {
          options[i].style.display = 'block';    // Exibe todas as opções
        }
      }
    }



    function expandirSelect() {
      var select = document.getElementById('lista_del');

      var selectHide = document.getElementsByClassName('container')[0];
      selectHide.style.display = "block";


      //select.size = select.options.length > 5 ? select.options.length : 5;
    }
  
    function reduzirSelect(e) {
      var selectHide = document.getElementsByClassName('container')[0];
      selectHide.style.display = "none";
    }

  
    //
    function selecionarOpcao() {

        var select = document.getElementById("lista_del");
        var opcaoSelecionada = select.value;
        document.querySelector('input[name="unit"]').value = opcaoSelecionada;
    }



//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter

*/

