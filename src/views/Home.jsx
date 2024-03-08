import React from 'react'
import { Outlet } from 'react-router-dom'
import FeatureProduct from '../components/FeatureProduct'
import banner from '../img/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png'
export default function Home() {

  return (
    <>
      {/* ------- first part----------- */}
      <div className='bg1'>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 ">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src={banner} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" />
            </div>
            <div className="col-lg-6 left">
              <h1 className="display-5 fw-bold lh-1 mb-3"><strong>See</strong><span>&nbsp;everything with&nbsp;</span><strong>Clarity</strong></h1>
              <p className="lead">Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <a href='./Shop'><button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Shop Now &#8594;</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------- Second part----------- */}
      <div className="display-header">
        <div className="container">
          <h1>Featured Products</h1>
          <a href="/featured">See All</a>
        </div>
      </div>
      <FeatureProduct />
      {/* ------Third Part-------- */}
      <div className="display-header">
        <div className="container">
          <h1>Recommended Products</h1>
          <a href="/recommended">See All</a>
        </div>
      </div>
      <FeatureProduct />
      <Outlet />
    </>
  )
}


// On large screens (lg and above), the flex-lg-row-reverse class causes the row to reverse its direction, placing the image (which is second in the HTML) on the left and the text content on the right.
// On smaller screens, the default flex direction takes over, placing the image (second in the HTML) on the right and the text content (first in the HTML) on the left.
// xs (extra small): Under 576px. 
// sm (small): 576px and above.
// md (medium): 768px and above.
// lg (large): 992px and above.
// xl (extra large): 1200px and above.
// xxl (extra extra large): 1400px and above.