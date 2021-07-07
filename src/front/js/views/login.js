import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Login = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron w-50 mt-5 mx-auto bg-dark learn-more">
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">USERNAME</label>
					<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">PASSWORD</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">EMAIL</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<small id="emailHelp" className="form-text text-light">
						ONLY TO REGISTER
					</small>
				</div>

				<button type="submit" className="btn btn-primary">
					LOG IN
				</button>
			</form>
		</div>
	);
};

Login.propTypes = {
	match: PropTypes.object
};
