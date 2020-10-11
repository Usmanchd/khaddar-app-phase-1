import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addItem,
  clearCurrentItem,
  updateItem,
} from '../../actions/addnewitem';

import firebase from '../../config/fbConfig';
import FileUploader from 'react-firebase-file-uploader';

const Additems = ({ addItem, data, clearCurrentItem, updateItem }) => {
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
  const [item, setitem] = useState({
    id: '',
    name: '',
    descrip: '',
    price: '',
    img: '',
    discount: '',
    type: '',
    categories: [],
    code: '',
  });
  const { name, descrip, price, img, discount, type, categories, code } = item;

  useEffect(() => {
    if (data.currentitem !== null) {
      setitem({
        id: data.currentitem._id,
        name: data.currentitem.name,
        price: data.currentitem.price,
        img: data.currentitem.img,
        descrip: data.currentitem.descrip,
        discount: data.currentitem.discount,
        type: data.currentitem.type,
        code: data.currentitem.code,
        categories: data.currentitem.categories,
      });
      setstate({ ...state, avatarURL: data.currentitem.img });
    } else {
      setitem({
        id: '',
        name: '',
        descrip: '',
        price: '',
        discount: '',
        type: '',
        categories: [],
        code: '',
      });
      setstate({ ...state, avatarURL: '' });
    }
    //eslint-disable-next-line
  }, [data.currentitem]);

  const onChange = (e) => setitem({ ...item, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.currentitem == null) {
      const newItem = {
        ...item,
        categories: item.categories.map((c) => c._id),
      };

      // console.log({ ...newItem, img: state.avatarURL });
      addItem({ ...newItem, img: state.avatarURL });
      setstate({ ...state, avatarURL: '' });
      setitem({
        name: '',
        price: '',
        descrip: '',
        discount: '',
        type: '',
        categories: [],
        code: '',
      });
    } else {
      const newUpdateItem = {
        ...item,
        categories: item.categories.map((c) => c._id),
      };

      updateItem({ ...newUpdateItem, img: state.avatarURL });
      setstate({ ...state, avatarURL: '' });
      setitem({
        name: '',
        price: '',
        descrip: '',
        discount: '',
        type: '',
        categories: [],
        code: '',
      });
      clearCurrentItem();
    }

    // console.log(item);
    // const newItem = { ...item, categories: item.categories.map((c) => c._id) };
    // console.log(newItem);
    // addItem(newItem);
    // setitem({
    //   name: "",
    //   price: "",
    //   descrip: "",
    //   discount: "",
    //   type: "",
    //   categories: [],
    //   code: "",
    // });
  };
  if (!data.categories)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <img src={require('../../assets/loader1.svg')} alt="" width="10%" />
        <h4 className="elementToFadeInAndOut">Getting form ready...</h4>
      </div>
    );
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Add new item</h3>
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
            class="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
            class="form-control"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Description"
            name="descrip"
            value={descrip}
            onChange={(e) => onChange(e)}
            required
            class="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
            required
            class="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Previous Price"
            name="discount"
            value={discount}
            onChange={(e) => onChange(e)}
            required
            class="form-control"
          />
        </div>
        <div className="form-group">
          {data.categories.length > 0 && (
            <select
              name="categories"
              class="form-control"
              onChange={(e) => {
                const categories = data.categories.filter(
                  (c) => c.name === e.target.value
                );

                console.log(categories);
                console.log(item.categories);
                if (
                  item.categories.filter((c) => c._id === categories[0]._id)
                    .length === 0
                )
                  setitem({
                    ...item,
                    categories: [...item.categories, categories[0]],
                  });
              }}
            >
              <option value="0">* Select Categories</option>
              {data.categories.map((c) => (
                <option value={c.name}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: data.categories.length > 0 && 'none' }}>
          <select name="categories" class="form-control">
            <option value="0">* Select Categories</option>
          </select>
        </div>

        <div style={{ height: 'auto', width: '300px' }}>
          <b>Name</b>
          <ol>
            {categories && categories.map((c) => <li key={c._id}>{c.name}</li>)}
          </ol>
        </div>

        {/* <div className="">
          {data.categories.length > 0 && (
            <select
              name="categories"
              value={categories}
              onChange={(e) => {
                console.log(e.target.value);
                onChange(e);
              }}
            >
              <option value="0">* Select Categories</option>
              {data.categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          {data.categories.length === 0 ? (
            <select>
              <option value="null">* Select Categories</option>
            </select>
          ) : null}

          <br />
        </div> */}
        <div className="form-group">
          <select
            name="type"
            value={type}
            required
            onChange={(e) => onChange(e)}
            class="form-control"
          >
            <option value="">* Select Status</option>
            <option value="new">New</option>
            <option value="featured">Featured</option>
            <option value="offer">offer</option>
          </select>
          <br />
        </div>
        <hr />

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter code"
            name="code"
            value={code}
            onChange={(e) => onChange(e)}
            required
            class="form-control"
          />
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
  addItem,
  clearCurrentItem,
  updateItem,
})(Additems);
