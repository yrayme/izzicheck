import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {styled, alpha} from '@mui/material/styles';
import { InputBase, MenuItem, Select, Typography } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { ThemeContext } from '../../contexts/useThemeContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledSelect = styled(InputBase)(({theme, error, colortext})=>({
  'label + &': {
    marginTop: theme.spacing(2.5)
  },
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    border: error ? `1px solid ${theme.palette.error.main}` : '1px solid #ced4da',
    fontSize: 16,
    color: colortext ? colortext : "white",
    padding: "10px 10px",
    '&:focus': {
      boxShadow: error ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem` : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    },
  },
  '& .MuiSelect-icon':{
    color: colortext ? colortext : "white"
  }
})); 

const CustomSelect = ({ 
  id,
  error,
  helperText,
  label, 
  placeholder, 
  onChange, 
  children, 
  type, 
  value,
  name,
  color,
  colorText
  }) => {
  const { theme } = useContext(ThemeContext);
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl 
      fullWidth 
      error={error}
    >
      <InputLabel shrink sx={{fontSize: 18, fontWeight: 600, marginLeft: -1.5, color: color ? color : theme.colorWhite}} htmlFor="input-field">
        {label}
      </InputLabel>
        <Select
          name={name}
          id={id}
          error={error}
          value={value}
          type={type}
          onChange={onChange}  
          input={<StyledSelect />}
          IconComponent={KeyboardArrowDownIcon}
          colortext={colorText}
        >
          {children}
        </Select>
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
    </FormControl>
  );
}

export default CustomSelect;