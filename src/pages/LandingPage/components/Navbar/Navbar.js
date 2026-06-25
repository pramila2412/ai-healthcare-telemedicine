import './Navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Fallback logo icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const navItems = ['Home', 'Solutions', 'For Patients', 'For Providers', 'Pricing', 'Resources'];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="border-b border-gray-200">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="justify-between h-[80px]">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer">
            <img
              src="/images/logo.png"
              alt="MedConnect Logo Icon"
              className="h-10 mr-2 hidden"
              onError={(e) => {
                e.target.style.display = 'none';
                document.getElementById('fallback-icon').style.display = 'block';
              }}
              onLoad={(e) => {
                e.target.style.display = 'block';
                const fallback = document.getElementById('fallback-icon');
                if (fallback) fallback.style.display = 'none';
              }}
            />
            <MedicalServicesIcon id="fallback-icon" className="text-primary text-[32px] mr-2" />
            
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-primary text-xl leading-none">
                MediConnect
              </span>
              <span className="text-primary text-xs font-normal tracking-[0.5px]">
                Healthcare Ecosystem
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item} className="flex items-center cursor-pointer">
                <span className="font-medium text-[14px] text-[#141414] hover:text-primary transition-colors">
                  {item}
                </span>
                {(item === 'Solutions' || item === 'For Patients' || item === 'For Providers') && (
                  <KeyboardArrowDownIcon className="text-[20px] text-[#838383] ml-2" />
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="text" 
              startIcon={<PersonOutlineOutlinedIcon />}
              className="bg-[#EEF4F3] text-primary px-6 py-2 font-semibold hover:bg-primary/15 normal-case rounded-lg"
            >
              Sign up
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<PersonOutlineOutlinedIcon />}
              onClick={() => navigate("/role-selection")}
              className="px-6 py-2 font-semibold normal-case rounded-lg shadow-none"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
