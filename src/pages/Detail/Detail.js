import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    article: {}
  };

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  getArticle = id => {
    API.getArticle(id)
    .then(res =>
      this.setState({ book: res.data})
    )
    .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.article.title} by {this.state.article.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>URL</h1>
              <p>{this.state.article.url}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Return to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
