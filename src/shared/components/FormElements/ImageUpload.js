import React, { useEffect, useRef, useState } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const chooseFileRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedImageHandler = (event) => {
    let selectedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      selectedFile = event.target.files[0];
      setFile(selectedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, selectedFile, fileIsValid);
  };
  const selectImageHandler = () => {
    chooseFileRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={chooseFileRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={selectedImageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please select an image</p>}
        </div>
        <Button type="button" onClick={selectImageHandler}>
          SELECT IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
