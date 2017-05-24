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
  const images = props.images;
  const bumperCount = (images.length > 3) ? 4 : 0;
  // console.log(bumperCount, images.length);
  return (
      <div id="photo-grid">
        {images.map((image, index) =>
          <PhotoContainer key={index} {...image} />
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
      images: [],
      showModal: false,
      caption: '',
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.triggerBrowse = this.triggerBrowse.bind(this);
    this.triggerUpload = this.triggerUpload.bind(this);
    this.updateCaption = this.updateCaption.bind(this);
  }
  componentDidMount() {
    getImages(0).then(res => {
      this.setState({
        images: res.data,
      })
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

  triggerBrowse() {
    this.fileBrowser.click();
  }

  triggerUpload() {
    const file = this.fileBrowser.files[0];
    if (!/^image/.test(file.type)) {
      alert('You must select an image!');
      return;
    }
    let formData = new FormData();
    formData.append('photo',file,file.name);
    formData.append('caption', this.state.caption);
    postImage(formData).then(() => {
      this.hideModal();
      getImages(0).then(res => {
        this.setState({
          images: res.data,
        })
      });
    });
  }
  updateCaption(e) {
    this.setState({
      caption: e.target.value,
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div id="photo-grid-container">
        <div id="photo-grid-title">
          <h2>Hi {this.props.username}</h2>
          <h3>Welcome to your Photobucket</h3>
          <div className="small" onClick={this.props.logout}><a href='#'>Log out</a></div>
        </div>
        <PhotoGrid images={this.state.images} /> {/* pass photo props */}
        <div id="add-image-icon" onClick={this.showModal}></div>
        {this.state.showModal ? 
          <div id="add-image-modal-container">
            <div id="add-image-modal">
              <h4>Add Photo</h4>
              <input type="text" placeholder="Caption" value={this.state.caption} onChange={this.updateCaption} ></input>
              <div id="add-image-buttons">
                <button class="unselected" onClick={this.hideModal}>Cancel</button>
                <button class="selected" onClick={this.triggerBrowse}>Upload</button>
                <input id="browse" ref={(el) => this.fileBrowser = el} type="file" name="file" onChange={this.triggerUpload}/>

              </div>
            </div>
          </div> : null
        }
      </div>
    );
  }
}

export default PhotoGridContainer;