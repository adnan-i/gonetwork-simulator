import * as React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import TextInputGN from '../TextInputGN/TextInputGN'
import { Icon } from 'react-native-elements'
import QRScan, { ScanStatus } from '../KeyQRScanner'

export interface Props {
  defaultValue?: string
  onSuccess: (p: any) => void
  validate: (p: any) => boolean

  [name: string]: any
}

export interface State {
  QRScanModalVisible: boolean
  value?: string
}


/**
 * @example:
 * <KeyInputGN
 *    validate={(v) => v.length > 0}
 *    onSuccess={(v) => console.log('v', v)}
 *    defaultValue='default'
 *  />
 */
export default class KeyInputGN extends React.Component<Props, State> {
  state: State = {
    QRScanModalVisible: false
  }

  render () {
    const { QRScanModalVisible, value } = this.state
    console.log('KeyInputGN state.value is: ', value)

    return (
        <View>

          <View style={styles.inputGroup}>
            <TextInputGN
                {...this.props}
                style={styles.textInput}
                onSuccess={this.props.onSuccess}
                validate={this.props.validate}
                defaultValue={this.props.defaultValue}
            />
            <Icon
                name="camera-alt"
                size={15}
                raised
                onPress={this.onButtonPress}
            />
          </View>

          {
            QRScanModalVisible
            &&
            <QRScan
                scanFor="private"
                onDone={this.onScanDone}
                mockConfig={{
                  probabilityOfKey: 0.5,
                  waitForMs: 1000
                }}
            />
          }

        </View>
    )

  }

  protected onScanDone = (scanStatus: ScanStatus, key?: string): void => {
    // console.log('onScanDone', scanStatus, key)

    this.setState({ QRScanModalVisible: false })
    if (scanStatus !== 'success') return

    if (this.props.validate(key)) {
      this.props.onSuccess(key)
      this.setState({ value: key })
    }
  }

  protected onButtonPress = (): void => {
    this.setState({ QRScanModalVisible: true })
  }

}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
  },
  textInput: {
    flex: 3
  }
})

