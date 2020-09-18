import React, { Component } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import likeActionInc from "../redux/Like/LikeActionInc";
import { connect } from "react-redux";
import dislikeActionDec from "../redux/Dislike/DislikeActionDec";
import { Card, Row, Col, CardHeader, CardFooter, CardBody } from "reactstrap";
import "../App.css";

class CardView extends Component {
  render() {
    const likes = this.props.likes[this.props.index - 1];
    const dislikes = this.props.dislikes[this.props.index - 1];
    return (
      <Card className="post-card">
        <CardHeader>
          <div>
            <Row>
              <Col xs={3}>
                <img
                  className="profile-img"
                  width={50}
                  height={50}
                  src={this.props.profilelink}
                  alt=""
                />
              </Col>
              <Col xs={6}>
                <strong> {`User ${this.props.username}`}</strong>
                <br />
                {this.props.time}
              </Col>
            </Row>
          </div>
        </CardHeader>
        <CardBody>
          <img className="post-img" src={this.props.postlink} alt="" />
        </CardBody>
        <CardFooter>
          <Row>
            <Col className="thumbsup" xs={6}>
              <FiThumbsUp
                size="2em"
                onClick={() => this.props.likeActionInc(this.props.index)}
              />
              {likes}
            </Col>
            <Col className="thumbsdown" xs={6}>
              <FiThumbsDown
                size="2em"
                onClick={() => this.props.dislikeActionDec(this.props.index)}
              />
              {dislikes}
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.likeMarker.likes,
    dislikes: state.dislikeMarker.dislikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeActionInc: (index) => dispatch(likeActionInc(index)),
    dislikeActionDec: (index) => dispatch(dislikeActionDec(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardView);
