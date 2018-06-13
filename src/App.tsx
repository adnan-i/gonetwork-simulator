import * as React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'

import PrivateKeysDemo from './screens/DepsDemo'
import Wallet from './screens/Wallet'
import TextInputGN from './components/TextInputGN/TextInputGN'
import KeyInputGN from './components/KeyInputGN/KeyInputGN'

export interface State {
  value?: string
}

export default class App extends React.Component<any, State> {
  // static state: State = {}

  constructor (props: any) {
    super(props)
    this.state = {};
  }

  render () {
    const { value } = this.state

    return (
        <View style={{ paddingTop: 50, paddingLeft: 20 }}>
          {/*<TextInputGN*/}
          {/*validate={(v) => true}*/}
          {/*onSuccess={(v) => console.log('v', v)}*/}
          {/*/>*/}

          <KeyInputGN
              validate={(v) => true}
              onSuccess={(v) => console.log('KeyInputGN onSuccess received:', v)}
              defaultValue="some key"
              type="private"
              mockConfig={{
                probabilityOfKey: 0.8,
                waitForMs: 1000
              }}
          />

          <TextInputGN
              validate={(v) => {
                console.log('v is', v);
                return Promise.resolve(v.length > 0);
              }}
              onSuccess={(v) => {
                this.setState({ value: v });
              }}
              defaultValue={value}
          />

          {/*<Wallet />*/}
          {/* <PrivateKeysDemo /> */}
        </View>
    )

  }

}
