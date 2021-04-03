import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useStateValue } from "./StateProvider";
import ReactPlayer from "react-player/youtube";

function Welcome() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    console.log(gender);
    console.log(age);
    console.log(checked);
  }, [gender, age, checked]);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_AGE_GENDER",
      age: age,
      gender: gender,
    });
    dispatch({
      type: "SET_COUNTER",
      counter: 0,
    });
    history.push("/video");
  };

  return (
    <div>
      <div>
        <h1>Reklam - Duygu Analizi</h1>
        <h5>
          Bu site İstanbul Kültür Üniversitesi Öğrencileri Oğuzhan KIR, Eren
          SARGIN ve Alperen ARSLANTAŞ'ın yaptığı bitirme projesi çalışması için
          hazırlanmıştır.
        </h5>
        <h5>
          Bize nasıl yardımcı olabileceğinizi öğrenmek için aşağıdaki videoyu
          izleyebilirsiniz. Şimdiden teşekkürler.
        </h5>
      </div>
      <div>
        <h2>Projeye Başlamadan Önce Sistemi Nasıl Kullanacağınızı Öğrenin</h2>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=2FQlJtPiIic&ab_channel=O%C4%9FuzhanKIR"
          playing={false}
          width="50%"
          height="400px"
          style={{ margin: "auto" }}
        />
        <p>
          Videoya kayıt boyunca müdahale edemeyeceğinizden bilgisayarınızın
          sesini kısıp katılım sağlamanızı öneririz.
        </p>
      </div>

      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cinsiyet*</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            value={gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Kadın"
            />
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" />}
              label="Erkek"
            />
          </RadioGroup>
        </FormControl>

        <form noValidate autoComplete="off">
          <TextField
            required
            id="standard-basic"
            label="Yaş"
            onChange={handleAge}
            type="number"
            value={age}
          />
        </form>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              color="primary"
            />
          }
          label="Bu projede görüntümün kaydedilmesini ve sadece projeyi yöneten kişilerin kullanmasına izin veriyorum."
        />
      </div>
      <Button
        disabled={(!gender, !age, !checked)}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Kabul Et
      </Button>
    </div>
  );
}

export default Welcome;
