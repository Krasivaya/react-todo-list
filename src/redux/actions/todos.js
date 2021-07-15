import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_STATUS,
} from "../action-type";

export const addItem = (data) => ({
  type: ADD_ITEM,
  payload: data,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const updateItem = (data) => ({
  type: UPDATE_ITEM,
  payload: data,
});

export const updateItemStatus = (index) => ({
  type: UPDATE_ITEM_STATUS,
  payload: index,
});
