import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PlaylistScreen from './PlaylistScreen';
import OptionBanner from './OptionBanner';
import YoutubePlayer from './YoutubePlayer';
import HomeScreen from './HomeScreen';
import AppBanner from './AppBanner';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography'
import { GlobalStoreContext } from '../store'
import { useContext } from 'react'
import { useEffect } from 'react';
import CommentList from './CommentList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import YoutubePlayerOptions from './YoutubePlayerOptions';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{  }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function WorkspaceGrid(){
  
    const { store } = useContext(GlobalStoreContext);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function handleAdd() {
      if(store.currentList){
        store.addNewSong();
      }else{
        store.createNewList();
        
      }
    }

    const handleKeyDown = (event) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        store.addComment(event.target.value);
      }
    }

    let footerText = store.currentList ? store.currentList.name : "Your Lists"
    
    return (
    <Box sx={{ height: '100%', overflow:'scroll'}}>
      <Grid container spacing={0} sx ={{height:'90%'}}>

        <Grid item xs = {12} sx={{width:'100%', marginBottom: '10px'}}>
          <OptionBanner />
        </Grid>

        <Grid item xs={7} sx={{height:'78%', overflow: 'scroll', position:'relative'}} >
          <HomeScreen/>
        </Grid>


        <Grid item xs = {5}>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Player"  />
          <Tab label="Comments" disabled={!store.currentList} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <YoutubePlayer sx ={{marginTop:100}}></YoutubePlayer>
        <YoutubePlayerOptions></YoutubePlayerOptions>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>
        <CommentList></CommentList>
        <input id ="comment-input" onKeyDown={handleKeyDown}></input>
        </Box>
      </TabPanel>
    </Box>
        </Grid>

        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center" item xs = {12}>
            <Fab 
                aria-label="add"
                id="add-list-button"
                onClick={handleAdd}
                size="small"
                sx={{marginTop:2, backgroundColor: 'gray'}}
            >
                <AddIcon />
            </Fab>
                <Typography sx={{fontSize:48, fontFamily: 'Times New Roman', marginTop:2}}>{footerText}</Typography>
        </Grid>

        
      </Grid>
    </Box>
  );
}