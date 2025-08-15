// components/ProceduresLink.js
import React from 'react';
import { Box } from '@mui/material';

const ClipBottomButton = ({ children }) => {
  const handleClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        gridColumn: { xs: '1 / 10', md: '1 / 5' },
        gridRow: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'end',
        marginBottom: { xs: '10px', md: '0px' },
        marginRight: { xs: '20px', md: '0px' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          marginRight: 'auto',
          width: { xs: '65%', md: 'fit-content' },
          overflow: 'hidden',
          borderRadius: '10px',
          letterSpacing: '0.1em',
          fontSize: '16px',
          cursor: 'pointer',
          '&:hover .bg-slide': {
            transform: 'translateY(0%)',
          },
        }}
        onClick={handleClick} // Added click handler
      >
        {/* Background slide element - modified for top to bottom */}
        <Box
          className="bg-slide"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#1b1b1bff',
            transform: 'translateY(-100%)', // Start above the button
            transition: 'transform 0.3s ease',
            zIndex: 1,
          }}
        />
        {/* Static background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#991B1B',
            zIndex: 0,
          }}
        />

        {/* Button text */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            zIndex: 2,
            px: 5,
            py: 1.5,
            color: '#e9e9e9',
            fontSize: { xs: '12px', md: '16px' },
            textWrap: 'nowrap',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'white',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ClipBottomButton;