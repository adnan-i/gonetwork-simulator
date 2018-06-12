import * as React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'

import PrivateKeysDemo from './screens/DepsDemo'
import Wallet from './screens/Wallet'
import TextInputGN from './components/TextInputGN/TextInputGN'
import KeyInputGN from './components/KeyInputGN/KeyInputGN'

export default class App extends React.Component {
  render () {
    return <View style={{ paddingTop: 50, paddingLeft: 20 }}>
      {/*<TextInputGN*/}
      {/*validate={(v) => true}*/}
      {/*onSuccess={(v) => console.log('v', v)}*/}
      {/*/>*/}

      <KeyInputGN
          validate={(v) => true}
          onSuccess={(v) => console.log('v', v)}
          defaultValue="some key"
      />

      <TextInputGN
          validate={(v) => v.length > 0}
          onSuccess={(v) => console.log('v', v)}
          value="default"
      />

      {/*<Wallet />*/}
      {/* <PrivateKeysDemo /> */}
    </View>
  }
}
