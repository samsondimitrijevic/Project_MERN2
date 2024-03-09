import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/weather-by-city">Current Weather By City</Link>
            </li>
            <li>
                <Link to="/forecast">Forecast</Link>
            </li>
            <li>
                <Link to="/forecast-by-city">Forecast By City</Link>
            </li>
        </ul>
  </nav>
  )
}

export default Navbar;