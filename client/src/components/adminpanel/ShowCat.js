import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeCategory } from "../../actions/addnewitem";
import { setCurrentCat } from "../../actions/addnewitem";
import { clearCurrentCat } from "../../actions/addnewitem";

const ShowCat = ({ data, removeCategory, setCurrentCat, clearCurrentCat }) => {
  const handleRemove = (id) => {
    removeCategory(id);
    clearCurrentCat();
  };
  const handleEdit = (c) => setCurrentCat(c);
  return (
    <div>
      {data.categories.length === 0 ? (
        <h1>Loading..</h1>
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
                <img src={c.img} style={{ width: "30%" }} />
                <td>{c.name}</td>
                <td>{c.caption}</td>
                <td>{c.descrip}</td>
                <td>
                  <Link to="/panel/addnewcategory">
                    <button
                      style={{
                        backgroundColor: "black",
                        borderRadius: "20%",
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
                      backgroundColor: "black",
                      borderRadius: "20%",
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
