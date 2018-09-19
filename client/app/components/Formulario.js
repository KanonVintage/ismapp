import React from 'react';
import {Row, Col, Modal, Button, Icon, Input} from 'react-materialize'

class Formulario extends React.Component {
	//console.log(gif)
	onClickType(term){
		//console.log(this.props)
		this.props.selectedCon.tipo = term;
	}

	clearFocus(){
     Materialize.updateTextFields();
}

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = {};
		for (const field in this.refs) {
		  this.props.selectedCon[field] = this.refs[field].state.value;
		}
		//console.log('-->', this.props.selectedCon);
		this.props.onPost(this.props.selectedCon);
		//this.props.selectedCon = {}
	}

	render(){ return (
        <div>
        	<Row>
	        	<Col s={3}>
		        	<Button waves='light' className="blue" onClick={() => {$('#ingreso').modal('open'); this.onClickType("ingreso")}}>Ingreso<Icon left>get_app</Icon></Button>
				</Col>
				<Col s={3}>
					<Button waves='light' className="red darken-2" onClick={() => {$('#salida').modal('open'); this.onClickType("salida")}}>Salida<Icon left>exit_to_app</Icon></Button>
				</Col>
				<Col s={2}>
				</Col>
				<Col s={4}>
					<Button waves='light' className="green lighten-2" onClick={() => {$('#reporte').modal('open'); this.onClickType("reporte")}}>Reporte<Icon right>menu</Icon></Button>
				</Col>
			</Row>

			<Modal
	    		id = 'ingreso'
				header='INGRESO'
				fixedFooter>
			  	<Row>
			  		<form onSubmit={this.handleSubmit}>
		         		<Input s={8} label="contenedor "ref="in.contenedor" /> <Input s={4} label="viaje" ref="in.viaje"/>
		          		<Input s={4} label="isocode" ref="in.isocode"/> <Input s={4} label="Tara" ref="in.tara"/> <Input s={4} label="etapa" ref="in.etapa"/>
		          		<Input s={6} label="Operador" ref="in.operador" /> <Input s={6} label="Operador" ref="in.operador"/>
		          		<Input s={6} label="Fecha" ref="in.fecha" /><Input s={6} label="Hora" ref="in.hora"/> 
		          		<Button className="btn waves-effect waves-light" type="submit" name="action">Submit
							<i className="material-icons right">send</i>
						</Button>
					</form>
	    	  	</Row>
			</Modal>
			<Modal
				id = 'salida'
				header='SALIDA'
				fixedFooter>
			    <Row>
			   		<form onSubmit={this.handleSubmit}>
		         		<Input s={8} label="contenedor "ref="contenedor" /> <Input s={4} label="viaje" ref="viaje"/>
		          		<Input s={4} label="isocode" ref="isocode"/> <Input s={4} label="Tara" ref="tara"/> <Input s={4} label="etapa" ref="etapa"/>
		          		<Input s={6} label="Operador" ref="operador" /> <Input s={6} label="Operador" ref="operador"/>
		          		<Input s={6} label="Fecha" ref="fecha" /><Input s={6} label="Hora" ref="hora"/> 
		          		<Button className="btn waves-effect waves-light" type="submit" name="action">Submit
							<i className="material-icons right">send</i>
						</Button>
					</form>
	          	</Row>
			</Modal>
			<Modal
				id = 'reporte'
				header='REPORTE'
				fixedFooter>
				<Row>
	         		<Input s={8} label="Contenedor"/> <Input s={4} label="Viaje"/>
        	  	</Row>
			</Modal>

        </div>
    )}
};

export default Formulario;
