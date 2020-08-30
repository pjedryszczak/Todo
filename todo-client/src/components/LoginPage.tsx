import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout, clearUser } from './../store/actions';
import { User, LoginModel, LoginPayload } from '../models';
import { TodoAppState } from '../store/reducer';
import { RouteComponentProps } from 'react-router';
import { sanitizeInput } from '../helpers';

interface DispatchProps {
    login: typeof login,
    logout: typeof logout,
    clearUser: typeof clearUser
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
    submitted: boolean,
    pushHome: boolean
}

type Props = DispatchProps & StoreState & LocalState & RouteComponentProps;
class LoginPage extends React.Component<Props, LocalState> {
    constructor(props:any) {
        super(props);

        this.props.clearUser();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            pushHome: false
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
        const { username, password } = this.state;
        const { history } = this.props;
        if (username && password) {
            const loginPayload: LoginModel ={
                username,
                password,
            }
            const sagaPayload: LoginPayload = {
                payload: loginPayload,                
                history
            }
            this.props.login(sagaPayload);
        }
    }
    handleKeyDown(e: any) {
        sanitizeInput(e);
    }

    render() {
        const { loading } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form className="col 12" name="form" onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <span data-error="wrong" >Usarname is required</span>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <span data-error="wrong" >Password is required</span>
                        }
                    </div>
                    <div className="form-group">
                        <button className="waves-effect waves-light blue darken-1 btn">Login</button>
                        {loading &&
                            
                           <>ŁADOWANIE</>
                        }
                        <Link to="/register" className="waves-effect waves-light green darken-1 btn">Register</Link>
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
    login,
    logout,
    clearUser
}
)(LoginPage)

export default container;