import React from 'react';
import { connect } from 'react-redux'

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    render() {
        
        const actions = (
            <React.Fragment>
                <button
                    className="ui button primary"
                    onClick={() => this.props.deleteStream(this.props.match.params.id)}>
                    <i className="ui icon trash" />
                    Delete
                </button>

                <button className="ui button" onClick={() => history.push('/')}>Cancel</button>
            </React.Fragment>
        )
        
        if(this.props.stream){
            return (
                <div>
                    <Modal
                        title="Delete Stream"
                        content={`Are you sure you want to delete ${this.props.stream.title} ?`}
                        actions={actions}
                        onDismiss = {() => history.push('/')}
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

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);