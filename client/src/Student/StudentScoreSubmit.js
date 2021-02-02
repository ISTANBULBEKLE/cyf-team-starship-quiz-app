/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Button from "../GeneralPages/Button";
import { Link } from "react-router-dom";
import StudentStyle from "./StudentStyle";


const StudentScoreSubmit = (props) => {

	const studentId = props.location.state.studentId;
	const studentName = props.location.state.studentName;
	const [studentResult, setStudentResult] = useState(["result"]);

	async function getScore() {
		await fetch(`https://cyf-team-starship-quiz-app.herokuapp.com/api/studentresults/${studentId}`)
			.then((data) => data.json())
			.then((jsonData) => setStudentResult([jsonData[0].score, jsonData[0].quiz_length]))
			.catch((e) => console.log(e));
	}

	getScore();

	return (
		<div>
			<StudentStyle />
			<h1 className="student-header">Your score is: {studentResult[0]} / {studentResult[1]}</h1>
			<div className="student-buttons">
				<Link className="student-link" to={{
					pathname: "/studentpage",
					state: { studentId, studentName },
				}}>
					<Button buttontext="Go back to Student Page" />
				</Link>
			</div>
		</div>
	);
};

export default StudentScoreSubmit;