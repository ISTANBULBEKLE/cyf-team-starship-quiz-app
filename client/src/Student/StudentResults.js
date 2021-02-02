/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../GeneralPages/Button";
import StudentStyle from "./StudentStyle";


const StudentResults = (props) => {

	const studentId = props.location.state.studentId;
	const studentName = props.location.state.studentName;
	let [results, setResults] = useState([]);

	useEffect(() => {
		fetch(`https://cyf-team-starship-quiz-app.herokuapp.com/api/studentresults/student/${studentId}`)
			.then((data) => data.json())
			.then((jsonData) => setResults(jsonData))
			.catch((e) => console.log(e));
	}, [studentId]);


	return (
		<div className="container">
			<StudentStyle />
			<div className="student-results">
				<h2>Your quiz results:</h2>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Quiz Name</th>
								<th scope="col">Score</th>
							</tr>
						</thead>
						<tbody>
							{
								results.map((r) => {
									return (
										<tr key={r.id}>
											<td>{r.quiz_name}</td>
											<td>{r.score}</td>
										</tr>);
								})
							}
						</tbody>
					</table>
				</div>
			</div>
			<div className="student-buttons button-padding">
				<Link className="student-link" to = {{
					pathname: "/studentpage",
					state: { studentId, studentName },
				}}
				>
					<Button buttontext ='Go back to Student Page' />
				</Link>
			</div>
		</div>
	);
};

export default StudentResults;