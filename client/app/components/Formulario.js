import React from 'react';
import {Row, Col, Modal, Button, Icon, Input} from 'react-materialize'

class Formulario extends React.Component {

	getTimeF(){
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    var h = today.getHours();
	    var m = today.getMinutes();

	    if(dd<10) { dd = '0'+dd } 
	    if(mm<10) { mm = '0'+mm } 
	    if(h<10) { h = '0'+ h }
	    if(m<10) { m = '0'+ m } 
	    var fecha = mm + '/' + dd + '/' + yyyy 
	    var hora  = h + ':' + m;
	    this.state.eltime.fecha = fecha;
	    this.state.eltime.hora = hora;
	}


	//console.log(gif)
	onClickType(term){
		//console.log(this.props)
		this.props.selectedCon.tipo = term;
	}

	clearFocus(){ Materialize.updateTextFields();}

	constructor(props) {
		super(props);
		this.state = {eltime: {}};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	printDiv(divName) {
	    const printContents = document.getElementById(divName).innerHTML;

		let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

		WinPrint.document.write('<html><head>');
		WinPrint.document.write('<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
		WinPrint.document.write('<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">');
		WinPrint.document.write('</head><body onload="print();close();">');
		WinPrint.document.write(printContents);
		WinPrint.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script></body></html>');
		WinPrint.document.close();
		WinPrint.focus();
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = {};
		for (const field in this.refs) {
		  this.props.selectedCon[field] = this.refs[field].state.value;
		  this.props.selectedCon.fecha = this.state.eltime.fecha;
		  this.props.selectedCon.hora = this.state.eltime.hora;
		  this.props.selectedCon.in_fecha = this.state.eltime.fecha;
		  this.props.selectedCon.in_hora = this.state.eltime.hora;
		}
		//console.log('-->', this.props.selectedCon);
		this.props.onPost(this.props.selectedCon);
		//this.props.selectedCon = {}
	}

	render(){ 
		return (
        <div className="container">
        	<Row>
	        	<Col s={5}>
		        	<Button waves='light' 
		        		className="blue" 
		        		onClick={() => {
		        			$('#ingreso').modal('open'); this.onClickType("ingreso");
		        			this.getTimeF();
		        		}}>Ingreso<Icon left>get_app</Icon>
	        		</Button>
				</Col>
								<Col s={2}>
				</Col>
				<Col s={5}>
					<Button waves='light' 
						className="red darken-2" 
						onClick={() => {
							$('#salida').modal('open'); this.onClickType("salida")
							this.getTimeF();
						}}>Salida<Icon left>exit_to_app</Icon>
					</Button>
				</Col>

			</Row>

			<Modal
	    		id = 'ingreso'
				header='INGRESO'
				fixedFooter>
			  	<Row>
			  		<form onSubmit={this.handleSubmit}>
		         		<Input s={8} label="contenedor "ref="in_contenedor" /> <Input s={4} label="viaje" ref="in_viaje"/>
		          		<Input s={4} label="isocode" ref="in_isocode"/> <Input s={4} label="Tara" ref="in_tara"/> <Input s={4} label="placa" ref="in_etapa"/>
		          		<Input s={6} label="Operador" ref="in_operador" /> <Input s={6} label="Puerto Origen" ref="in_puerto"/>		          		<br/>
		          		<Col s={5}>
		          		<Button className="btn waves-effect waves-light" type="submit" name="action">Submit
							<i className="material-icons right">send</i>
						</Button>
						</Col>
						<Col s={2}></Col>
						<Col s={5}>
						<Button s={5} className="btn orange accent-3 waves-light" onClick={()=>this.printDiv('ingreso')} type="button">Print
							<i className="material-icons right">printer</i>
						</Button>
						</Col>
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
		          		<Input s={4} label="isocode" ref="isocode"/> <Input s={4} label="Tara" ref="tara"/> <Input s={4} label="placa" ref="etapa"/>
		          		<Input s={6} label="Operador" ref="operador" /> <Input s={6} label="Puerto Origen" ref="puerto"/>
		          		<br/>
		          		<Col s={5}>
		          		<Button className="btn waves-effect waves-light" type="submit" name="action">Submit
							<i className="material-icons right">send</i>
						</Button>
						</Col>
						<Col s={2}></Col>
						<Col s={5}>
						<Button s={5} className="btn orange accent-3 waves-light" onClick={()=>this.printDiv('salida')} type="button">Print
							<i className="material-icons right">printer</i>
						</Button>
						</Col>
					</form>
	          	</Row>
			</Modal>
        </div>
    )}
};

export default Formulario;
