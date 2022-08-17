import React, { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from "prop-types";
import { Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';

const BootstrapInput = styled(InputBase)(({ theme, iconright, iconleft, error, colortext, backgroundcolor }) => ({
    'label + &': {
      marginTop: theme.spacing(2)
    },
    '& .MuiInputBase-input': {
      borderRadius: 6,
      position: 'relative',
      border: error ? `1px solid ${theme.palette.error.main}` : !backgroundcolor && '1px solid #ced4da',
      fontSize: 16,
      color: colortext ? colortext : "white",
      padding: iconright ? '10px 40px 10px 10px' : "10px 10px",
      paddingLeft: iconleft ? "45px" : "10px",
      background: backgroundcolor,
      '&:focus': {
        boxShadow: error ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem` : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
      },
    },
  }));

const CustomTextField = ({
    id,
    error,
    helperText,
    label, 
    placeholder, 
    onChange, 
    children, 
    type, 
    value,
    iconleft,
    iconRight,
    maxLength,
    colorText,
    backgroundColor,
    color
  }) => {
  const { theme } = useContext(ThemeContext);
  return(
    <FormControl 
      fullWidth 
      error={error}
    >
      <InputLabel shrink sx={{fontSize: 18, fontWeight: 600, marginLeft: -1.5, color: color}} htmlFor="input-field">
        {label}
      </InputLabel>
      <BootstrapInput
        id={id}
        error={error}
        value={value}
        type={type}
        placeholder={placeholder} 
        onChange={onChange}
        iconleft={iconleft}
        iconright={iconRight}
        inputProps={{
          maxLength: maxLength,
        }}
        colortext={colorText}
        backgroundcolor={backgroundColor}
      />
      {error ? (
          <Typography
            color="error"
            mb={0}
            ml={0}
            variant="caption"
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            {helperText}
          </Typography>
        ) : null}
        {children}
        
    </FormControl>
  );
}
CustomTextField.propTypes = {
  id: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string, 
  placeholder: PropTypes.string, 
  onChange: PropTypes.func, 
  children: PropTypes.node, 
  type: PropTypes.string, 
  value: PropTypes.string,
  iconleft: PropTypes.string,
  color: PropTypes.string
};

CustomTextField.defaultProps = {
  color: "white",
};

export default CustomTextField;