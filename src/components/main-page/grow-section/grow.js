import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './_grow.css';
import path_1 from '../../../assets/images/path-1.svg';
import path_2 from '../../../assets/images/path-2.svg';
import path_3 from '../../../assets/images/path-3.svg';
import path_4 from '../../../assets/images/path-4.svg';
import path_5 from '../../../assets/images/path-5.svg';
import rock_t from '../../../assets/images/rocket.svg';
import LazyLoad from 'react-lazy-load';

class Grow extends Component {
  s_demo = node => {
    this.props.demo_button.push(node);
  };
  render() {
    return (
      <section className='grow-section'>
        <div className='stars'></div>
        <div className='stars2'></div>
        <div className='stars3'></div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-6 col-lg-7 ps'>
              <div className='grow-section__box'>
                <h2 className='grow-section__title fs50 font-medium c-white'>
                  Grow your insurance agency with happy clients
                </h2>
                <p className='grow-section__txt fs20 c-white roboto-font'>
                  Agentero's sales and service platform delivers new business
                  opportunities and superior customer experience.
                </p>
                <Link
                  id='btnDemoMain'
                  className='btn btn__demo fs18 bgc-white c-green font-medium mb-100px roboto-font'
                  to='requestdemo'
                >
                  Request a demo
                </Link>
              </div>
            </div>
            <div className='col-xl-6 col-lg-5 ps'>
              <div className='grow-section__icons text-lg-right text-center'>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img src={path_1} alt='path' className='pa path-topLeft' />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img src={path_1} alt='path' className='pa path-bottomLeft' />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img src={path_2} alt='path' className='pa path-topCenter' />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img
                    src={path_3}
                    alt='path'
                    className='pa path-bottomCenter'
                  />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img src={path_4} alt='path' className='pa path-topRight' />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img
                    src={path_1}
                    alt='path'
                    className='pa path-bottomRight'
                  />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img
                    src={path_5}
                    alt='path'
                    className='pa path-bottomBottom'
                  />
                </LazyLoad>
                <LazyLoad debounce={false} offsetVertical={500}>
                  <img src={rock_t} alt='rocket' className='rocket-svg' />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Grow;
