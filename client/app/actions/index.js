import request from 'superagent';
import { compose } from 'redux';
import axios from 'axios';
import 'whatwg-fetch';

//gifs easteregg
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SAVE_GIF = 'SAVE_GIF';
const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';


export function saveGif(gif){
  const data = {}

  gif.rate = parseInt(gif.rate, 10);

  if(!Number.isInteger(gif.rate)||gif.rate<0) gif.rate=0;
  data.source = gif.images.downsized.url;
  if (typeof gif.user != "undefined") data.creator = gif.user.display_name;
  else data.creator = "anonimo";
  data.rating = gif.rate;
  console.log(data)

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
    return {
        type: REQUEST_GIFS,
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
