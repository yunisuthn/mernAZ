import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './create.component';
import Edit from './edit.component';
import Index from './index.component';
import Update from './update.profil';

class App extends Component {
  render() {
    return (
      <Router>
        <div class="container-fluid" id="main">
          <div class="row row-offcanvas row-offcanvas-left">
            <div class="col-md-3 col-lg-2 sidebar-offcanvas" id="sidebar" role="navigation">
              <div>
                <img />
              </div>
              <ul class="nav flex-column pl-1">
                {/* <li class="nav-item"><a class="nav-link" href="#">Overview</a></li> */}
                <li class="nav-item">
                  <Link to={'/'} className="nav-link">Create</Link>
                </li>
                <li class="nav-item">
                  <Link to={'/profil'} className="nav-link">Index</Link>
                </li>
                <li class="nav-item">
                  <Link to={'/update'} className="nav-link">Update</Link>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <Switch>
                <Route exact path='/' component={Create} />
                <Route path='/edit/:_id' component={Edit} />
                <Route path='/profil' component={Index} />
                <Route path='/update' component={Update} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


{/* <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Create</Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li> }
                <li className="nav-item">
                  <Link to={'/profil'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to React CRUD Tutorial</h2> <br/>
          <a>
        <img className='img-circle' src='' width='80'/>
          </a>
          <Switch>
              <Route exact path='/' component={ Create } />
              <Route path='/edit/:_id' component={ Edit } />
              <Route path='/profil' component={ Index } />
          </Switch>
        </div>
      </Router> */}