import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import '../Error/Error.css';

const Error = ({ message, setError }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      setError(location.state.error);
    }
  }, [location, setError]);
  

  return (
    <div className="error-container">
      <div className="error-message">
        {message ? <p>{message}</p> : <p>Unknown error occurred. Please try again!</p>}
      </div>
    </div>
  );
};

export default Error;