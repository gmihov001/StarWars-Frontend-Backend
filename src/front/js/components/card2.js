import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card2 = props => {
	var data = props.entity;
	const { store, actions } = useContext(Context);
	const [isFav, setIsFav] = useState(null);

	useEffect(() => {
		var result = store.favorites.find(favorite => favorite.name == props.entity.name);
		setIsFav(result);
	});
	// if (props.planet) {
	// 	data = props.planet;
	// 	console.log("Planet data", data);
	// }
	// if (props.character) {
	// 	data = props.character;
	// 	console.log("Character data", data);
	// }
	let propArr = [];
	for (let property in data) {
		propArr.push({ propname: property, propvalue: data[property] });
	}
	// console.log("propArr", propArr);

	return (
		<div className="card m-3" style={{ width: "18rem" }}>
			<img src={props.imgUrl} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{propArr[0].propvalue}</h5>
				<p className="card-text">
					{propArr[4].propname}: {propArr[4].propvalue}
					<br />
					{propArr[6].propname}: {propArr[6].propvalue}
					<br />
					{propArr[7].propname}: {propArr[7].propvalue}
				</p>
				<div className="d-flex justify-content-between">
					<Link
						to={{
							pathname: `/details/${props.index + 1}`,
							state: props
						}}>
						<button href="#" className="btn btn-outline-dark learn-more">
							LEARN MORE
						</button>
					</Link>
					{isFav ? (
						<button
							type="button"
							className="btn btn-outline-warning"
							onClick={() => actions.deleteFromFavorites(props)}>
							<i className="fas fa-heart" />
						</button>
					) : (
						<button
							type="button"
							className="btn btn-outline-warning"
							onClick={() => actions.addToFavorites(props)}>
							<i className="far fa-heart" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

Card2.propTypes = {
	character: PropTypes.object,
	planet: PropTypes.object,
	entity: PropTypes.object,
	name: PropTypes.string,
	species: PropTypes.array,
	gender: PropTypes.string,
	eye_color: PropTypes.string,
	hair_color: PropTypes.string,
	index: PropTypes.number,
	imgUrl: PropTypes.string
};
