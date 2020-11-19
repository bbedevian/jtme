import React, { useState } from "react";
import "./FeedbackForm.scss";
import { sendFeedback } from "../../firebase/firebase.utils";

//bootstrap imports
import { Form, Button } from "react-bootstrap";
import { ArrowUpCircle, ArrowDownCircle } from "react-bootstrap-icons";

const FeedbackForm = (props) => {
	const [feedback, setFeedback] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		sendFeedback(feedback);
		setFeedback("");
	};
	return (
		<div className="feedback-div">
			<div 
			className="feedback-header"
			onClick={() => props.handleDisplay()}>
				Give Us Feedback { props.isOpen? <ArrowUpCircle /> : <ArrowDownCircle />}
			</div>
			{props.isOpen && (
				<Form onSubmit={handleSubmit} className="feedback-content">
					<Form.Control
						name="feedback"
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						as="textarea"
						rows="5"
					/>
					<Button type="submit" className="feedback-btn" variant="success">
						Send Feedback
					</Button>
				</Form>
			)}
		</div>
	);
};

export default FeedbackForm;
