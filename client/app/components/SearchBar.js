import React from 'react';

class SearchBar extends React.Component {
    onInputChange(term) {
        if(term == "<@:_-123kurgesagt321-_:@>"){
            this.props.onGifChange();
        }else{
            this.props.onTermChange(term);
        }
    }

    render() {
        let  props = this.props;
        //console.log (props.giffys)
        var helper = props.giffys;
        //console.log(helper);
        var data = helper.slice(1,-1);
        data = '['+data+']';
        JSON.parse(data)
        //console.log(JSON.parse(data))
        //console.log(this.props.gifs)

        return (
            <div className="search col-12">
                <input id="input" placeholder="Buscador de gifs!" onChange={event => this.onInputChange(event.target.value)} />
                <button type="button" className="btn btn-success" onClick={event => this.onInputChange("<@:_-123kurgesagt321-_:@>")}>Top Ten!</button>
            </div>
        );
    }
}

export default SearchBar;
