import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

const App = () => {
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://localhost:8080/');
			const data = await response.json();

			try {
				console.log(data);
				setLoading(false);
				setRecipe(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
	}, []);

	const [recipe, setRecipe] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<Fragment>
			<header>
				<h1>My Recipe List: React Front End</h1>
				<a href="http://localhost:8080">View All Recipe</a>
				<a href="http://localhost:8080/add-recipe">Add New Recipe &#x27A2;</a>
			</header>

			<div className="container">
				{loading ? (
					<div>
						<p>No data to load</p>
					</div>
				) : (
					<div>
						{recipe.map((data) => (
							<div key={data._id}>
								<main>
									<ul className="recipe">
										<li>
											<img src={data.image} alt={data.name} className="recipe-img" />
										</li>
										<li>
											<h1>{data.name}</h1>
										</li>

										<li>
											<a href={data._id}>View Recipe &#x21DB;</a>
										</li>
									</ul>
								</main>
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div>
				<h1>Add New Recipe</h1>
				<form method="POST" action="http://localhost:8080/add-recipe">
					<div>
						<label>Name</label>
						<input type="text" name="name" required />
					</div>
					<div>
						<label>Image</label>
						<input type="text" name="image" required />
					</div>
					<div>
						<label>Description</label>
						<input type="text" name="description" required />
					</div>

					<div>
						<button type="submit">Add Recipe</button>
					</div>
				</form>
			</div> */}
		</Fragment>
	);
};

export default App;
