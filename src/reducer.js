export const initialState = {
  gender: "",
  age: "",
  url: "",
  videoname: "",
  counter: 0,
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
    case "SET_COUNTER":
      return{
        ...state,
        counter: action.counter
      }
    case "SET_URL_VIDEONAME":
      return {
        ...state,
        url: action.url,
        videoname: action.videoname,
      };
    default:
      return state;
  }
};

export default reducer;
