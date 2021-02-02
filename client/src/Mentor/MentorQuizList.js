/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../GeneralPages/Button";
import MentorStyle from "./MentorStyle";


const MentorQuizList = (props) => {

	const mentorEmail = props.location.state.mentorEmail;
	const [quizList, setQuizList] = useState([]);
	const [quizId, setQuizId] = useState(0);

	useEffect(() => {
		fetch("https://cyf-team-starship-quiz-app.herokuapp.com/api/quizlist")
			.then((data) => data.json())
			.then((jsonData) => setQuizList(jsonData))
			.catch((e) => console.log(e));
	}, []);

	function handleChange(e) {
		setQuizId(e.target.value);
	}


	return (
		<div>
			<MentorStyle />
			<div>
				<div className="quiz-selector">
					<select name="id" className="form-select form-select-lg mb-3" onChange={handleChange}>
						<option>Select a quiz from the list...</option>
						{quizList.map((q) => {
							return (
								<option key={q.id} value={q.id}>
									{q.quiz_name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="mentor-buttons">
					<Link className="mentor-link" to={{
						pathname: "/mentorresults",
						state: { quizId, mentorEmail },
					}}>
						<Button buttontext="See the quiz results" />
					</Link>
				</div>
				<div className="mentor-buttons button-padding">
					<Link className="mentor-link" to={{
						pathname: "/mentorpage",
						state: { mentorEmail },
					}}>
						<Button buttontext="Go back to Mentor Page" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MentorQuizList;