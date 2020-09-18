import React from "react";
import "./App.css";
import CardView from "./components/CardView";
import { connect } from "react-redux";
import likeAction from "./redux/Like/LikeActions";
import dislikeAction from "./redux/Dislike/DislikeActions";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import store from "./store";

var flagScrollTimes = false;
var unsub;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loading: true,
      currentPostIndex: 1,
      errorMsg: null,
    };
  }

  fetchPostsData = async () => {
    const { currentPostIndex } = this.state;
    try {
      let i;
      let responce;
      let last = currentPostIndex + 5;
      for (i = currentPostIndex; i < last; i++) {
        responce = await axios.get(
          `https://jsonplaceholder.typicode.com/photos/${this.state.currentPostIndex}`
        );
        console.log(i);
        this.setState({
          userList: [...this.state.userList, responce.data],
          currentPostIndex: i,
          loading: true,
        });
      }

      //data loading complete
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMsg: error.message,
      });
    }
  };

  componentDidMount = () => {
    this.fetchPostsData();
    console.log(this.state.userList);
    this.props.likeAction();
    this.props.dislikeAction();
    window.addEventListener("scroll", this.handleScroll);
    unsub = store.subscribe(() => {
      this.setState({});
      console.log("Updatedddd");
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    unsub();
  }

  handleScroll = async (e) => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        loading: true,
      });

      flagScrollTimes = true;
      try {
        if (flagScrollTimes === true) await this.fetchPostsData();
        this.props.likeAction();
        this.props.dislikeAction();
      } catch (error) {}
    } else {
      flagScrollTimes = false;
      console.log("not at bottom");
    }
  };

  render() {
    const element = this.state.loading ? (
      <ListGroup>
        {this.state.userList.map((value, index) => {
          if (index > 0)
            return (
              <ListGroupItem key={index}>
                <CardView
                  profilelink={value.thumbnailUrl}
                  username={value.id}
                  postlink={value.url}
                  ups={10}
                  downs={2}
                  time={`${
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds()
                  }`}
                />
              </ListGroupItem>
            );
          else return ``;
        })}
        <div className="spinLoader d-flex align-items-center">
          <strong>Loading new posts...</strong>
          <div
            className="spinner-border ml-auto"
            role="status"
            aria-hidden="true"></div>
        </div>
      </ListGroup>
    ) : (
      <ListGroup
        className="list list-group-flush"
        onScroll={this.handleScroll.bind(this)}>
        {this.state.userList.map((value, index) => {
          if (index > 0)
            return (
              <ListGroupItem key={index}>
                <CardView
                  profilelink={value.thumbnailUrl}
                  username={value.id}
                  postlink={value.url}
                  index={index}
                  time={`${
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds()
                  }`}
                />
              </ListGroupItem>
            );
          else return ``;
        })}
      </ListGroup>
    );
    return <div className="container">{element}</div>;
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
    likeAction: () => dispatch(likeAction()),
    dislikeAction: () => dispatch(dislikeAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
