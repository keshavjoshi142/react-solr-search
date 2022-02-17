import React, { Component } from "react";
import { render } from "react-dom";
import Button from '@material-ui/core/Button';


/**
 * Returns a promise that reads a file as a dataUrl representation (composed
 * of a mimetype and a base64 string).
 *
 * @param file {File}
 * @return {Promise}
 */
async function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // async event handlers
    reader.onload = e => resolve(reader.result);
    reader.onerror = e => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

class Image extends React.PureComponent {
  state = {
    file: null,
    base64: null,
    objectUrl : null,
  };

  inputFileRef = null;

  handleChangePhotoButton = e => {
    e.preventDefault();
    this.inputFileRef.click();
  };

  componentDidUpdate(){
      if(this.props.Submit){
          this.props.accumulateImage(this.state.objectUrl)
      }
  }

  handleChangePhotoFileInput = e => {
    const target = e.currentTarget;
    const file = target.files.item(0);

    if (!file.type.startsWith("image/")) {
      alert("File is not an image");
      return;
    }

    readDataUrl(file).then(dataUrl => {
      this.setState({
        ...this.state,
        file,
        base64: dataUrl,
        objectUrl: URL.createObjectURL(file)
      });
    });
  };

  render() {
    const { base64, objectUrl } = this.state;
    const defaultImage = "http://via.placeholder.com/300";

    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell">
            <input
              onChange={this.handleChangePhotoFileInput}
              ref={input => (this.inputFileRef = input)}
              style={{ display: "none" }}
              type="file"
            />
          
            <Button
                variant = "extendedFab"
                color = "primary"
                aria-label = "Add"
                onClick={this.handleChangePhotoButton}
                className="small"
                >
                Upload Photo
            </Button>
          </div>
        </div>
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell small-6">
            <div className="callout">
              <h3>Base64</h3>
              <div className="card">
                <img
                  src={base64 || defaultImage}
                  ref={img => (this.imgRef = img)}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Image