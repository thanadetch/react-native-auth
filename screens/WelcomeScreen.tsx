import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { getMessage } from '../api/message';
import { AuthContext } from '../store/auth-context';

const WelcomeScreen = () => {
    const [fetchedMessage, setFetchedMessage] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) getMessage().then((message) => setFetchedMessage(message));
    }, []);

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    }
});
