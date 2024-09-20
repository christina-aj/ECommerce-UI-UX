import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const AppBarComponent = ({ pages, settings, handleLogout, searchTerm, handleSearchChange, handleToggleSidebar, sidebarOpen }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null); // Tambahan untuk menu di mobile view
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseUserMenu();
    handleCloseNavMenu(); // Tutup menu navigasi saat beralih halaman
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo atau Icon pada layar besar */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, ml: 10, mr: 1 }} />
          <Tooltip title="Kembali Ke Home">
            <Typography
              variant="h6"
              noWrap
              onClick={() => handleNavigate('/dashboard')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              BELIDATA
            </Typography>
          </Tooltip>

          {/* Logo atau Text pada layar kecil */}
          <Typography
            variant="h5"
            noWrap
            onClick={() => handleNavigate('/dashboard')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            BELIDATA
          </Typography>

          {/* Search Bar dengan Ikon */}
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>
            <TextField
              size="small"
              placeholder="Cari Provider..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 6,
                width: { xs: '100%', sm: '300px', md: '400px' },
                right: '15px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Profile Avatar dan Tombol Logout */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Keluar Akun">
              <Button
                onClick={handleLogout}
                sx={{ mr: 2, my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button>
            </Tooltip>

            <Tooltip title="Buka Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Christina" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Navigasi ke halaman Profile */}
              <MenuItem onClick={() => handleNavigate('/profile')}>
                <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
              </MenuItem>

              {/* Navigasi ke halaman History */}
              <MenuItem onClick={() => handleNavigate('/history')}>
                <Typography sx={{ textAlign: 'center' }}>History</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarComponent;
