import { combineReducers } from "redux";
import dislikeReducer from "./redux/Dislike/DislikeReducer";
import likeReducer from "./redux/Like/LikeReducer";

const rootReducer = combineReducers({
  likeMarker: likeReducer,
  dislikeMarker: dislikeReducer,
});

export default rootReducer;
