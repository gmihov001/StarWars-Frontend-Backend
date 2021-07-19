const getState = ({ getStore, setStore }) => {
	return {
		store: {
			api_address: "https://3001-violet-octopus-gfad7ujl.ws-us10.gitpod.io/api",
			user: "",
			favorites: []
		},
		actions: {
			setUser: username => {
				setStore({ user: username });
				return true;
            },
            login: (password, email) => {
                fetch(getStore().api_address + '/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(token => {
                    if(typeof token.msg != "undefined"){
                        throw new Error(token.msg);
                    } else {
                        setStore({ token: token.access_token });
                    }

                })
                .catch(err => prompt(err));
            },
			loadPeople: () => {
				fetch("https://swapi.dev/api/people/")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log("data", data);
						setStore({ characters: data.results });
					});
			},
			loadPlanets: () => {
				fetch("https://swapi.dev/api/planets/")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log("data", data);
						setStore({ planets: data.results });
					})
					.catch(error => console.log(error));
			},

			loadFavorites: () => {
				fetch(getStore().api_address + "/" + getStore().user + "/favorites")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log("data", data);
						setStore({ favorites: data.favorites });
					})
					.catch(error => console.log(error));
			},

			emptyFavorites: () => {
				setStore({ favorites: [] });
			},

			// //Add favorite without fetch/backend:
			// addToFavorites: entity => {
			// 	console.log("Entity: ", entity);

			// 	var tempStore = getStore();
			// 	if (!tempStore.favorites.includes(entity)) {
			// 		tempStore.favorites.push(entity);
			// 		setStore({ tempStore });
			// 	}
			// },

			// //Add favorite with fetch/backend:
			addToFavorites: newFave => {
				console.log("newFave", newFave);
				if (!getStore().favorites.includes(newFave)) {
					let url =
						newFave.entityType == "person"
							? getStore().api_address + "/favorite/people/"
							: getStore().api_address + "/favorite/planets/";

					fetch(url + (newFave.index + 1), {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: newFave.entity.name,
							url: newFave.entity.url,
							username: getStore().user
						})
					})
						.then(response => {
							return response.json();
						})
						.then(resp_body => {
							setStore({ favorites: resp_body.favorites });
						})
						.catch(err => console.log(err));
				}
			},
			// //Delete favorite without backend/fetch
			// deleteFromFavorites: elm => {
			// 	console.log(elm);

			// 	var { favorites } = getStore();
			// 	let newFavorites = favorites.filter(f => f.name != elm.entity.name);
			// 	console.log(newFavorites);

			// 	setStore({
			// 		favorites: newFavorites
			// 	});
			// },
			//
			// //Delete favorite with backend/fetch
			deleteFavorite: element => {
				console.log("element", element);
				let url =
					element.entity_type == "person"
						? getStore().api_address + "/favorite/people/"
						: getStore().api_address + "/favorite/planets/";

				fetch(url + element.entity_id, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: getStore().user
					})
				})
					.then(response => {
						return response.json();
					})
					.then(resp_body => {
						setStore({ favorites: resp_body.favorites });
					})
					.catch(err => console.log(err));
			},
			//
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
