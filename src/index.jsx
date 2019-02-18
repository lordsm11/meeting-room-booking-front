import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/app.scss';
import store from 'reducers/store';
import App from 'components/App';

import LanguageProvider from 'components/containers/LanguageProvider';
import { translationMessages } from 'i18n';

ReactDOM.render(
  <Provider store={store}>
  <LanguageProvider messages={translationMessages} locale="fr" >
      <App />
  </LanguageProvider>
</Provider>,
document.getElementById("root")
);
