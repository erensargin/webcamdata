import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

function Survey() {

  const history = useHistory();
  useEffect(() => {
    document.getElementById('eski').click();

  }, []);

  const onChangeValue = (event) => {
    console.log(event.target.value);
  };

  const nextPage = (e) => {  
    history.replace("/video");
  };

  
  return (
    <div>
      <h1>Beğendiniz mi</h1>
      <div onChange={onChangeValue}>
        <input type="radio" value="Evet" name="gender" /> Evet
        <input type="radio" value="Hayır" name="gender" /> Hayır
        <input type="radio" value="Kararsız" name="gender" /> Kararsız
      </div>
      <button id="eski" onClick={nextPage}>eski sayfa</button>
    </div>
  );
}

export default Survey;
