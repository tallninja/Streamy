import React from 'react';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onFormSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        // console.log(this.props)
        // console.log(this.props.stream)
        if(this.props.stream){
            return (
                <div>
                    <h3>Edit Stream</h3>
                    <StreamForm
                        initialValues={{
                            title: this.props.stream.title,
                            description: this.props.stream.description
                        }} // we do not want to edit the userId and the stream id
                        onSubmit={this.onFormSubmit}
                    />
                </div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = (state, newProps) => {
    return { stream: state.streams[newProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);