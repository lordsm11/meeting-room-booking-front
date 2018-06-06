import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import App from './components/App';

import LanguageProvider from './components/containers/LanguageProvider';
import { translationMessages } from './i18n';

render(
    <Provider store={store}>
        <LanguageProvider messages={translationMessages} locale="fr" >
            <App />
        </LanguageProvider>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
