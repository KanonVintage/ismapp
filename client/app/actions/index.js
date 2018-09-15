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

  if(!Number.isInteger(gif.rating)||gif.rating<0) gif.rating=0;
  data.source = gif.images.downsized.url;
  if (typeof gif.user != "undefined") data.creator = gif.user.display_name;
  else data.creator = "anonimo";
  data.rating = gif.rating;
  console.log(data)

  fetch('/api/gifs', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let gifs = data;
        data.push(json);
      });

  return {
      type: SAVE_GIF,
      gif
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
