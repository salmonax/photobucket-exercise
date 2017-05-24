import React from "react";
import { getImages, postImage } from '../services/imageService';

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

  const bumperCount = (images.length > 3) ? 4 : 0;
  console.log(bumperCount, images.length);
  return (
      <div id="photo-grid">
        {images.map((image) =>
          <PhotoContainer key={image.id} {...image} />
        )}
        {Array(bumperCount).fill().map((_,i) =>
          <div key={'bumper'+i} className="photo-bumper"></div>
        )}

      </div>
  );
};

class PhotoGridContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
    getImages(0).then(data => {
      console.log(data);
    });
  }
  showModal() {
    this.setState({
      showModal: true,
    });
  }
  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  triggerInput() {
    document.getElementById("browse").click();
  }
  render() {
    console.log(this.props);
    return (
      <div id="photo-grid-container">
        <div id="photo-grid-title">
          <h2>Hi {this.props.username}</h2>
          <h3>Welcome to your Photobucket</h3>
          <div className="small" onClick={this.props.logout}><a href='#'>Log out</a></div>
        </div>
        <PhotoGrid images={"woot"} /> {/* pass photo props */}
        <div id="add-image-icon" onClick={this.showModal}></div>
        {this.state.showModal ? 
          <div id="add-image-modal-container">
            <div id="add-image-modal">
              <h4>Add Photo</h4>
              <input type="text" placeholder="Caption"></input>
              <div id="add-image-buttons">
                <button class="unselected" onClick={this.hideModal}>Cancel</button>
                <button class="selected" onClick={this.triggerInput}>Upload</button>
                <input id="browse" type="file" name="pic" accept="image/*"/>
              </div>
            </div>
          </div> : null
        }
      </div>
    );
  }
}

export default PhotoGridContainer;