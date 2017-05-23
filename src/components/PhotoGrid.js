import React from "react";

const PhotoContainer = (props) => {
  return (
    <div className="photo-container">
      <div className="photo">
        <img src={props.url}/>
      </div>
      <div className="caption">
        <div>{props.caption}</div>
        <div>By {props.user}</div>
      </div>
    </div>
  );
};


const PhotoGrid = (props) => {
  const images = [
    { 
      id: 'eqweqwe',
      user: 'Marta Von Choogus',
      caption: 'Beyond the Tree of Dreams',
      url: 'https://static.tumblr.com/b3a14b72f0ddeface70d7b146646ae31/jv6i2df/Rf0nd95we/tumblr_static_tumblr_static_4fmo8922uvmsc04cs844ok8kw_640.jpg',
    },
    {
      id: 'roewireoi',
      user: 'Victor McParticle',
      caption: 'Something Great in the Belly',
      url: 'https://static.tumblr.com/bacfd3aff7c54bedd1425ba4f1b87bf9/nc5p93p/raPnbumsb/tumblr_static_tumblr_static_cbrkyrdf3dw0gk8gck0gskco0_640.jpg',
    },
    { 
      id: 'popo',
      user: 'Marta Von Choogus',
      caption: 'Beyond the Tree of Dreams',
      url: 'https://static.tumblr.com/b3a14b72f0ddeface70d7b146646ae31/jv6i2df/Rf0nd95we/tumblr_static_tumblr_static_4fmo8922uvmsc04cs844ok8kw_640.jpg',
    },
  ];

  return (
      <div id="photo-grid">
        {images.map((image) =>
          <PhotoContainer key={image.id} {...image} />
        )}
        {Array(4).fill().map((_,i) =>
          <div key={'bumper'+i} className="photo-bumper"></div>
        )}

      </div>
  );
};

class PhotoGridContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="photo-grid-container">
        <div id="photo-grid-title">
          <h2>Hi Eleven</h2>
          <h3>Welcome to your Photobucket</h3>
          <div className="small" onClick={this.props.logout}><a href='#'>Log out</a></div>
        </div>
        <PhotoGrid images={"woot"} /> {/* pass photo props */}
      </div>
    );
  }
}

export default PhotoGridContainer;