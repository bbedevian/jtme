import React, { Component } from 'react';

class AddJob extends Component {

    state = {
        company: '',
        status: '',
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='add-job'>
                <form>
                    <input/>
                </form>
            </div>
        );
    }
}

export default AddJob;

