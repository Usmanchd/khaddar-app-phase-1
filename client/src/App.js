import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Navbar2 from './components/layout/Navbar2';
import Categories from './components/routes/Categories';

import Landing from './components/layout/Landing';
import Newcollection from './components/routes/Newcollection';
import Winter from './components/routes/Winter';
import Summer from './components/routes/Summer';
import ProductsList from './components/routes/ProductsList';
import LatestProducts from './components/routes/LatestProducts';
import Singleproduct from './components/routes/Singleproduct';

import Cart from './components/cart/Cart';
import Wishlist from './components/cart/Wishlist';
import Checkout from './components/cart/Checkout';

import Blog from './components/routes/Blog';
import Contact from './components/routes/Contact';
import Footer from './components/layout/Footer';

import Additem from './components/adminpanel/Additems';
import Login from './components/adminpanel/Login';
import Register from './components/adminpanel/Register';
import Landingpanel from './components/adminpanel/Landingpanel';
import Orderlist from './components/adminpanel/Orderlist';

import Body from './components/adminpanel/layout/Body';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { getInitData } from './actions/addnewitem';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [appReady, setappReady] = useState(false);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getInitData());
    window.scrollTo(0, 0);
  }, []);

  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (location.pathname === '/login') return <Login />;
  if (location.pathname.search(/panel/i) > -1) return <Landingpanel />;

  store.subscribe(() => {
    if (store.getState().addnewitem.items.length !== 0) setappReady(true);
  });

  if (!appReady)
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
        <img src={require('./assets/loader1.svg')} alt="" width="10%" />
        <h4 className="elementToFadeInAndOut">Getting products ready...</h4>
      </div>
    );

  return (
    <div className="App">
      <div>
        <header>
          <div className="header-area">
            <div className="main-header ">
              <Navbar />
              <Navbar2 />
            </div>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Blog" component={Blog} />
          <Route exact path="/Categories" component={Categories} />
          <Route exact path="/Categories/:name" component={Newcollection} />
          {/* <Route exact path="/Newcollection" component={Newcollection} /> */}
          {/* <Route exact path="/Winter" component={Winter} />
            <Route exact path="/Summer" component={Summer} /> */}
          <Route exact path="/Productslist" component={ProductsList} />
          <Route exact path="/Latestproducts" component={LatestProducts} />
          <Route exact path="/Contact" component={Contact} />
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/Checkout" component={Checkout} />

          <Route exact path="/registers" component={Register} />
          {/* <Route path="/panel" component={Landingpanel} /> */}
          <Route exact path="/admin" component={Additem} />
          <Route exact path="/orderlist" component={Orderlist} />
          <Route exact path="/:id" component={Singleproduct} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
