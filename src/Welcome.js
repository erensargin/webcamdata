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
    history.push("/video");
  };

  return (
    <div>
      <div>
        <h1>EO Project Ogi degisiklik</h1>
        <h5>Some Project Description</h5>
      </div>
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender*</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            value={gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>

        <form noValidate autoComplete="off">
          <TextField
            required
            id="standard-basic"
            label="Age"
            onChange={handleAge}
            type="number"
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
          label="I have read bla bla bla bla bla"
        />
      </div>
      <Button
        disabled={(!gender, !age, !checked)}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Continuah
      </Button>
    </div>
  );
}

export default Welcome;
