import './ToggleTheme.css';
import React, { useContext, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ThemeContext from '../../../contextAPI/themeContext';

export default function ToggleTheme() {
  const { setTheme } = useContext(ThemeContext);
  const [alignment, setAlignment] = React.useState(() => {
    // Lire le thème depuis le localStorage ou utiliser 'skate' par défaut
    return localStorage.getItem('theme') || 'skate';
  });

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      // Définir le nouveau thème dans le contexte et le localStorage
      const theme = newAlignment === 'skate' ? 'skateboard' : 'snowboard';
      setTheme(theme);
      localStorage.setItem('theme', newAlignment);
    }
  };

  // Utiliser useEffect pour mettre à jour le thème du contexte au chargement du composant
  useEffect(() => {
    // Mise à jour du thème basée sur l'état local 'alignment'
    const theme = alignment === 'skate' ? 'skateboard' : 'snowboard';
    setTheme(theme);
  }, []); // Le tableau vide assure que cet effet s'exécute une seule fois, au montage du composant

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
        <ToggleButton disableRipple
          className="toggle-button-snow"
          value="snow"
          onClick={() => setTheme('snowboard')}><img src="https://i.postimg.cc/cJMjjDVX/bouton-snow.png" id="image-button-snow" alt="Snow Thème"></img>SNOWBOARD</ToggleButton>
        <ToggleButton disableRipple
          className="toggle-button-skate"
          value="skate"
          onClick={() => setTheme('skateboard')}><img src="https://i.postimg.cc/XNkr7zqf/bouton-skate.png" id="image-button-skate" alt="Skate Thème"></img>SKATEBOARD</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
