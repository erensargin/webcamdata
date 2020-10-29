export const initialState = {
  gender: "",
  age: "",
};

const reducer = (state, action) => {
  console.log("This is action:", action);
  //console.log("This is state:", state);
  switch (action.type) {
    case "SET_AGE_GENDER":
      return {
        ...state,
        gender: action.gender,
        age: action.age,
      };
    /* case "SET_USER":
      return {
        ...state,
        user: action.user,
      }; */
    default:
      return state;
  }
};

export default reducer;
