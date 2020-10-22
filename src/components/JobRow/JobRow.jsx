// React Imports
import React, { useState } from "react";
import "./JobRow.scss";
import EditRow from "../EditRow/EditRow";
import EditButton from "../EditButton/EditButton";

//redux imports
import { connect } from "react-redux";
import { selectJob } from "../../redux/jobs/jobs.actions";

//bootstrap imports
import Form from 'react-bootstrap/Form'

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

	const clickEditButton = () => {
		props.selectJob(props.job);
	}

	let tableRow;
	if(props.selectedJob && props.job.id === props.selectedJob.id){
		tableRow = 
		<>
			<EditRow setShowEditBtn={setShowEditBtn} showEditBtn={showEditBtn} selectedJob={props.selectedJob}/>
		</>
	} else {
		tableRow = 
		<>
			<tr
				className="jobRow"
				onMouseEnter={() => setShowEditBtn(true)}
				onMouseLeave={() => setShowEditBtn(false)}
				// onClick={() => showModalWithSelectedJob(props)}
			>	
				<td onClick={() => showModalWithSelectedJob(props)}>{company}</td>
				<td onClick={() => showModalWithSelectedJob(props)}>{jobTitle}</td>
				<td onClick={() => showModalWithSelectedJob(props)}>{month + "/" + day + "/" + year}</td>
				<td onClick={() => showModalWithSelectedJob(props)}>{status}</td>
				<td className="table-testing" onClick={() => clickEditButton()}>
					<EditButton show={showEditBtn} />
				</td>
			</tr>
		</>
	}

	return (
		<>
		{tableRow}
		</>
	);
}

const mapStateToProps = (state) => ({
	selectedJob: state.jobs.selectedJob
});

const mapDispatchToProps = (dispatch) => ({
	selectJob: (job) => dispatch(selectJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobRow);
