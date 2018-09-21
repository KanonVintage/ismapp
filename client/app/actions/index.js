import request from 'superagent';
import { compose } from 'redux';
import axios from 'axios';
import 'whatwg-fetch';

//contenedores
export const REQUEST_CONTENEDORES = 'REQUEST_CONTENEDORES';
export const SAVE_CONTENEDOR = 'SAVE_CONTENEDOR';
export const OPEN_CONMODAL = 'OPEN_CONMODAL';
export const CLOSE_CONMODAL = 'CLOSE_CONMODAL';
export const DOWN_REPORT = 'DOWN_REPORT';

//gifs easteregg
export const OPEN_MODAL = 'OPEN_MODAL';
export const LOAD_GIFS = 'LOAD_GIFS';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SAVE_GIF = 'SAVE_GIF';
const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

export function downloadReport(JSONData, ReportTitle, ShowLabel){

    let report = JSONData.datos

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();

    if(dd<10) { dd = '0'+dd } 
    if(mm<10) { mm = '0'+mm } 
    if(h<10) { h = '0'+ h }
    if(m<10) { m = '0'+ m } 
    today = mm + '-' + dd + '-' + yyyy + '_' + h + '-' + m;

    let helper2 = [];
    
    for(var k in report) {
      var helper = {}
      helper.contenedor = report[k].contenedor
      helper.etapa = report[k].etapa
      helper.fecha = report[k].fecha
      helper.hora = report[k].hora
      helper.isocode = report[k].isocode
      helper.operador = report[k].operador
      helper.tara = report[k].tara
      helper.tipo = report[k].tipo
      helper.viaje = report[k].viaje
      helper2.push(helper)
    }

    JSONData = helper2;

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = today + "_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  return {
      type: DOWN_REPORT,
  }
}


//abre el modal del contenedor
export function openConModal(tipo = null) {
  return {
      type: OPEN_CONMODAL,
      tipo
  }
}

//cierra el modal de cada gif sleccionado
export function closeConModal() {
    return {
        type: CLOSE_CONMODAL
    }
}

//obtener los contenedores de la base de datos
export function requestContenedores(term = null) {
    const data = request.get('/api/containers');

    return {
        type: REQUEST_CONTENEDORES,
        payload: data
    }
}

//obtener los contenedores de la base de datos
export function saveContenedor(dato = null) {
    //console.log(dato)
    let container = {};

    console.log(dato)

    if (dato.tipo=="salida"){
      container.contenedor = dato.contenedor;
      container.tipo = dato.tipo;
      container.viaje = dato.viaje;
      container.isocode = dato.isocode;
      container.tara = dato.tara;
      container.etapa = dato.etapa;
      container.operador = dato.operador;
      container.puerto_origen = dato.puerto;
      container.fecha = dato.fecha;
      container.hora = dato.hora;
    } else if (dato.tipo=="ingreso"){
      container.contenedor = dato.in_contenedor;
      container.tipo = dato.tipo;
      container.viaje = dato.in_viaje;
      container.isocode = dato.in_isocode;
      container.tara = dato.in_tara;
      container.etapa = dato.in_etapa;
      container.operador = dato.in_operador;
      container.puerto_origen = dato.in_puerto;
      container.fecha = dato.in_fecha;
      container.hora = dato.in_hora;
    }

    //console.log(container);

    return (dispatch) => {
      fetch('/api/containers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(container)
      })
      .then(res=>res.json())
      .then(res => {console.log("done");    location.reload(); });;
    }

    /*return {
        type: SAVE_CONTENEDOR,
        payload: dato
    }*/
}


export function saveGif(gif){
  const data = {}

  gif.rate = parseInt(gif.rate, 10);

  if(!Number.isInteger(gif.rate)||gif.rate<0) gif.rate=0;
  data.source = gif.images.downsized.url;
  if (typeof gif.user != "undefined") data.creator = gif.user.display_name;
  else data.creator = "anonimo";
  data.rating = gif.rate;
  //console.log(data)

  return (dispatch) => {
    fetch('/api/gifs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res => console.log("done"));;
  }
}

//obtener los gifs de internet
export function requestGifs(term = null) {
    const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);
    //console.log(data)
    return {
        type: REQUEST_GIFS,
        payload: data
    }
}

//obtener los gifs del top ten
export function requestGiffys(term = null) {
    let data = {};
    data = JSON.parse(term)
    return {
        type: LOAD_GIFS,
        payload: data
    }
}


//abre el modal de cada gif seleccionado
export function openModal(gif) {
  return {
      type: OPEN_MODAL,
      gif
  }
}

//cierra el modal de cada gif sleccionado
export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}
