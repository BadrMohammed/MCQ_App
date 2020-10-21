import dotProp from "dot-prop-immutable";

export const updateProps = (state, action) => {
  let newState = state;
  for (let i = 0; i < action.payload.length; i++) {
    newState = dotProp.set(
      newState,
      action.payload[i].prop,
      action.payload[i].value
    );
  }
  return newState;
};
export const mergeProps = (state, action) => {
  let newState = state;
  for (let i = 0; i < action.payload.length; i++) {
    newState = dotProp.merge(
      newState,
      action.payload[i].prop,
      action.payload[i].value
    );
  }
  return newState;
};
export const deleteProps = (state, action) => {
  let newState = state;
  for (let i = 0; i < action.payload.length; i++) {
    newState = dotProp.delete(newState, action.payload[i].prop);
  }
  return newState;
};
