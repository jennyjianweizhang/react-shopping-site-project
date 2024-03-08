import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/index.css';

export default function FooterComponent() {
    return (
        <footer className="row">
            <div className="col-md-4">
                <p className="text" >Developed by JULIUS GUEVARRA</p>
            </div>
            <div className="col-md-4"> 
                <img src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png" alt="Logo" />
                <h5>©&nbsp;2023</h5>
            </div>
            <div className="col-md-4">
                <p className="text">Fork this project <a href="#">Here</a></p>
            </div>
        </footer>
    );
}

