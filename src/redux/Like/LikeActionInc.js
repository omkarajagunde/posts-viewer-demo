import { LIKE_ACTION_INC } from "./LikeTypes";

const likeActionInc = (index) => {
  return {
    type: LIKE_ACTION_INC,
    payload: index,
  };
};

export default likeActionInc;
