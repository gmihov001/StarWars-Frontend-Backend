import React from "react";
import { Context } from "../store/appContext";

import PropTypes from "prop-types";
// import { Card } from "../components/card";
import { Card2 } from "../components/card2";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			characters: [],
			planets: []
		};
	}

	componentDidMount = () => {};

	render() {
		return (
			<div className="container">
				<Context.Consumer>
					{({ actions, store }) => (
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
													/>
												);
										  })
										: null}
								</div>
							</div>
						</>
					)}
				</Context.Consumer>
			</div>
		);
	}
}
