import { DISLIKE_ACTION_DEC } from "./DislikeTypes";

const dislikeActionDec = (index) => {
  return {
    type: DISLIKE_ACTION_DEC,
    payload: index,
  };
};

export default dislikeActionDec;
