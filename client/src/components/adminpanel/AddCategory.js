import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../../actions/addnewitem';
import { clearCurrentCat, updateCategory } from '../../actions/addnewitem';
import firebase from '../../config/fbConfig';
import FileUploader from 'react-firebase-file-uploader';

const Additems = ({ addCategory, clearCurrentCat, updateCategory, data }) => {
  // image start

  const [state, setstate] = useState({
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
  });
  const [imgLoading, setimgLoading] = useState(false);
  const handleUploadStart = () => {
    setimgLoading(true);
    setstate({ isUploading: true, progress: 0 });
  };
  const handleProgress = (progress) => setstate({ progress });
  const handleUploadError = (error) => {
    setstate({ isUploading: false });
  };
  const handleUploadSuccess = (filename) => {
    setstate({ avatar: filename, progress: 100 });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => setstate({ avatarURL: url }));

    setTimeout(() => {
      setimgLoading(false);
    }, 5000);
  };

  // image ending

  const [category, setcategory] = useState({
    id: '',
    name: '',
    caption: '',
    descrip: '',
    img: '',
  });
  const { id, name, caption, descrip } = category;
  console.log(data.currentcat);
  useEffect(() => {
    if (data.currentcat !== null) {
      setcategory({
        id: data.currentcat._id,
        name: data.currentcat.name,
        caption: data.currentcat.caption,
        descrip: data.currentcat.descrip,
        img: data.currentcat.img,
      });
      setstate({ ...state, avatarURL: data.currentcat.img });
    } else {
      setcategory({ id: '', name: '', caption: '', descrip: '' });
      setstate({ ...state, avatarURL: '' });
    }
    //eslint-disable-next-line
  }, [data.currentcat]);

  const onChange = (e) =>
    setcategory({ ...category, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.currentcat == null) {
      addCategory({ ...category, img: state.avatarURL });
      setcategory({ id: '', name: '', caption: '', descrip: '' });
      setstate({ ...state, avatarURL: '' });
    } else {
      console.log('update:', category);
      updateCategory({ ...category, img: state.avatarURL });
      setcategory({ id: '', name: '', caption: '', descrip: '' });
      setstate({ ...state, avatarURL: '' });
      clearCurrentCat();
    }
  };
  return (
    <div className="">
      <h3 style={{ textAlign: 'center' }}>Add new category</h3>
      <form
        className="form"
        onSubmit={(e) => onSubmit(e)}
        style={{ width: '50%', margin: 'auto', padding: '40px' }}
      >
        <div className="form-group">
          <img src={state.avatarURL} style={{ width: '20%' }} />
          <FileUploader
            accept="image/*"
            name="avatar"
            id="img"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Category name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            class="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Caption"
            name="caption"
            value={caption}
            onChange={(e) => onChange(e)}
            class="form-control"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="Enter description"
            name="descrip"
            value={descrip}
            onChange={(e) => onChange(e)}
            class="form-control"
            required
          ></textarea>
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          value="submit"
          disabled={imgLoading ? true : false}
        />
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
});

export default connect(mapStateToProps, {
  addCategory,
  clearCurrentCat,
  updateCategory,
})(Additems);
