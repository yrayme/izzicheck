import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { styled, alpha } from '@mui/system';
import { PopperUnstyled } from '@mui/base';
import { countries } from '../../constants';
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ThemeContext } from '../../contexts/useThemeContext';
import { Box } from '@mui/material';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme, error }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.5em;
//   margin: 0.5em;
//   padding: 10px;
  text-align: left;
  line-height: 1.5;
  width: 100%;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
color: white;

'&:focus': {
    boxShadow: ${error ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem` : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`},
    borderColor: ${error ? theme.palette.error.main : theme.palette.primary.main},
},

  &.${selectUnstyledClasses.focusVisible} {
    // outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
    color: white;
  }

  & img {
    margin-right: 10px;
    color: white;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  max-height: 400px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} sx={{
    border: props.error ? "1px solid #c62828" : `1px solid ${grey[300]}`
  }}
  
  id={props.id}
  error={props.error}
  // value={value}
  type={props.type}
  placeholder={props.placeholder} 
  onChange={props.onChange}/>;
});

CustomSelect.propTypes = {
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function CodeField({
  id,
  error,
  helperText,
  label, 
  placeholder, 
  onChange, 
  children, 
  type, 
  value,
}) {
  const { theme } = useContext(ThemeContext);
  return (    
      <Box>        
          <InputLabel shrink sx={{fontSize: 18, fontWeight: 600, marginLeft: 0, marginBottom: -0.5, color: theme.colorWhite}} htmlFor="input-field">
              {label}
          </InputLabel>  
          <CustomSelect
              id={id}
              error={error}
              // value={value}
              type={type}
              placeholder={placeholder} 
              onChange={onChange}
          >
          {countries.map((c) => (
              <StyledOption key={c.code} value={c.code} label={`+${c.phone}`}>
              <Image
                  width="20"
                  height="20"
                  src={`/assets/flags/${c.code.toLowerCase()}.svg`}
                  alt={`Flag of ${c.label}`}
              />
                  +{c.phone}
              </StyledOption>
          ))}
          </CustomSelect>
      </Box>
  );
}
