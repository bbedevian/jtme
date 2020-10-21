// React Imports
import React, { useState } from "react";
import "./JobRow.scss";
import EditRow from "../EditRow/EditRow";
import EditButton from "../EditButton/EditButton";

//redux imports
import { connect } from "react-redux";
import { selectJob } from "../../redux/jobs/jobs.actions";

//bootstrap imports

function JobRow(props) {
	const [showEditBtn, setShowEditBtn] = useState(false);
	const { company, jobTitle, lastContacted, status } = props.job;
	let contactDate = lastContacted.split("-");
	let year = contactDate[0];
	let month = contactDate[1];
	let day = contactDate[2];

	const showModalWithSelectedJob = () => {
		props.selectJob(props.job);
		props.handleOpen();
	};

	return (
		<>
			<tr
				className="jobRow"
				onMouseEnter={() => setShowEditBtn(true)}
				onMouseLeave={() => setShowEditBtn(false)}
				onClick={() => showModalWithSelectedJob(props)}
			>
				<td>{company}</td>
				<td>{jobTitle}</td>
				<td>{month + "/" + day + "/" + year}</td>
				<td>{status}</td>
				<td className="table-testing">
					<EditButton show={showEditBtn} />
				</td>
			</tr>
		</>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	selectJob: (job) => dispatch(selectJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobRow);
