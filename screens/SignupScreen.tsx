import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../api/auth';
import { Auth } from '../types/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

const SignupScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const authCtx = useContext(AuthContext);

    const signupHandler = async ({ email, password }: Auth) => {
        setIsAuthenticating(true);
        try {
            const data = await createUser(email, password);
            authCtx.authenticate(data.idToken);
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not create user. Please check your input and try again later.'
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message='Creating user...' />;
    }

    return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
