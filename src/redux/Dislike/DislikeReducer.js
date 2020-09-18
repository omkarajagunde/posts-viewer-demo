import { DISLIKE_ACTION, DISLIKE_ACTION_DEC } from "./DislikeTypes";

const initialState = {
  dislikes: [],
};

const dislikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISLIKE_ACTION:
      return {
        dislikes: [...state.dislikes, ...action.payload],
      };

    case DISLIKE_ACTION_DEC:
      const { dislikes } = state;
      dislikes.map((val, index) => {
        if (index === action.payload - 1) dislikes[index] = val + 1;
        else dislikes[index] = val;

        return 0;
      });
      return {
        ...state,
        dislikes: dislikes,
      };
    default:
      return state;
  }
};

export default dislikeReducer;
