import request from 'superagent';
import { compose } from 'redux';
import axios from 'axios';
import 'whatwg-fetch';

//contenedores
export const REQUEST_CONTENEDORES = 'REQUEST_CONTENEDORES';
export const SAVE_CONTENEDOR = 'SAVE_CONTENEDOR';
export const OPEN_CONMODAL = 'OPEN_CONMODAL';
export const CLOSE_CONMODAL = 'CLOSE_CONMODAL';

//gifs easteregg
export const OPEN_MODAL = 'OPEN_MODAL';
export const LOAD_GIFS = 'LOAD_GIFS';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SAVE_GIF = 'SAVE_GIF';
const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';




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

    container.contenedor = dato.contenedor;
    container.viaje = dato.viaje;
    container.isocode = dato.isocode;
    container.tara = dato.tara;
    container.etapa = dato.etapa;
    container.operador = dato.operador;
    container.puerto_origen = dato.puerto;
    container.fecha = dato.fecha;
    container.hora = dato.hora;
    
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
      .then(res => console.log("done"));;
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
