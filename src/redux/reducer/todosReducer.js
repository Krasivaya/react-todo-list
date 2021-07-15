import initialState from "../initialState";
import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_STATUS,
} from "../action-type";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [payload].concat(state.items),
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => payload !== item.id),
      };

    case UPDATE_ITEM:
      let item = state.items[payload.index];
      item.title = payload.title;
      return {
        ...state,
      };

    case UPDATE_ITEM_STATUS:
      let newItem = state.items[payload];
      newItem.isComplete = !newItem.isComplete;
      return {
        ...state,
      };

    default:
      return state;
  }
};
