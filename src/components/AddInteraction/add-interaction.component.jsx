import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addInteractionToJob} from '../../firebase/firebase.utils'

//BootStrap Imports
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//css import
import './add-interaction.scss'

class AddInteraction extends Component {

    state = {
        type: '',
        nextSteps: ''
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        addInteractionToJob(this.state)
        this.setState({
            type: '',
            nextSteps: ''
        })
    }

    render() {
        const {type, nextSteps } = this.state
        return (
            <Container className='add-interaction'>
            <h3>Add an interaction to {this.props.selectedJob.company}</h3>
                <Form id='add-interaction-form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="interactionForm">
                        <Form.Label>Type:</Form.Label>
                        <Form.Control name="type" as="select" value={type} onChange={this.handleChange} >
                            <option disabled defaultValue></option>
                            <option value="emailed">Emailed</option>
                            <option value="call">Call</option>
                            <option value="code challenge">Code challenge</option>
                            <option value="interviewed">Interviewed</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="interactionForm">
                        <Form.Label>Next Steps</Form.Label>
                        <Form.Control name='nextSteps' value={nextSteps} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant='success' type='submit'>Add</Button>
                </Form>
            </Container>
        ); 
    }
}

const msp = ({jobs}) => ({
    selectedJob: jobs.selectedJob
})

export default connect(msp)(AddInteraction);

