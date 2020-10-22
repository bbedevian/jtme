import React from 'react'
import SaveJobChangesButton from '../SaveJobChangesButton/SaveJobChangesButton'
import './EditRow.scss'

//component imports
import SaveButton from '../SaveButton/SaveButton'
import DiscardChangesButton from '../DiscardChangesButton/DiscardChangesButton'

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

   render(){
      const { company, jobTitle, lastContacted, status} = this.state
      console.log('this.props', this.props)
      return(
         <tr
				className="jobRow"
				onMouseEnter={() => this.props.setShowEditBtn(true)}
				onMouseLeave={() => this.props.setShowEditBtn(false)}
			>	
				<td><Form.Control type="text" value={company}></Form.Control></td>
				<td><Form.Control type="text" value={jobTitle}></Form.Control></td>
				<td><Form.Control type='date' value={lastContacted}></Form.Control></td>
				<td><Form.Control as='select' value={status}>
               <option value="saved">Saved</option>
               <option value="applied">Applied</option>
               <option value="interviewing">Interviewing</option>
               <option value="closed">Closed</option>
               </Form.Control></td>
				<td className="table-testing">
               <SaveButton/>
               <DiscardChangesButton />
               
				</td>
			</tr>
      )
   }
}

export default EditRow;