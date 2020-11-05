import React from 'react'
import './EditRow.scss'


//redux imports
import {connect} from 'react-redux'
import { removeSelectedJob } from '../../redux/jobs/jobs.actions'

//component imports
import SaveButton from '../SaveButton/SaveButton'
import DiscardChangesButton from '../DiscardChangesButton/DiscardChangesButton'
import DeleteButton from '../DeleteButton/DeleteButton'

//firebase imports
import {updateJob} from '../../firebase/firebase.utils'

//bootstrap imports
import Form from 'react-bootstrap/Form'

class EditRow extends React.Component{
   state = {
      company: '',
      jobTitle: '',
      lastContacted: '',
      status: '',
   }

   componentDidMount(){
      const { company, jobTitle, lastContacted, status} = this.props.selectedJob
      this.setState({
         company, jobTitle, lastContacted, status
      })
   }
   handleChange = e => {
      const {name, value} = e.target
      this.setState({[name]: value})
   }

   handleEditSubmit = () => {
      let modal = false
		const {company, jobTitle, lastContacted, status} = this.state
      const job = {company, jobTitle, lastContacted, status} 
      updateJob(job, modal)
   }

   render(){
      const { company, jobTitle, lastContacted, status} = this.state
      const {handleEditSubmit, handleChange} = this
      return(
         <tr
				className="jobRow"
			>	
				<td><Form.Control onChange={handleChange} name='company' type="text" value={company}></Form.Control></td>
				<td><Form.Control onChange={handleChange} name='jobTitle' type="text" value={jobTitle}></Form.Control></td>
				<td><Form.Control onChange={handleChange} name='lastContacted' type='date' value={lastContacted}></Form.Control></td>
				<td><Form.Control onChange={handleChange} name="status" as='select' value={status}>
               <option value="saved">Saved</option>
               <option value="applied">Applied</option>
               <option value="interviewing">Interviewing</option>
               <option value="closed">Closed</option>
               </Form.Control></td>
				<td className="table-testing">
               <SaveButton onClick={handleEditSubmit}/>
               <DiscardChangesButton onClick={this.props.removeSelectedJob} />
               <DeleteButton/>
				</td>
			</tr>
      )
   }
}
function mapDispatchToProps(dispatch) {
   return {
      removeSelectedJob: () => dispatch(removeSelectedJob())
   }
}


export default connect(null, mapDispatchToProps)(EditRow);