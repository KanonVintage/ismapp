import React from 'react';

const GifItem = ({gif, onGifSelect}) => {
	//console.log(gif)
	if (gif.id==null){
	    return (
	        <div className="gif-item">
	            <img src={gif.source} alt="" />
	            <pre className="text-center">Rating: {gif.rating}</pre>
	        </div>
	    )
	}else{
		return (
	        <div className="gif-item" onClick={() => onGifSelect(gif)}>
	            <img src={gif.images.downsized.url} alt="" />
	        </div>
	    )
	}
};

export default GifItem;
