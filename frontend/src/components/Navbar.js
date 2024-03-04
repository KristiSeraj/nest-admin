import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: ''
  })
  
  const getUser = async () => {
    const { data } = await axios.get('/user')
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    await axios.post('/logout', {})
    navigate('/')
  }

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true)
  }
  const closeDrawer = () => {
    setOpen(false);
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'end', marginRight: '20px' }}>
        <IconButton
          onClick={closeDrawer}
        >
          <CloseIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
      <List>
        {['Dashboard'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to='/dashboard'>
              <ListItemText primary={text} primaryTypographyProps={{ style: { color: '#fff' } }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#272727'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nest Admin
          </Typography>
          {user ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {user.first_name}
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to='/login'>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={closeDrawer} PaperProps={{ sx: { backgroundColor: '#272727' } }}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
