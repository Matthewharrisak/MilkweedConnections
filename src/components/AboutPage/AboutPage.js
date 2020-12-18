import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div>
      <p>This about page is for anyone to read! cool </p>
      <iframe
        title="Wikipedia page for Avocados"
        src="https://lawlernp.wixsite.com/mysite"
        width="100%"
        height="1700"
      ></iframe>
    </div>
  </div>
);

export default AboutPage;
