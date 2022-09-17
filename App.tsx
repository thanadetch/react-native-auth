import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './constants/styles';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types/rootStackParamList';
import { AuthContext, AuthContextProvider } from './store/auth-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 }
            }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
    );
};

const AuthenticatedStack = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 }
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{
                headerRight: ({ tintColor }) => (
                    <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />
                )
            }} />
        </Stack.Navigator>
    );
};


const Navigation = () => {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
};

const Root = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) authCtx.authenticate(storedToken);
        setIsTryingLogin(false);
    };

    useEffect(() => {
        fetchToken();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (!isTryingLogin) await SplashScreen.hideAsync();
    }, [isTryingLogin]);

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Navigation />
        </View>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}
