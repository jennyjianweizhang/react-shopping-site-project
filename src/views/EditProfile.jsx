import React, { useEffect, useState } from 'react'
import 'intl-tel-input/build/css/intlTelInput.css';
import $ from 'jquery';
import intlTelInput from 'intl-tel-input';

export default function EditProfile() {
    const [fullName, setFullName] = useState("Jenny Zhang"); 
    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };
    const [email, setEmail] = useState("jianweizhangjenny@gmail.com"); 
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(() => {
        const input = document.querySelector("input[type='tel']");
        intlTelInput(input, {
            // options here
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
    }, []);

    return (
        <>
            <div className="edit-user">
                <h3 className="text-center">Edit Account Details</h3>
                <div className="user-profile-banner">
                    <div className="user-profile-banner-wrapper">
                        <img alt="Banner" className="user-profile-banner-img is-img-loaded" src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg" />
                        <label className="edit-button edit-banner-button" htmlFor="edit-banner">
                            <input accept="image/x-png,image/jpeg" hidden id="edit-banner" type="file" />
                            <span role="img" aria-label="edit" className="anticon anticon-edit">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                    <div className="user-profile-avatar-wrapper">
                        <span className="material-symbols-outlined profileImg" >account_circle</span>
                        {/* <img alt="Avatar" className="user-profile-img is-img-loaded" src="/images/defaultAvatar.4e9edb2a624547982816014bf128fcd5.jpg" /> */}
                        <label className="edit-button edit-avatar-button" htmlFor="edit-avatar">
                            <input accept="image/x-png,image/jpeg" hidden id="edit-avatar" type="file" />
                            <span role="img" aria-label="edit" className="anticon anticon-edit">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="user-profile-details">
                    <div className="input-group">
                        <label className="label-input" htmlFor="fullname">* Full Name</label>
                        <input type="text" id="fullname" className="input-form undefined" name="fullname" placeholder="Enter your full name" defaultValue={fullName} onChange={handleFullNameChange}/>
                    </div>
                    <div className="input-group">
                        <label className="label-input" htmlFor="email">* Email Address</label>
                        <input type="email" id="email" className="input-form undefined" name="email" placeholder="test@example.com" defaultValue={email} onChange={handleEmailChange}/></div>
                    <div className="input-group">
                        <label className="label-input" htmlFor="address">Address (Will be used for checkout)</label>
                        <input type="text" id="address" className="input-form undefined" name="address" placeholder="#245 Brgy. Maligalig, Arayat Pampanga, Philippines" defaultValue="" />
                    </div>
                    <div className="input-group">
                        <label className="label-input" htmlFor="mobile">Mobile Number (Will be used for checkout)</label>
                        <div className=" react-tel-input" style={{ border: '1px solid rgb(202, 202, 202)' }}>
                            <div className="special-label">Phone</div>
                            <input className="input-form d-block form-control" placeholder="09254461351" type="tel" defaultValue="+63" />
                            <div className=" flag-dropdown" >
                                <div className="selected-flag" title="Philippines: + 63" tabIndex="0" role="button" aria-haspopup="listbox">
                                    <div className="flag ph">
                                        <div className="arrow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="edit-user-action">
                        <a href='/account'>
                        <button className="button button-muted w-100-mobile backBtn" type="button">
                            <span role="img" aria-label="arrow-left" className="anticon anticon-arrow-left">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">
                                    </path>
                                </svg>
                            </span>&nbsp; Back to Profile</button>
                        </a>
                        
                        <button className="button w-100-mobile updateBtn" type="button">
                            <span role="img" aria-label="check" className="anticon anticon-check">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                                </svg>
                            </span>&nbsp;Update Profile</button>
                    </div>
                </div>
            </div>
        </>


    )
}
