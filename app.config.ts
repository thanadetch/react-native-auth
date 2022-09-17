import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
    ...config,
    extra: {
        // firebase api key
        API_KEY: '<API_KEY>',
        BASE_URL: 'https://identitytoolkit.googleapis.com/v1/accounts',
        // firebase db url
        FIRE_BASE_URL: '<FIRE_BASE_URL>'
    }
});
