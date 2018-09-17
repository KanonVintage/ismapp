import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import 'whatwg-fetch';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/styles.scss';

class App extends React.Component {
    gifChange(term = null) {
        this.gifs = this.giffy;
        console.log(this.gifs)
    }

    constructor(){
        super();
        this.state = {giffy: []};
    }

    componentDidMount(){
        /*console.log(this.props.giffy)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log("loading...")
                console.log(JSON.parse(xhr.responseText))
            }
        }
        xhr.open('GET', 'http://localhost:8000/topten/hello', true);
        xhr.send(null);*/
        fetch('http://127.0.0.1:8000/topten/data', {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        .then(res=>res.json())
        .then(json=>this.setState({giffy:json}));
    }

    render() {
        return (
            <div>
                <SearchBar  onTermChange={this.props.actions.requestGifs} 
                            onGifChange ={() => this.props.actions.requestGiffys(this.state.giffy)}
                            gifs        ={ this.props.gifs } 
                            giffys      ={this.state.giffy}/>
                <GifList gifs={ this.props.gifs } onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } />
                <GifModal modalIsOpen   ={ this.props.modalIsOpen }
                          selectedGif   ={ this.props.selectedGif }
                          onRequestSave ={ () => this.props.actions.saveGif(this.props.selectedGif) }
                          onRequestClose={ () => this.props.actions.closeModal() } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gifs: state.gifs.data,
        //giffy: state.gifs.giffys,
        modalIsOpen: state.modal.modalIsOpen,
        selectedGif: state.modal.selectedGif,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
