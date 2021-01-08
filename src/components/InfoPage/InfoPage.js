import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import IconButton from "@material-ui/core/IconButton";

import './InfoPage.css';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div className="page">
    <img src='https://static.wixstatic.com/media/2e1e4e_bab88ea0a7754576bba0ed71b014cf98~mv2_d_4785_3190_s_4_2.jpg/v1/fill/w_1502,h_416,al_c,q_85,usm_0.66_1.00_0.01/2e1e4e_bab88ea0a7754576bba0ed71b014cf98~mv2_d_4785_3190_s_4_2.webp'></img>
    <h2 className="nav-title">Your account has been registered, waiting approval from an admin before you can login!</h2>
    <h3 className="nav-title">Questions or Concerns? Give us a call</h3>
    <IconButton 
      href='tel:855-299-8701'
      aria-label="milkweed">
      <PhoneIcon />
  </IconButton>
  </div>
);

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default InfoPage;
