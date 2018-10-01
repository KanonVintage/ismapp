import React from 'react';
import Item from './Item';
import ReactTable from "react-table";
import ReactDOM from 'react-dom';
import {Input, Modal, Row, Col, Button, Icon} from 'react-materialize'
import matchSorter from 'match-sorter'
//import '../styles/styles.scss';

class Lista extends React.Component {

  onClickChange(term){
    this.props.report.datos = term
    //console.log(this.props.report)
    this.props.downloadReport()
  }

	render(){
    let props = this.props;
    //console.log(this.props.contenedores.length)

    if(props.contenedores.length==0){
	    return (
	        <div id="tabla"></div>
	    );
	}else{
		const data = props.contenedores;
		//console.log(data)
        return (
        <div id="tabla" className="container">
          <Row>
            <Col s={5}>
              <Button waves='light' 
                      className="green lighten-2" 
                      onClick={() => this.onClickChange(this.selectTable.getResolvedState().sortedData)}>
                      Reporte
                        <Icon right>
                          import_export
                        </Icon>
              </Button>
            </Col>
          </Row>

          <ReactTable
            ref={(r)=>this.selectTable=r}
            data={data}
            filterable
            defaultFilterMethod={(filter, filas) =>
                String(filas[filter.id]) === filter.value}
            columns={[
              {
                Header: 'Contenedor',
                accessor: "contenedor",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["contenedor"] }),
                    filterAll: true
              },{
                Header: 'Viaje',
                accessor: "viaje",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["viaje"] }),
                    filterAll: true
              },{
                Header: 'Operador',
                accessor: "operador",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["operador"] }),
                    filterAll: true
              },{
                Header: 'Tipo',
                accessor: "tipo",
                Cell: row => (
                  <span>
                    <span style={{
                      color: row.value === 'ingreso' ? '#57d500'
                        : row.value === 'salida' ? '#ff2e00'
                        : '#57d500',
                      transition: 'all .2s ease'
                    }}>
                      &#x25cf;
                    </span> {
                      row.value === 'ingreso' ? "ingreso"
                      : row.value === 'salida' ? "salida"
                      : "no data"}
                  </span>
                ),
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["tipo"] }),
                    filterAll: true,
              },{
                Header: 'Fecha',
                accessor: "fecha",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["fecha"] }),
                    filterAll: true
              },{
                Header: 'Hora',
                accessor: "hora",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["hora"] }),
                    filterAll: true
              },{
                Header: 'Placa',
                accessor: "etapa",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["etapa"] }),
                    filterAll: true
              },{
                Header: 'Isocode',
                accessor: "isocode",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["isocode"] }),
                    filterAll: true
              },{
                Header: 'Tara',
                accessor: "tara",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["tara"] }),
                    filterAll: true
              },
            ]}
            defaultPageSize={this.props.contenedores.length}
            className="-striped -highlight"/>
	        </div>
	    );
	}}
};

export default Lista;
//onGifSelect={props.onGifSelect} />