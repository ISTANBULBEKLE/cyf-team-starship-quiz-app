/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../GeneralPages/Button";
import MentorStyle from "./MentorStyle";


const MentorResults = (props) => {

	const mentorEmail = props.location.state.mentorEmail;
	const quizId = props.location.state.quizId;
	const [results, setResults] = useState([]);
	const [search, setSearch]= useState("");

	useEffect(() => {
		fetch(`https://cyf-team-starship-quiz-app.herokuapp.com/api/mentorresults/${quizId}`)
			.then((data) => data.json())
			.then((jsonData) => setResults(jsonData))
			.catch((e) => console.log(e));
	}, [quizId]);

	function handleChange(e) {
		setSearch (
			results.filter((student) =>
				student.student_name.toLowerCase().includes(e.target.value)
			)
		);
	}


	return (
		<div className="container">
			<MentorStyle />
			<div className="mentor-results">
				<h2>Students quiz results:</h2>
				<p>Results are in reverse order, lowest score first.</p>
				<div className="mentor-results-search">
					<label htmlFor="student-filter">Search for student name:</label>
					<input type="text" className="form-control" name="student-filter" onChange={handleChange} required />
				</div>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Quiz Name</th>
								<th scope="col">Student Name</th>
								<th scope="col">Student Score</th>
							</tr>
						</thead>
						<tbody>
							{search ? (search.map((r) => {
								return (
									<tr key={r.id}>
										<td>{r.quiz_name}</td>
										<td>{r.student_name}</td>
										<td>{r.score}</td>
									</tr>
								);
							})
							) : (results.map((r) => {
								return (
									<tr key={r.id}>
										<td>{r.quiz_name}</td>
										<td>{r.student_name}</td>
										<td>{r.score}</td>
									</tr>
								);
							})
							)}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mentor-buttons button-padding">
				<Link className="mentor-link" to={{
					pathname: "/mentorpage",
					state: { mentorEmail },
				}}>
					<Button  buttontext="Go back to Mentor Page" />
				</Link>
			</div>
		</div>
	);
};

export default MentorResults;