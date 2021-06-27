import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import PropTypes from "prop-types";
// import { Card } from "../components/card";
import { Card2 } from "../components/card2";

export const Home = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<>
				<div className="row scroller">
					<h4 className="m-3">CHARACTERS</h4>
					<div className="card-columns">
						{store.characters
							? store.characters.map((elem, index) => {
									return (
										<Card2
											key={index}
											imgUrl="https://lumiere-a.akamaihd.net/v1/images/vicruls-sythe-main_e404bc44.jpeg"
											entity={elem}
											entityType="person"
											index={index}
										/>
									);
							  })
							: null}
					</div>
				</div>
				<div className="row scroller">
					<h4 className="m-3">PLANETS</h4>
					<div className="card-columns">
						{store.planets
							? store.planets.map((elem, index) => {
									return (
										<Card2
											className="textCustom"
											key={index}
											imgUrl="https://lumiere-a.akamaihd.net/v1/images/aeos-prime-main_1af6e847.jpeg"
											entity={elem}
											index={index}
											entityType="planet"
										/>
									);
							  })
							: null}
					</div>
				</div>
			</>
		</div>
	);
};
