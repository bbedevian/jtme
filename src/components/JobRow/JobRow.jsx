import React, { useState } from "react";
import "./JobRow.scss";
import JobDetailModal from "../JobDetailModal/JobDetailModal";
import EditRow from "../EditRow/EditRow";

//bootstrap imports

function JobRow(props) {
	const [modalShow, setModalShow] = useState(false);
	return (
		<>
			<tr className="jobRow"  onClick={() => setModalShow(true)}>
						<td>{props.companyName}</td>
						<td>{props.jobTitle}</td>
						<td>{props.lastContacted}</td>
						<td>{props.jobStatus}</td>
					</tr>
					<JobDetailModal
						job={props}
						// jobId={props.jobId}
						// jobTitle={props.jobTitle}
						// companyName={props.companyName}
						// lastContacted={props.lastContacted}
						// jobStatus={props.jobStatus}
						show={modalShow}
						onHide={() => setModalShow(false)}
					></JobDetailModal>
		</>
	);
}

export default JobRow;
