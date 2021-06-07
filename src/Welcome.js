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
    <div
      style={{
        backgroundImage: "url(/minimal-background-pattern-wordpress-1.jpg)",
        margin: "-22px 0",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "Helvetica",
            margin: "22px 0",
            padding: "22px",
          }}
        >
          Advertisement - Emotion Analysis
        </h1>
        <div style={{}}>
          <h4>
            This site is made by Istanbul Kultur University students Oğuzhan
            KIR, Eren SARGIN and Alperen ARSLANTAŞ. Main purpose of this site is
            collecting data for graduation project
          </h4>

          <h5>
            You can learn how to help us by watching the video below. Thanks for
            your participation
          </h5>
        </div>
      </div>
      <div>
        <h2>Learn How To Use The System Before Starting The Project</h2>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=2FQlJtPiIic&ab_channel=O%C4%9FuzhanKIR"
          playing={false}
          width="50%"
          height="400px"
          style={{ margin: "auto" }}
        />

        <p
          style={{
            color: "red",
          }}
        >
          Since you cannot interfere with the video during the recording, We
          recommend that you adjust your computer's volume and participate.
        </p>
      </div>

      <div>
        <FormControl
          component="fieldset"
          style={{ padding: "5px -3px 5px 0px" }}
        >
          <FormLabel component="legend">Gender*</FormLabel>
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
              label="Female"
            />
            <FormControlLabel
              value="Male"
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
          label="In this project, I allow my footage to be saved and only the people managing the project to use."
        />
      </div>
      <Button
        disabled={(!gender, !age, !checked)}
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{
          border: "2px black solid",
          padding: "5px -3px 5px 0px",
        }}
      >
        Agreed
      </Button>
    </div>
  );
}

export default Welcome;
