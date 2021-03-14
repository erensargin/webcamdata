import React from "react";

function Survey() {
  const onChangeValue = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Beğendiniz mi</h1>
      <div onChange={onChangeValue}>
        <input type="radio" value="Evet" name="gender" /> Evet
        <input type="radio" value="Hayır" name="gender" /> Hayır
        <input type="radio" value="Kararsız" name="gender" /> Kararsız
      </div>
    </div>
  );
}

export default Survey;
