import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { useStateValue } from "./StateProvider";

function Sur(props) {
	const [{}, dispatch] = useStateValue();

	return (
		<div>
			<div>
				<FormControl component="fieldset">
					<FormLabel component="legend">Ne kadar etkili oldu</FormLabel>
					<RadioGroup
						row
						aria-label="Soru"
						name="soru1"
						value={props.soru1}
						onChange={props.handleChange}
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
						<FormControlLabel
							value="6"
							control={<Radio color="primary" />}
							label="6"
						/>
						<FormControlLabel
							value="7"
							control={<Radio color="primary" />}
							label="7"
						/>
						<FormControlLabel
							value="8"
							control={<Radio color="primary" />}
							label="8"
						/>
						<FormControlLabel
							value="9"
							control={<Radio color="primary" />}
							label="9"
						/>
						<FormControlLabel
							value="10"
							control={<Radio color="primary" />}
							label="10"
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<div>
				<FormControl component="fieldset">
					<FormLabel component="legend">
						Bu reklamı daha önce seyretmiş
					</FormLabel>
					<RadioGroup
						row
						aria-label="Soru2"
						name="Soru2"
						value={props.soru2}
						onChange={props.handleChange2}
					>
						<FormControlLabel
							value="Evet"
							control={<Radio color="primary" />}
							label="Evet"
						/>
						<FormControlLabel
							value="Hayır"
							control={<Radio color="primary" />}
							label="Hayır"
						/>
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default Sur;
