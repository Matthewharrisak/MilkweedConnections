import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Milkweed Connect</h2>
      </Link>
      <div className="nav-right">
        <LogOutButton id="logoutBtn" className="nav-link1" />
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          Wix
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
