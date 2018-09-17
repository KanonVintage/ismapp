import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
	console.log(props.gifs)
    const gifItems = props.gifs.map((image) => {
    	if (image.id == null ){
    		return <GifItem key={image._id}
                        gif={image}
                        onGifSelect={props.onGifSelect} />
        } else {
        	return <GifItem key={image.id}
                        gif={image}
                        onGifSelect={props.onGifSelect} />
        }
    });

    return (
        <div className="gif-list">{gifItems}</div>
    );
};

export default GifList;
