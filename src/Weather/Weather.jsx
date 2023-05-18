import PropTypes from 'prop-types';

import './Weather.scss';

function Weather({ date, minTemp, maxTemp, icon, condition }) {
  
  return (
    <div className="result">
        <ul>
            <li>{date}</li>
            <li className='icon'>
            <img src={icon} 
            alt="icon"                
            />
            </li>
            <li className='condition'>{condition}</li>
            <li className='temp'>
            {minTemp}°C - {maxTemp}°C
            </li>
        </ul>
    </div>
  );
}

Weather.propTypes = {
    date: PropTypes.string.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
};

export default Weather;
