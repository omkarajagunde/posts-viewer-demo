import { LIKE_ACTION } from "./LikeTypes";

const likeAction = () => {
  return {
    type: LIKE_ACTION,
    payload: Array.from({ length: 5 }, () => 0),
  };
};

export default likeAction;
