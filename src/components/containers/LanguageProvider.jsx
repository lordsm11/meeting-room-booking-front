import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function LanguageProvider(props) {
    const { locale } = props;
    return (
            <IntlProvider
                    locale={locale}
                    key={locale}
                    messages={props.messages[locale]}
            >
                {React.Children.only(props.children)}
            </IntlProvider>
    );
}

function mapStateToProps(state) {
    return { ...state.languageProviderReducer };
}

export default connect(mapStateToProps)(LanguageProvider);
