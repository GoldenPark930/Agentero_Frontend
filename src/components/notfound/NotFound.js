import React from 'react';
import './notfound.css';
import icon from '../../assets/images/notfound.svg';
import logo from '../../assets/images/error-logo.svg';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const NotFound = ({ url }) => {
  return (
    <section id='not-found'>
      <div className='container'>
        <div className='content'>
          <LazyLoad debounce={false} offsetVertical={500}>
            <img src={icon} alt='not found' className='face' />
          </LazyLoad>
          <h2>The page you are looking for doesn't exist</h2>
          <p>Page not found: {url}</p>
          <Link to='/'>
            <LazyLoad debounce={false} offsetVertical={500}>
              <img src={logo} alt='Agentero' />
            </LazyLoad>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
