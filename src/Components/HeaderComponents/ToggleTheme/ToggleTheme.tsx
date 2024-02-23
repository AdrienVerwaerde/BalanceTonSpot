// Import necessary React hooks and components
import React, { useContext, useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ThemeContext from '../../../contextAPI/themeContext';
import { CButton, CCard, CCardBody, CCollapse } from '@coreui/react'
import './ToggleTheme.css'; // Importing CSS for styling

export default function ToggleTheme() {
  // Access setTheme function from ThemeContext to change the theme
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
    // This effect should only run once, hence the empty dependency array
  }, [alignment, setTheme]); // Adding dependencies to ensure correctness if the context or alignment changes

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
              {/* Using onClick to directly set the theme seems redundant with the handleChange logic. */}
              {/* If you decide to keep these onClick handlers, consider integrating their logic with handleChange to avoid confusion. */}
              <ToggleButton disableRipple
                className="toggle-button-snow"
                value="snow"
                aria-label="Snowboard Thème"
                onClick={() => setTheme && setTheme('snowboard')}><img src="https://i.postimg.cc/cJMjjDVX/bouton-snow.png" id="image-button-snow" alt="Snow Thème"></img>SNOWBOARD</ToggleButton>
              <ToggleButton disableRipple
                className="toggle-button-skate"
                value="skate"
                aria-label="Skateboard Thème"
                onClick={() => setTheme && setTheme('skateboard')}><img src="https://i.postimg.cc/XNkr7zqf/bouton-skate.png" id="image-button-skate" alt="Skate Thème"></img>SKATEBOARD</ToggleButton>
            </ToggleButtonGroup>
          </CCardBody>
        </CCard>
      </CCollapse>
      <CButton className={`shadow-none collapse-button ${visible ? 'rotate' : ''}`} onClick={() => setVisible(!visible)}><img id="collapse-chevron"src="https://i.postimg.cc/137dq3Gb/chevron-down-regular-48.png"></img></CButton>
    </div>
  );
}
