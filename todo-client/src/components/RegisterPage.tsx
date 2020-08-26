import React, { ChangeEvent, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from './../store/actions';
import { User, RegisterPayload, RegisterModel } from '../models';
import { TodoAppState } from '../store/reducer';


interface DispatchProps {
    register: typeof register
}
interface StoreState {
    user: User,
    loggedIn: boolean,
    loading: boolean
}

interface LocalState {
    [key: string]: any;
    username: string,
    password: string,
    firstName: string,
    submitted: boolean
}

type Props = DispatchProps & StoreState & LocalState & RouteComponentProps;
class LoginPage extends React.Component<Props, LocalState> {
    constructor(props:any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, firstName } = this.state;
        const {history} = this.props;
        if (username && password) {
            const registerModel: RegisterModel ={
                username,
                password,
                firstName,
            }
            const payload: RegisterPayload ={
                payload: registerModel,
                history
            }
            this.props.register(payload);
        }
    }

    render() {
        const { loading } = this.props;
        const { username, password, firstName, submitted } = this.state;
        return (
            <div>
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                        <span data-error="wrong" >First Name is required</span>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <span data-error="wrong" >Username is required</span>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <span data-error="wrong" style={{textDecorationColor: 'red'}} >Password is required</span>
                        }
                    </div>
                    <div className="form-group">
                        <button className="waves-effect waves-light blue darken-1 btn">Register</button>
                        {loading &&
                            <>ŁADOWANIE</>
                        }
                        <Link to="/" className="waves-effect waves-light green darken-1 btn">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state: TodoAppState, props: any){
    return {
        loading: state.loading
    }
}
const container = connect(
    mapStateToProps,
    {
    register
}
)(LoginPage)

export default container;