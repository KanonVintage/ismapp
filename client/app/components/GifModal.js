import React from 'react';
import Modal from 'react-modal';

const GifModal = (props) => {
    if (!props.selectedGif && props.modalIsOpen==false) {
        return <Modal contentLabel={"empty"} className="empty"></Modal>;
    }else{
        return (
            <Modal
                isOpen={ props.modalIsOpen }
                contentLabel={"valor"}
                onRequestClose={ () => props.onRequestClose() }>
                <div className="gif-modal">
                    <img src={ props.selectedGif.images.original.url } alt="" />
                    <p><strong>Fuente:</strong> <a href={ props.selectedGif.source }>{ props.selectedGif.images.downsized.url}</a></p>
                    <p><strong>Creador por:</strong> { props.selectedGif.username }</p>

                    <button type="button" className="btn btn-success" onClick={() => props.onRequestSave(props.selectedGif)}>save</button>
                    <button type="button" className="btn btn-danger" onClick={() => props.onRequestClose()}>close</button>
                </div>
            </Modal>
        );
    }
};

export default GifModal;
