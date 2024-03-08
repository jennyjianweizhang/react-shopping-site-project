import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Account = () => {
  const user = useSelector(state => state.Data.user);
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>

      <div className="account-page">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${activeTab === 'account' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('account')}>Account</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('wishlist')}>My Wish List</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('orders')}>My Orders</a>
          </li>
        </ul>
        <div className="py-5 px-4 contentBox">
          {activeTab === 'account' && (
            <div className="col-md-5">
              <div className="px-4 pt-0 pb-4 cover " style={{ backgroundImage: 'url(https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg)' }}>
              </div>
              <div className="user-profile-avatar-wrapper">
                <span className="material-symbols-outlined profileImg" >account_circle</span>
              </div>
              <div className="media align-items-end profile-head">
                <div className="ml-auto">
                  <a href="./editprofile" className="btn btn-outline-dark btn-sm">Edit profile</a>
                </div>
              </div>

              <div className="px-4">
                <p><strong>{user.name}</strong></p>
                <p>Email</p>
                <p>{user.email}</p>
                <p>Address</p>
                <p>Mobile</p>
                <p>Date Joined</p>
                <p>{user.creationDate}</p>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="col-md-5 orderBox">
              <div class="loader">
                <h3>My Order</h3>
                <strong><span class="text-subtle">You don't have any orders.</span></strong>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="col-md-5 wishBox">
              <div class="loader">
                <h3>My Wish List</h3>
                <strong><span class="text-subtle">You don't have a wish list.</span></strong>
              </div>
            </div>
          )}
        </div>


      </div>
    </>
  );
};

export default Account;