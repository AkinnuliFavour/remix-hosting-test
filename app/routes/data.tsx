import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, json } from "@remix-run/react";
// import { FIREBASE_FUNCTIONS_URL } from "../utils/firebase.server";

type DataItem = {
	data: {
		id: string;
		name: string;
		description: string;
	}[];
};

export const loader = async () => {
	const response = await fetch(
		"https://us-central1-fir-queuepay.cloudfunctions.net/getData"
	);
	// const { data } = await response.json();
	return response;
};

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const response = await fetch(
		`https://us-central1-fir-queuepay.cloudfunctions.net/addData`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);
	return response;
}

export default function DataRoute() {
	const { data } = useLoaderData<DataItem>();

	console.log(data);

	return (
		<div className="w-screen h-screen text-black bg-blue-200 flex flex-col justify-center items-center">
			<h1 className="tetx-2xl font-bold mb-2">Data from Firebase</h1>

			{/* Display data */}
			<ul>
				{data.map((item) => (
					<li className="flex gap-4" key={item.id}>
						<p>{item.name}</p>
						<span>{item.description}</span>
					</li>
				))}
			</ul>

			{/* Form to add data */}
			<Form
				method="post"
				className="flex justify-center items-center flex-col mt-8 mb-4"
			>
				<h2 className="text-xl font-bold mb-2 text-center">Add new Data</h2>
				<input
					type="text"
					name="name"
					placeholder="Name"
					className="mb-2 px-3 py-2"
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					className="mb-4 px-3 py-2"
				/>
				<button type="submit" className="bg-blue-400 p-2 rounded-md">
					Add Data
				</button>
			</Form>
		</div>
	);
}
