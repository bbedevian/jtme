import React, { useState } from "react";
import "./JobRow.scss";
import JobDetailModal from "../JobDetailModal/JobDetailModal";
import EditButton from "../EditButton/EditButton"
import EditRow from "../EditRow/EditRow";

//bootstrap imports

function JobRow(props) {
	const [modalShow, setModalShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false)
	const [editing, setEditing] = useState(true)

	let row;
	if(editing){
		row = <EditRow companyName={props.companyName} jobTitle={props.jobTitle} lastContacted={props.lastContacted} status={props.jobStatus}/>
	} else {
		row = (
			<>
				<tr onMouseEnter={() => setShowEdit(true)} onMouseLeave={()=> setShowEdit(false)} class="jobRow"  onClick={() => setModalShow(true)}>
						<td><EditButton show={showEdit}/>{props.companyName}</td>
						<td>{props.jobTitle}</td>
						<td>{props.lastContacted}</td>
						<td>{props.jobStatus}</td>
					</tr>
					<JobDetailModal
						jobTitle={props.jobTitle}
						companyName={props.companyName}
						show={modalShow}
						onHide={() => setModalShow(false)}
					></JobDetailModal>
			</>
		)
	}

	return (
		<>
			{row}
		</>
	);
}

export default JobRow;
