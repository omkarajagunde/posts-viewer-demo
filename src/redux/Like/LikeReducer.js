import { LIKE_ACTION } from "./LikeTypes";
import { LIKE_ACTION_INC } from "./LikeTypes";

const initialState = {
  likes: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ACTION:
      return {
        likes: [...state.likes, ...action.payload],
      };
    case LIKE_ACTION_INC:
      const { likes } = state;
      likes.map((val, index) => {
        if (index === action.payload - 1) likes[index] = val + 1;
        else likes[index] = val;
        return 0;
      });
      return {
        ...state,
        likes: likes,
      };
    default:
      return state;
  }
};

export default likeReducer;
