import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AppBarComponent from '../components/AppBarComponent';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Home() {
  const [pages, setPages] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [products, setProducts] = React.useState([]);

  const navigate = useNavigate(); 

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    //
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setPages(data.pages.map(page => page.name));
        setSettings(data.settings.map(setting => setting.name));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleProductClick = (id) => {
    navigate(`/form/${id}`); // mengarah ke page sesuai id
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #ffffff, #d9ffd6)',
        minHeight: '100vh',
        paddingBottom: '50px',
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

      {/* Banner Slider */}
      <Box
        sx={{
          width: '80%',
          maxWidth: '1000px',
          height: '450px',
          margin: '0 auto',
          marginTop: '100px',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'white',
          '& .slick-dots': {
            bottom: '190px',
          },
        }}
      >
        <Slider {...sliderSettings}>
          <div>
            <img
              src="/images/banner.PNG"
              alt="Slide 1"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <img
              src="/images/banner2.PNG"
              alt="Slide 2"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <img
              src="/images/banner3.PNG"
              alt="Slide 3"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Slider>
      </Box>

      {/* Produk Data */}
      <Box
        sx={{
          width: '80%',
          maxWidth: '1000px',
          margin: '30px auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          paddingBottom: '35px',
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
            onClick={() => handleProductClick(product.id)}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                position: 'absolute',
                top: '10%',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '10px',
                color: 'rgb(69, 84, 67)',
                backgroundColor: 'rgba(97, 150, 93, 0.2)',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              {product.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Home;
