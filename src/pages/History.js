import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Modal, IconButton, Card, CardContent, Grid, Button } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import AppBarComponent from '../components/AppBarComponent';
import { useNavigate } from 'react-router-dom'; 


function History() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const navigate = useNavigate(); 

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setPages(data.pages.map(page => page.name));
        setSettings(data.settings.map(setting => setting.name));
        setTransactionHistory(data.transactionHistory);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #ffffff, #d9ffd6)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '95%',
          maxWidth: '1300px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          marginTop: '50px',
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

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Riwayat Pembelian
        </Typography>

        <Grid container spacing={3}>
          {transactionHistory.map((transaction) => (
            <Grid item xs={12} md={6} lg={4} key={transaction.id}>
              <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444' }}>
                    {transaction.date}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Order: {transaction.description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Total: Rp{transaction.amount}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <IconButton 
                      onClick={() => handleDetailClick(transaction)} 
                      color="primary"
                    >
                      <InfoIcon />
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}> {/* Adjust the font size here */}
                        Detail
                      </Typography>
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={notificationOpen}
          onClose={handleCloseNotification}
          message={notificationMessage}
          action={
            <Button color="inherit" onClick={handleCloseNotification}>
              Close
            </Button>
          }
          autoHideDuration={6000}
        />
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
          {selectedTransaction && (
            <>
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
                Detail Riwayat
              </Typography>

              <Typography variant="body1" sx={{ marginLeft: '5px'}}>
                Tanggal: {selectedTransaction.date}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: '5px'}}>
                Provider: {selectedTransaction.provider}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: '5px'}}>
                Paket: {selectedTransaction.description}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: '5px'}}>
                Harga: Rp.{selectedTransaction.amount}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: '5px'}}>
                Pembayaran: {selectedTransaction.pembayaran}
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
                  sx={{ flex: 1 }}
                >
                  Tutup
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default History;
