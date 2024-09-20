import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Modal, Card, CardMedia, CardContent, Grid } from '@mui/material';
import AppBarComponent from '../components/AppBarComponent';

function Form() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [nomorTelp, setNomorTelp] = useState('');
  const [dataPackage, setDataPackage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [providerImage, setProviderImage] = useState('');
  const [providerName, setProviderName] = useState('');
  const [dataPackages, setDataPackages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate(); 

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const handleConfirmOrder = () => {
    setOpenModal(false);
    navigate('/history');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setPages(data.pages.map(page => page.name));
        setSettings(data.settings.map(setting => setting.name));
        setPaymentMethods(data.paymentMethods);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      fetch('/db.json')
        .then(response => response.json())
        .then(data => {
          const product = data.products.find(product => product.id === parseInt(id));
          if (product) {
            setProviderImage(product.image);
            setProviderName(product.name);

            const filteredPackages = data.dataPackages.filter(pkg => pkg.providerId === parseInt(id));
            setDataPackages(filteredPackages);
          } else {
            console.error('Data Tidak Ada');
          }
        })
        .catch(error => console.error('Error fetching provider data:', error));
    }
  }, [id]);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #ffffff, #d9ffd6)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
          width: '80%',
          maxWidth: '1200px',
          margin: '100px auto',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white', // White background for the inner box
        }}
      >
        <Typography variant="h4" gutterBottom>
          FORM PEMBELIAN
        </Typography>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: '10px' }}>
              {providerImage && (
                <CardMedia
                  component="img"
                  image={providerImage}
                  alt={providerName}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    marginTop: '20px',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6">
                  {providerName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6">
                No Telepon
              </Typography>
              <TextField
                fullWidth
                label="No Telepon"
                value={nomorTelp}
                onChange={(e) => setNomorTelp(e.target.value)}
                margin="normal"
                sx={{ marginBottom: '25px' }}
                required
              />

              <Typography variant="h6" gutterBottom>
                Pilih Paket Data
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: '25px',
                }}
              >
                {dataPackages.map(pkg => (
                  <Box
                    key={pkg.id}
                    onClick={() => setDataPackage(pkg.name)}
                    sx={{
                      cursor: 'pointer',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: dataPackage === pkg.name ? 'primary.main' : 'grey.400',
                      backgroundColor: dataPackage === pkg.name ? 'primary.light' : 'background.paper',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                      flex: '1 1 calc(20% - 10px)',
                      textAlign: 'center',
                    }}
                  >
                    {pkg.name} - {pkg.durasi} <br />
                    <br />
                    Rp{pkg.price} <br />
                  </Box>
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Pembayaran
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {paymentMethods.map((method) => (
                  <Box
                    key={method.id}
                    onClick={() => setPaymentMethod(method.name)}
                    sx={{
                      cursor: 'pointer',
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: paymentMethod === method.name ? 'primary.main' : 'grey.400',
                      backgroundColor: paymentMethod === method.name ? 'primary.light' : 'background.paper',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                      flex: '1 1 120px',
                      textAlign: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <img
                      src={method.image}
                      alt={method.name}
                      style={{
                        width: '70px',
                        height: '25px',
                        marginBottom: '0px',
                        marginTop: '5px' 
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <Button
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{ width: '100%', marginTop: '20px' }}
              >
                ORDER SEKARANG
              </Button>
            </form>
          </Grid>
        </Grid>

      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 400,
            padding: 4,
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ 
              backgroundColor: '#a1db9c',
              borderRadius: '4px',
              padding: '8px 16px', 
              color: 'black',
            }}
          >
            Detail Pesanan
          </Typography>

          <Typography variant="body1" sx={{ marginLeft: '5px'}}>
            No Telepon: {nomorTelp}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: '5px'}}>
            Paket Data: {dataPackage}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: '5px'}}>
            Harga: Rp{dataPackages.find(pkg => pkg.name === dataPackage)?.price || 0}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: '5px'}}>
            Pembayaran : {paymentMethod}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(false)} 
              sx={{ flex: 1, marginRight: '10px' }}
            >
              Batal
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmOrder}
              sx={{ flex: 1 }}
            >
              Konfirmasi
            </Button>
          </Box>

        </Box>
      </Modal>
    </Box>
  );
}

export default Form;
