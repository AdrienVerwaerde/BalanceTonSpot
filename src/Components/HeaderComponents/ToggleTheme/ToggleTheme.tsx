import './ToggleTheme.css';
import React, { useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ThemeContext from '../../../contextAPI/themeContext';

export default function ToggleTheme() {
  const { setTheme } = useContext(ThemeContext);
  const [alignment, setAlignment] = React.useState('skate');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div className="toggle-buttons-container">
      <h4>CHOISIS UN THÈME</h4>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton
          className="toggle-button-snow"
          value="snow"
          onClick={() => setTheme('snowboard')}><img src="https://i.postimg.cc/cJMjjDVX/bouton-snow.png" id="image-button-snow" alt="Snow Thème"></img>SNOWBOARD</ToggleButton>
        <ToggleButton
          className="toggle-button-skate"
          value="skate"
          onClick={() => setTheme('skateboard')}><img src="https://i.postimg.cc/XNkr7zqf/bouton-skate.png" id="image-button-skate" alt="Skate Thème"></img>SKATEBOARD</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}