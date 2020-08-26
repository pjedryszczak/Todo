import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ComponentProps {
    loggedIn: boolean;
    component: any;
    path: string;
    exact?: boolean;
}
interface LocalProps { }
interface StateProps { }
interface DispatchProps { }
type Props = ComponentProps & LocalProps & StateProps & DispatchProps;

export function AuthorizedRoute(props: Props) {

    const { loggedIn, component, ...rest } = props;
    const Component = component; 

    const defineRoute = (routeProps: any) => {

        return loggedIn ? (
            <Component {...routeProps} />
        ) : (
                <Redirect to={{pathname: '/' }} />
            );
    };

    return <Route {...rest} render={defineRoute} />;
}

const container = AuthorizedRoute;
export default container;