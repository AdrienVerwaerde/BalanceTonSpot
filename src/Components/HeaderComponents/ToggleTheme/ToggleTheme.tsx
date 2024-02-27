// Import necessary React hooks and components
import React, { useContext, useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ThemeContext from '../../../contextAPI/themeContext';
import { CButton, CCard, CCardBody, CCollapse } from '@coreui/react'
import './ToggleTheme.css';

export default function ToggleTheme() {
  /**
   *Access setTheme function from ThemeContext to change the theme
  */
  const { setTheme } = useContext(ThemeContext) || {};
  // State for the current theme alignment, initialized from localStorage or default to 'skate'
  const [alignment, setAlignment] = useState(() => localStorage.getItem('theme') || 'skate');

  // Event handler for changing the theme
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment) {
      setAlignment(newAlignment);
      // Determine the theme based on the selected alignment and update both context and localStorage
      const theme = newAlignment === 'skate' ? 'skateboard' : 'snowboard';
      if (setTheme) {
        setTheme(theme);
      }
      localStorage.setItem('theme', newAlignment);
    }
  };

  // Effect hook to set the theme based on the alignment state when the component mounts
  useEffect(() => {
    const theme = alignment === 'skate' ? 'skateboard' : 'snowboard';
    if (setTheme) {
      setTheme(theme);
    }
  }, [alignment, setTheme]); // Adds dependencies to ensure correctness if the context or alignment changes

  const [visible, setVisible] = useState(false)

  return (
    <div className="toggle-buttons-container">
      <h4>CHOISIS UN THÈME</h4>
      <CCollapse visible={visible}>
        <CCard className="mt-3">
          <CCardBody>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              {/* Toggle buttons for selecting the theme */}
              {/* Snowboard Theme */}
              <ToggleButton disableRipple
                className="toggle-button-snow"
                value="snow"
                aria-label="Snowboard Thème"
                onClick={() => setTheme && setTheme('snowboard')}><img src="/bouton-snow.png" id="image-button-snow" alt="Snow Thème"></img>SNOWBOARD</ToggleButton>

                {/* Skateboard Theme */}
              <ToggleButton disableRipple
                className="toggle-button-skate"
                value="skate"
                aria-label="Skateboard Thème"
                onClick={() => setTheme && setTheme('skateboard')}><img src="/bouton-skate.png" id="image-button-skate" alt="Skate Thème"></img>SKATEBOARD</ToggleButton>
            </ToggleButtonGroup>
          </CCardBody>
        </CCard>
      </CCollapse>
      {/* Button image with rotation animation*/}
      <CButton className={`shadow-none collapse-button ${visible ? 'rotate' : ''}`} onClick={() => setVisible(!visible)}><img id="collapse-chevron"src="/toggle-theme-chevron.png"></img></CButton>
    </div>
  );
}
