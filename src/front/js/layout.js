import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import injectContext from "./store/appContext";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { Details } from "./views/details";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

//create your first component
class Layout extends React.Component {
	constructor() {
		super();
		this.basename = process.env.BASENAME || "";
		this.state = {
			characters: [],
			planets: []
		};
	}

	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/

	render() {
		return (
			<div className="d-flex flex-column h-100">
				<BrowserRouter basename={this.basename}>
					<ScrollToTop>
						<Navbar />
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/home">
								<Home />
							</Route>
							<Route exact path="/demo">
								<Demo />
							</Route>

							<Route path="/details/:id" component={Details} />

							<Route path="/planet_details" component={PlanetDetails} />

							<Route exact path="/single/:theid">
								<Single />
							</Route>
							<Route>
								<h1>Not found!</h1>
							</Route>
						</Switch>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</div>
		);
	}
}

export default injectContext(Layout);
