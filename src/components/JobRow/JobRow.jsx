// React Imports
import React, { useState } from "react";
import "./JobRow.scss";
import JobDetailModal from "../JobDetailModal/JobDetailModal";
import EditRow from "../EditRow/EditRow";

//redux imports
import { connect } from 'react-redux'
import { selectJob } from '../../redux/jobs/jobs.actions'


//bootstrap imports

function JobRow(props) {
	const [modalShow, setModalShow] = useState(false);
	const { jobId, company, jobTitle, lastContacted, status } = props.job
	let contactDate = lastContacted.split('-')
	let year = contactDate[0]
	let month = contactDate[1]
	let day = contactDate[2]

	const showModalWithSelectedJob = () => {
		props.selectJob(props)
		props.handleOpen()
	}

	return (
		<>
			<tr className="jobRow"  onClick={() => showModalWithSelectedJob(props)}>
						<td>{company}</td>
						<td>{jobTitle}</td>
						<td>{month + '/' + day + '/' + year}</td>
						<td>{status}</td>
					</tr>
		</>
	);
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
	selectJob: (job) => dispatch(selectJob(job))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobRow);
