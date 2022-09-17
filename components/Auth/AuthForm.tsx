import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';
import { Credentials } from '../../types/credentials';
import { CredentialsInvalid } from '../../types/credentialsInvalid';

type InputType = 'email' | 'confirmEmail' | 'password' | 'confirmPassword'

interface AuthFormProps {
    isLogin?: boolean;
    onSubmit: (credentials: Credentials) => void;
    credentialsInvalid: CredentialsInvalid;
}

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) => {
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState<string>('');
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState<string>('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch
    } = credentialsInvalid;

    function updateInputValueHandler(inputType: InputType, enteredValue: string) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label='Email Address'
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType='email-address'
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label='Confirm Email Address'
                        onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
                        value={enteredConfirmEmail}
                        keyboardType='email-address'
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label='Password'
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label='Confirm Password'
                        onUpdateValue={updateInputValueHandler.bind(
                            this,
                            'confirmPassword'
                        )}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12
    },
    form: {}
});
