import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import { Auth } from '../types/auth';
import { login } from '../api/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

const LoginScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const authCtx = useContext(AuthContext);

    const loginHandler = async ({ email, password }: Auth) => {
        setIsAuthenticating(true);
        try {
            const data = await login(email, password);
            authCtx.authenticate(data.idToken);
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not login. Please check your credentials!'
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message='Logging you in...' />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
