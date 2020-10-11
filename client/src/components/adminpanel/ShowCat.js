import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCategory } from '../../actions/addnewitem';
import { setCurrentCat } from '../../actions/addnewitem';
import { clearCurrentCat } from '../../actions/addnewitem';

const ShowCat = ({ data, removeCategory, setCurrentCat, clearCurrentCat }) => {
  const handleRemove = (id) => {
    removeCategory(id);
    clearCurrentCat();
  };
  const handleEdit = (c) => setCurrentCat(c);
  return (
    <div>
      {data.categories.length === 0 ? (
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
          <h4 className="elementToFadeInAndOut">Fetching categories...</h4>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Caption</th>
              <th scope="col">Description</th>
              <th scope="col">edit</th>
              <th scope="col">delete</th>
            </tr>
          </thead>
          <tbody>
            {data.categories.map((c) => (
              <tr>
                <td style={{ width: '15%' }}>
                  <img src={c.img} width="100%" />
                </td>
                <td>{c.name}</td>
                <td>{c.caption}</td>
                <td>{c.descrip}</td>
                <td>
                  <Link to="/panel/addnewcategory">
                    <button
                      style={{
                        backgroundColor: 'black',
                        borderRadius: '20%',
                      }}
                      onClick={() => handleEdit(c)}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: 'black',
                      borderRadius: '20%',
                    }}
                    onClick={() => handleRemove(c._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
});

export default connect(mapStateToProps, {
  removeCategory,
  setCurrentCat,
  clearCurrentCat,
})(ShowCat);
