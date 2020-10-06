import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeItem,
  setCurrentItem,
  clearCurrentItem,
} from "../../../actions/addnewitem";

const ShowProducts = ({
  data,
  removeItem,
  setCurrentItem,
  clearCurrentItem,
}) => {
  const handleRemove = (id) => {
    removeItem(id);
    clearCurrentItem();
  };
  const handleEdit = (c) => {
    setCurrentItem(c);
  };
  return (
    <div>
      {data.items.length === 0 ? (
        <h1>Loading..</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Name</th>
              <th scope="col">price</th>
              <th scope="col">Description</th>
              <th scope="col">type</th>
              <th scope="col">code</th>
              <th scope="col">edit</th>
              <th scope="col">delete</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((c) => (
              <tr>
                <td>
                  <img src={c.img} style={{ width: "23%" }} />
                </td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>{c.descrip}</td>
                <td>{c.type}</td>
                <td>{c.code}</td>
                <td>
                  <Link to="/panel/addproducts">
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
  removeItem,
  setCurrentItem,
  clearCurrentItem,
})(ShowProducts);
