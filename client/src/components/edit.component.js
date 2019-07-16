import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      article: ''
    }
  }

  componentDidMount() {
    
      axios.get('http://localhost:8080/article/'+this.props.match.params._id)
          .then(response => {
            console.log('resonpse',response)
              this.setState({ 
                article: response.data.article
               });
                
          })
          .catch(function (error) {
              console.log(error);
              console.log('responose bad');
              
          })
          console.log(this.state.article);
    }

  onChangeArticle(e) {
    this.setState({
      article: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      article: this.state.article
    };
    console.log('persone ============== ', this.state.article);
    
    axios.put('http://localhost:8080/article/'+this.props.match.params._id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
          {console.log('coucou', this.state.person_name)}
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.article}
                      onChange={this.onChangeArticle}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}