import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AuthContext from '../auth'
import PlaylistScreen from './PlaylistScreen';
import { lightBlue } from '@mui/material/colors';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListAccordion(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [accordionColor, setColor] = useState('lightblue');

    const [expand, setExpand] = useState(false);
    
    const toggleAccordion = (e) => {
        if(!editActive){
            setExpand((prev) => !prev);
            if(!expand){
                setColor("#945EC7");
            }else{
                setColor("lightblue");
                store.closeCurrentList();
                store.currentList = null;
            }
        }
    };

    function handleLoadList(event, id) {
        event.stopPropagation();
        if(!editActive){
        console.log("handleLoadList for " + id);
        if(store.currentList){
            console.log(store.currentList);
            console.log(id)
            console.log(store.currentList._id);
            console.log('closing current list')
            store.closeCurrentList();
            console.log(store.currentList);
            
        }else{
            if (!event.target.disabled) {
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);
    
                console.log("load " + event.target.id);
                // CHANGE THE CURRENT LIST
                store.setCurrentList(id);
            }
        }
        console.log('end of handleloadlist')
    }
    }

    function handleDuplicate(){
        store.createListCopy(store.currentList.name, store.currentList.songs);
        store.closeCurrentList();
    }

    function handleUndo(){
        store.undo();
    }
    function handleRedo(){
        store.redo();
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();

        store.markListForDeletion(store.currentList._id);
    }

    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleClick(event) {
        event.stopPropagation();
        if (event.detail === 2) {
            handleToggleEdit(event);
        }
    }

    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }
    
    let listName = <Typography>{idNamePair.name}</Typography>
    if (editActive) {
        listName =
            <TextField
                margin="normal"
                required
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'

                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }


    let accordionElement =         
    <div>
    <Accordion 
    sx ={{maxHeight:'600px', overflow:'scroll', margin:'5px', backgroundColor: accordionColor}}
    expanded={expand}
    >
      <AccordionSummary
      id={idNamePair._id}
      key={idNamePair._id}
      expandIcon={<KeyboardDoubleArrowDownIcon onClick = { (e) =>{
        e.stopPropagation();
            handleLoadList(e, idNamePair._id)
            toggleAccordion(e)
      }
        }/>}
      sx = {{marginTop:'10px', overflow:'auto', backgroundColor: 'transparent'}}
     >
        <Box onDoubleClick = {(e) =>{
        handleClick(e);
    }}>
        {listName}
        <br></br>
        <Typography sx = {{color:'blue', textDecoration: 'underline'}}>By: {auth.user.firstName + " " + auth.user.lastName} </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx = {{overflow:'scroll', maxHeight:'10%'}}>
        {
            store.currentList ? <PlaylistScreen></PlaylistScreen> : <div></div>
        }

        <AccordionDetails sx={{}}>
            <Button 
                disabled={!store.canUndo()|| store.currentModal !== 'NONE'}
                id='undo-button'
                onClick={handleUndo}
                variant="contained"
                sx={{float:'left', margin:'5px', background:'gray'}}>
                Undo
            </Button>
            <Button 
                disabled={!store.canRedo()|| store.currentModal !== 'NONE'}
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
                sx={{float:'left', margin:'5px', background:'gray'}}>
                Redo
            </Button>

            <Button 
                id='publish-button'
                onClick={console.log('clicked publish')}
                variant="contained"
                sx={{float:'right', margin:'5px', background:'gray'}}>
                Publish
            </Button>
            <Button 
                id='delete-button'
                onClick={handleDeleteList}
                variant="contained"
                sx={{float:'right', margin:'5px', background:'gray'}}>
                Delete
            </Button>
            <Button 
                id='duplicate-button'
                onClick={handleDuplicate}
                variant="contained"
                sx={{float:'right', margin:'5px', background:'gray'}}>
                Duplicate
            </Button>            
        </AccordionDetails>


      </AccordionDetails>
    </Accordion>
  </div>

    return (
        accordionElement
    );
}

export default ListAccordion;