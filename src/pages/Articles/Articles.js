import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

import API from "../../utils/API";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: []
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.loadArticles ();
  }

  loadArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data})
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var startdate = document.getElementById("startDate").value;
    var enddate = document.getElementById("endDate").value;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += "?api-key=a37f87b8092245b5b1e6d60c602534f0";

    if (title !== ""){
      url += '&q=' + title;
    }

    if (startdate !== ""){
        url += '&begin_date=' + startdate;
    }
    
    if (enddate !== ""){
        url += '&end_date=' + enddate;
    }
    
    API.getArticles(url)
      .then(res => {
        var articleBlocks = this.print(res.data);
        this.setState({ articles: articleBlocks})
      }).catch(err => console.log(err));
  };
  
  print(result){
    var articleBlocks = [];
    for (let i=0; i<10; i++) {
      var A = {
        title: result.response.docs[i].headline.main,
        url: result.response.docs[i].web_url,
        date: result.response.docs[i].pub_date.substring(0,10)
      }
      articleBlocks.push(A);
    }
    return articleBlocks;
  }
  
  handleDelete = (id) => {
    API.deleteArticle(id).then(res => {
        this.loadArticles();
      })
      .catch(err => console.log(err));
  };

  handleSave = (article) => {
    console.log(article);
    API.saveArticle(article)
      .then(res => {
        this.loadArticles();
      })
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <div>
                <h1 className="display-4">New York Times Article Search</h1>
                <p id ="text" className="lead">Enter a search term to find an article.</p>
                <hr className="my-4" />
                <br />
              </div>
            </Jumbotron>
            <form>
              <label id="formHead">Search For:</label>
              <Input id = "title" name="title" placeholder="Enter Keyword (required)" />
              <label id="formHead">Start Date</label>
              <Input id = "startDate" name="Start Date" placeholder="YYYYMMDD" />
              <label id="formHead">End Date</label>
              <Input  id = "endDate" name="End Date" placeholder="YYYYMMDD" />
              <FormBtn className="btn btn-primary" onClick={this.handleFormSubmit}>Search</FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                      <strong>
                        {article.title}. {article.date}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.handleSave(article)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Sorry. Your search did not return any results. Please try again.</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={"/articles/" + article._id}>
                      <strong>
                        {article.title} on {article.url}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.handleDelete(article._id)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Articles</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
