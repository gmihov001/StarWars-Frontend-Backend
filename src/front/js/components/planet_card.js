import React from "react";
import PropTypes from "prop-types";

export const PlanetCard = props => {
	return (
		<div className="card m-3" style={{ width: "18rem" }}>
			<img
				src="https://vignette.wikia.nocookie.net/starwars/images/9/96/Ryloth-Homecoming.png"
				className="card-img-top"
				alt="..."
			/>
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<p className="card-text textCustom">
					Population: {props.population}
					<br />
					Terrain: {props.terrain}
				</p>
				{/* <Link to={`/planet_details/${props.index + 1}`}>
					<a href="#" className="btn btn-outline-primary">
						Learn more!
					</a>
				</Link> */}
				{/* <Context.Consumer>
					{({ actions, store }) => {
						const isFav = store.favorites.find(
							f => f.name == props.name
						);
						return ( */}
				<button
					type="button"
					className="btn btn-outline-warning"
					onClick={() => this.addToFavorites(props.name)}>
					{/* {isFav ? (
						<i className="fas fa-heart" />
					) : (
						<i className="far fa-heart" />
					)} */}
				</button>
				{/* );
					}}
				</Context.Consumer> */}
			</div>
		</div>
	);
};

PlanetCard.propTypes = {
	name: PropTypes.string,
	population: PropTypes.string,
	terrain: PropTypes.string,
	index: PropTypes.number
};
