import { DISLIKE_ACTION } from "./DislikeTypes";

const dislikeAction = () => {
  return {
    type: DISLIKE_ACTION,
    payload: Array.from({ length: 5 }, () => 0),
  };
};

export default dislikeAction;
