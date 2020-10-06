import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Categories = ({ data }) => {
  const { categories } = data;
  return (
    <section
      className="category-area section-padding20"
      id="Catagori"
      style={{ paddingTop: '60px' }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center mb-85">
              <h2>Shop by Category</h2>
            </div>
          </div>
        </div>
        {categories.length === 0 ? (
          <h1>Currently No Category Available</h1>
        ) : (
          <div className="row">
            {categories.map((category) => (
              <div className="col-xl-4 col-lg-6">
                <div className="single-category mb-30">
                  <div className="category-img">
                    <Link to={`/Categories/${category.name}`}>
                      <img src={category.img} alt="" />

                      <div
                        className="category-caption"
                        style={{ width: '40%' }}
                      >
                        <h2>{category.name}</h2>
                        <span className="best">
                          <a href="#">{category.caption}</a>
                        </span>
                        <span className="collection" style={{ margin: '5px' }}>
                          {category.descrip}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
});

export default connect(mapStateToProps)(Categories);
