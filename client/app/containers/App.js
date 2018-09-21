import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import 'whatwg-fetch';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import '../styles/styles.scss';

class App extends React.Component {
    gifChange(term = null) {
        this.gifs = this.giffy;
        //console.log(this.gifs)
    }

    constructor(){
        super();
        this.state = {giffy: []};
    }

    componentDidMount(){
        //this.props.actions.requestContenedores();
        //console.log(this.props.contenedores)
        fetch('/api/containers', {
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
                <Formulario selectedCon   ={ this.props.selectedCon }
                            onPost        ={ () => this.props.actions.saveContenedor(this.props.selectedCon)}/>
                            <br/>
                <Lista      contenedores    ={this.state.giffy}
                            report          ={this.props.gifs}
                            downloadReport  = { () => this.props.actions.downloadReport(this.props.gifs, "Reporte", true) }/>
                
                
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
        selectedCon: state.contenedor.selectedCon,
        contenedores: state.contenedor.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

 /*<SearchBar  onTermChange={this.props.actions.requestGifs} 
                            onGifChange ={() => this.props.actions.requestGiffys(this.state.giffy)}
                            gifs        ={ this.props.gifs } 
                            giffys      ={this.state.giffy}/>

                            <GifList gifs={ this.props.gifs } onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } />
                <GifModal modalIsOpen   ={ this.props.modalIsOpen }
                          selectedGif   ={ this.props.selectedGif }
                          onRequestSave ={ () => this.props.actions.saveGif(this.props.selectedGif) }
                          onRequestClose={ () => this.props.actions.closeModal() } />
                          */