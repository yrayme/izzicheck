import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeContext } from '../../contexts/useThemeContext';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from '@mui/material';
import Image from 'next/image';


const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 24,
  height: 24,
  borderRadius: 200,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'white',
  border: "1px solid #22E38F",
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%22E38F'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'white',
  },
});

// Inspired by blueprintjs
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
        mt: -0.5
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon sx={{color: "purple"}}/>}
      icon={<BpIcon sx={{color: "purple"}}/>}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

export default function CustomCheckbox({
    label,
    error,
    onChange,
    id,
    name, 
    checked, 
    helperText
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <FormGroup>
            <FormControlLabel 
                control={
                    <BpCheckbox 
                      checkedIcon={
                        <Image 
                            src="/assets/icons/checkbox-marked.png"
                            alt="logo"
                            width={23}
                            height={23}
                        />
                      }
                      icon={
                        <Image 
                            src="/assets/icons/checkbox.png"
                            alt="logo"
                            width={23}
                            height={23}
                        />
                      }
                      onChange={onChange}
                      id={id}
                      name={name}
                      inputProps={{ 'aria-label': 'controlled' }}
                      checked={checked}

                    />
                } 
                label={label} 
                sx={{'& .MuiFormControlLabel-label':{
                    fontSize: "0.8rem",                                
                    fontFamily: "Helvetica",
                    color: "white",
                    fontWeight: "bold"
                }}}
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
        </FormGroup> 
  );
}