import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert } from '@mui/material';

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
    borderRadius: 10
};
export default function MUIAccountErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    let error = "";
    if(store.accountAlert){
        error = store.accountAlert;
    }
    function handleDismiss(){
        store.hideModals();
    }
    return (
        <Modal
            open={store.currentModal === "ACCOUNT_ALERT"}
        >
            <Box sx={style}>
                    <div id = 'alert-container'>
                        <Alert severity="error">{error}</Alert>
                    </div>
                    <div className="button-container">
                    <button id="dismiss-button" onClick={handleDismiss}>Dismiss</button>      
                    </div>              
            </Box>
        </Modal>
    );
}