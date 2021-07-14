import React from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDropdown: false
		};
	}

	render() {
		let show = "";
		if (this.state.clickedDropDown) show = "show";
		return (
			<nav className="navbar navbar-light header d-flex justify-content-between">
				<Context.Consumer>
					{({ actions, store }) => (
						<div className="container">
							<Link className="navbar-brand text-white" to="/">
								<img
									src="https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/cfd241b0-85a3-4363-87b1-51c6732af3fd"
									height="100px;"
									width="auto;"
								/>
							</Link>
							{store.user ? (
								<>
									<h2 className="faves btn btn-lg btn-outline-dark nav-link"> Hello {store.user} </h2>
									<Link to="/home">
										<button
											className="faves px-5 btn btn-lg btn-outline-dark nav-link"
											onClick={() => actions.setUser("")}>
											LOG OUT
										</button>
									</Link>
								</>
							) : (
								<Link to="/login">
									<button className="faves px-5 btn btn-lg btn-outline-dark nav-link">LOG IN</button>
								</Link>
							)}
							<div className={"nav-item dropdown " + (this.state.showDropdown ? "show" : "")}>
								<button
									className="faves px-3 btn btn-lg btn-outline-dark nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded={this.state.clickedDropDown}
									onClick={() =>
										this.setState({
											clickedDropDown: !this.state.clickedDropDown
										})
									}>
									FAVORITES <span className="badge badge-secondary">{store.favorites.length}</span>
								</button>
								<div
									className={store.favorites.length > 0 ? "dropdown-menu " + show : "d-none"}
									aria-labelledby="navbarDropdown">
									{store.favorites.length > 0
										? store.favorites.map((elm, index) => (
												<li
													key={index}
													className="dropdown-item d-flex align-items-center justify-content-between">
													<Link
														to={{
															pathname: `/details/${index + 1}`,
															state: elm
														}}>
														{elm.name}
													</Link>
													&nbsp;&nbsp;
													<i
														className="fas fa-backspace"
														onClick={() => actions.deleteFavorite(elm)}
													/>
												</li>
										  ))
										: null}
								</div>
							</div>
						</div>
					)}
				</Context.Consumer>
			</nav>
		);
	}
}
Navbar.propTypes = {
	index: PropTypes.number,
	history: PropTypes.object
};
