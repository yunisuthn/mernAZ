// create.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      article: ''
    }
  }
  onChangeArticle(e) {
    this.setState({
      article: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      article: this.state.article,
    };
    axios.post('http://localhost:8080/article', obj)
      .then(res => console.log(res.data));

    this.setState({
      article: ''
    })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h3>Article : </h3>
            <input type="textarea"
              className="textarea"
              value={this.state.article}
              onChange={this.onChangeArticle}
            />
          </div>
          <div className="form-group">
            <input type="file"/>
          </div>
          <div className="form-group">
            <input type="submit" value="PUBLIER" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}