import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from './PriceSlider.module.css'
import { Dropdown } from 'react-bootstrap';


function valuetext(value: number) {
  return `${value}°C`;
}

export default function PriceSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const [min, setMin] = React.useState<string>("Min")
  const [max, setMax] = React.useState<string>("Max")


  const handleChange = (Event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className={styles.body}>
      <div className={styles.headName}>Price</div>
      <div className={styles.slider}>
        <Box sx={{ width: 250 }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            max={2000}
            min={400}
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
      <div className={styles.minMax}>
        <div className={styles.min}>
          <Dropdown>
            <Dropdown.Toggle variant=""  className='border border-dark m-0 p-0 ps-2 pe-2' id="dropdown-basic">
            ₹{min}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => setMin("1000")}>₹1000</Dropdown.Item>
              <Dropdown.Item onClick={() => setMin("1000")}>₹2000</Dropdown.Item>
              <Dropdown.Item onClick={() => setMin("1000")}>₹3000</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <span> <p>to</p></span>
        <div className={styles.max}>
        <Dropdown >
            <Dropdown.Toggle variant="" className='border border-dark m-0 p-0 ps-2 pe-2'id="dropdown-basic">
            ₹ {max}
            </Dropdown.Toggle>
            <Dropdown.Menu >
            <Dropdown.Item onClick={() => setMax("1000")}>₹1000</Dropdown.Item>
              <Dropdown.Item onClick={() => setMax("2000")}>₹2000</Dropdown.Item>
              <Dropdown.Item onClick={() => setMax("3000")}>₹3000</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
