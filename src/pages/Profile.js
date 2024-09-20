import { Box, Card, CardContent, Typography, Avatar, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import AppBarComponent from '../components/AppBarComponent';

function Profile() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '', 
    avatar: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Data yang disimpan:', profileData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json'); 
        const data = await response.json();
        setPages(data.pages.map(page => page.name));
        setSettings(data.settings.map(setting => setting.name));
  
        const profile = data.profile;
        setProfileData(profile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AppBarComponent
        pages={pages}
        settings={settings}
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleToggleSidebar={handleToggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          background: 'linear-gradient(to bottom, #ffffff, #d9ffd6)', 
        }}
      >
        <Card sx={{ maxWidth: 600, width: '100%', textAlign: 'center', padding: '30px', boxShadow: 2 }}>
          <CardContent>
            <Avatar
              src={profileData.avatar}
              alt={profileData.name}
              sx={{
                width: 150,
                height: 150,
                margin: '0 auto 20px',
                boxShadow: 1,
              }}
            />
            {isEditing ? (
              <>
                <TextField
                  name="name"
                  label="Name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="address"
                  label="Address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  {profileData.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {profileData.email}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {profileData.address}
                </Typography>
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px' }}
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Profile;
