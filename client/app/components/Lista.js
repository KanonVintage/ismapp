import React from 'react';
import Item from './Item';
import ReactTable from "react-table";
//import '../styles/styles.scss';

const Lista = (props) => {
	if(props.contenedores.length==0){
	    return (
	        <div></div>
	    );
	}else{
		const data = props.contenedores;
		console.log(data)
        return (
	        <div className="container">

<ReactTable
          data={data}
          columns={[
            {
              Header: 'Contenedor',
              accessor: "contenedor"
            },{
              Header: 'Viaje',
              accessor: "viaje"
            },{
              Header: 'Isocode',
              accessor: "isocode"
            },{
              Header: 'Tara',
              accessor: "tara"
            },{
              Header: 'Operador',
              accessor: "operador"
            },{
              Header: 'Etapa',
              accessor: "etapa"
            },{
              Header: 'Tipo',
              accessor: "tipo"
            },{
              Header: 'Fecha',
              accessor: "fecha"
            },{
              Header: 'Hora',
              accessor: "hora"
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"/>

	        </div>
	    );
	}
};

export default Lista;
//onGifSelect={props.onGifSelect} />