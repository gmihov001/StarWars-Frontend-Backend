import React from "react";
import { Context } from "../store/appContext";
import { CharacterCard } from "../components/card";
import { PlanetCard } from "../components/planet_card";
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

	componentDidMount = () => {
		// fetch("https://swapi.dev/api/people/?format=json")
		// 	.then(res => res.json())
		// 	.then(response => {
		// 		if (typeof response === typeof {}) {
		// 			this.setState({ characters: response.results });
		// 		} else {
		// 			this.setState({ characters: [] });
		// 		}
		// 	})
		// 	.catch(error => console.error("Error:", error));
		// fetch("https://swapi.dev/api/planets/?format=json")
		// 	.then(res => res.json())
		// 	.then(response => {
		// 		console.log("Success:", typeof response);
		// 		//console.log(response);
		// 		if (typeof response === typeof {}) {
		// 			this.setState({ planets: response.results });
		// 		} else {
		// 			this.setState({ planets: [] });
		// 		}
		// 	})
		// 	.catch(error => console.error("Error:", error));
	};

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
												// return <CharacterCard key={index} character={elem} index={index} />;
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
												// return <PlanetCard className="textCustom" key={index} planet={elem} index={index} />;
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

// Card.propTypes = {
// 	name: PropTypes.string,
// 	species: PropTypes.array,
// 	gender: PropTypes.string,
// 	eye_color: PropTypes.string,
// 	hair_color: PropTypes.string
// };
