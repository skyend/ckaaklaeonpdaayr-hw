import App, { Container } from 'next/app'
import React from 'react'
import { fetchInitialStoreState, Store } from '../store'
import { Provider } from 'mobx-react'

class ckaaklaeonpdaayrApp extends App {
    state = {
        store: new Store(),
    }

    // Fetching serialized(JSON) store state
    static async getInitialProps(appContext) {
        const appProps = await App.getInitialProps(appContext)
        const initialStoreState = await fetchInitialStoreState()

        return {
            ...appProps,
            initialStoreState,
        }
    }

    // Hydrate serialized state to store
    static getDerivedStateFromProps(props, state) {
        state.store.hydrate(props.initialStoreState)
        return state
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Provider store={this.state.store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default ckaaklaeonpdaayrApp