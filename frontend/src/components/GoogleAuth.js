import React from 'react';
import { connect } from 'react-redux'

import { signIn, signOut } from '../actions';

const clientId = '735401503502-9dchnn2bdl7crqbcj0al09gjsd6d7isf.apps.googleusercontent.com'

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthHandler(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthHandler)
            });
        });
    }

    onAuthHandler = (isSignedIn) => {
        if(isSignedIn){
            return this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            return this.props.signOut();
        }
    }

    onSignInClick = () => this.auth.signIn();

    onSignOutClick = () => this.auth.signOut();

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return (
                <button className="ui basic button">
                    <div className="ui active inline tiny loader"></div>
                </button>
            );
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui green button">
                    <i className="ui google icon" />
                    Sign Out
                </button>
            );
        } else {
            return  (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="ui google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

