import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = (meta) => {
        if(meta.touched){
            return (
                <div className="ui error message">
                    {meta.error}
                </div>
            );
        } else {
            return null
        }
    }

    renderInput =(fieldProps) => {
        const className = `field ${fieldProps.meta.error && fieldProps.meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{fieldProps.label}</label>
                <input {...fieldProps.input}/>
                {this.renderError(fieldProps.meta)}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className="ui form error" autoComplete="off"> 
                <Field name='title' component={this.renderInput} label="Enter Title" />
                <Field name='description' component={this.renderInput} label="Enter Description" />
                <button className="ui green button">Submit</button>
            </form>
        );
    }
}

const formValidate = (formFields) => {
    let error = {}
    if(!formFields.title) error.title = 'Tittle cannot be blank !';
    if(!formFields.description) error.description = 'Please fill in the description';
    return error
}

export default reduxForm({
    form: 'streamForm',
    validate: formValidate
})(StreamForm);

