import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 150,
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal === "REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-remove-song-root'>
        <div
                    id="remove-song-modal-header"
                    className="modal-north">
                    <div id="remove-song-header-container">
                    <div id="edit-song-header-text">
                    Remove {songTitle}
                    </div>
                    </div>
                </div>
            <div className="remove-modal-center">
                <div className="remove-modal-center-content">
                    Are you sure you wish to permanently remove {songTitle} from the playlist?
                </div>
            </div>
            <div className="remove-modal-south">
                <div class="button-container">
                    <input type="button" 
                        id="remove-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmRemoveSong} 
                        value='Confirm' />
                    <input 
                        type="button" 
                        id="remove-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelRemoveSong} 
                        value='Cancel' />
                </div>
            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}