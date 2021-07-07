const getState = ({ getStore, setStore }) => {
	return {
		store: {
			user: null,
			favorites: []
		},
		actions: {
			setUser: username => {
				setStore({ user: username });
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
			addToFavorites: entity => {
				console.log("Entity: ", entity);

				var tempStore = getStore();
				if (!tempStore.favorites.includes(entity)) {
					tempStore.favorites.push(entity);
					setStore({ tempStore });
				}
			},
			deleteFromFavorites: elm => {
				console.log(elm);

				var { favorites } = getStore();
				let newFavorites = favorites.filter(f => f.entity.name != elm.entity.name);
				console.log(newFavorites);

				setStore({
					favorites: newFavorites
				});
			},
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
