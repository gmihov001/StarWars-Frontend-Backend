import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			redirect: false
		};
	}

	componentDidMount = () => {
		//const { handle } = this.props.match.params;
		const { data } = this.props.location.state;
		this.setState({ results: data });
		console.log(this.state.data);
		console.log(this.state.results);

		// fetch("https://swapi.co/api/people/" + this.props.match.params.id + "?format=json")
		// 	.then(res => res.json())
		// 	.then(response => {
		// 		//console.log("Success:", typeof response);
		// 		//	console.log(response);
		// 		if (typeof response === typeof {}) {
		// 			this.setState({ results: response });
		// 			//console.log(this.state);
		// 		} else {
		// 			this.setState({ results: [] });
		// 		}
		// 	})
		// 	.catch(error => console.error("Error:", error));
	};

	render() {
		// if (!this.state.results) return <p className="p-5">Loading...</p>;
		console.log("Results: ", this.state.results);

		let { results } = this.state;
		console.log(results);

		return (
			<div className="container">
				<div className="row mt-5">
					<div className="col-6">
						<img
							src="https://lumiere-a.akamaihd.net/v1/images/vicruls-sythe-main_e404bc44.jpeg"
							className="w-100"
						/>
					</div>
					<div className="col-6">
						<div className="text-center text-light m-3">
							<h2>{results ? results[0].propvalue : "Name"}</h2>
							<p>{results ? results[9].propvalue : "Films"}</p>
						</div>
					</div>
				</div>
				<div className="row ml-1 mr-1 background border-top border-light">
					<div className="col-12 d-flex justify-content-between text-light text-center">
						<div className="appearances p-2 m-3">
							<h6>Name</h6>
							<p />
						</div>
						<div className="affiliations m-3 p-2">
							<h6>{results ? results[6].propname : "Attribute"}</h6>
							<p className="text-center">{results ? results[6].propvalue : "..."}</p>
						</div>
						<div className="locations p-2 m-3">
							<h6>Gender</h6>
							<p />
						</div>
						<div className="gender p-2 m-3">
							<h6>Height</h6>
							<p />
						</div>
						<div className="dimensions p-2 m-3">
							<h6>Skin Color</h6>
							<p className="text-center" />
						</div>
						<div className="species p-2 m-3">
							<h6>Eye Color</h6>
							<p />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Details.propTypes = {
	match: PropTypes.object,
	location: PropTypes.object,
	name: PropTypes.string,
	results: PropTypes.object
};
