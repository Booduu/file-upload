import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="overline" color="inherit">
                    Upload Image
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;