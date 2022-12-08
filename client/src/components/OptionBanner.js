import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { Toolbar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function OptionBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{top:60}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name &#40;A-Z&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date &#40;Newest&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens &#40;High-Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes &#40;High-Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes &#40;High-Low&#41;</MenuItem>


        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'transparent' }}>
            <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow:'none'}}>
                <Toolbar>
            <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        id = 'option-icon'
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <HomeIcon sx = {{color:'black'}}/>
                    </Typography>
            <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        id = 'option-icon'
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <PeopleIcon sx={{marginTop:1.25, marginLeft: 3, color:'black'}}/>
                    </Typography>
            <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        id = 'option-icon'
                        sx={{ display: { xs: 'none', sm: 'block'} }}                        
                    >
                        <PersonIcon sx={{marginLeft: 4, color:'black' }}/>
                    </Typography>
                    
            <Stack spacing={2} sx={{ width: 800 }}>
            <Autocomplete
                sx = {{marginLeft:25}}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={[]}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
            </Stack>
            <Typography 
                variant = "h5"
                sx={{marginLeft:30, marginBottom: 1, color: 'black'}}>
                SORT BY
            </Typography>
            <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        id = 'option-icon'
                        onClick={handleMenuOpen}
                        sx={{ display: { xs: 'none', sm: 'block'} }}                        
                    >
                        <SortIcon sx={{marginLeft: 2.5, color:'black' }}/>
                    </Typography>
            {sortMenu}
            
            </Toolbar>
            </AppBar>
        </Box>
    );
}