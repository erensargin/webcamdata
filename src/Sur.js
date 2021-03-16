import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { useStateValue } from "./StateProvider";

function Sur() {
	const [{}, dispatch] = useStateValue();

	const [soru1, setSoru1] = useState(-1);

	useEffect(() => {
		dispatch({
			type: "SET_CEVAP",
			soru1: soru1,
		});
	}, [soru1]);

	const handleChange = (event) => {
		setSoru1(event.target.value);
	};

	return (
		<div>
			<div>
				<FormControl component="fieldset">
					<FormLabel component="legend">Ne kadar etkili oldu</FormLabel>
					<RadioGroup
						row
						aria-label="Soru"
						name="soru1"
						value={soru1}
						onChange={handleChange}
					>
						<FormControlLabel
							value="1"
							control={<Radio color="primary" />}
							label="1"
						/>
						<FormControlLabel
							value="2"
							control={<Radio color="primary" />}
							label="2"
						/>
						<FormControlLabel
							value="3"
							control={<Radio color="primary" />}
							label="3"
						/>
						<FormControlLabel
							value="4"
							control={<Radio color="primary" />}
							label="4"
						/>
						<FormControlLabel
							value="5"
							control={<Radio color="primary" />}
							label="5"
						/>
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default Sur;
