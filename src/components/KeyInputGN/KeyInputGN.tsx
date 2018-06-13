import * as React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import TextInputGN from '../TextInputGN/TextInputGN'
import { Icon } from 'react-native-elements'
import QRScan, { ScanStatus } from '../KeyQRScanner'

import * as T from '../../typings'

export interface Props {
  type?: T.KeyType
  defaultValue?: string
  onSuccess: (p: any) => void
  validate: (p: any) => boolean
  mockConfig?: T.MockConfig

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
 *    type="private"
 *    mockConfig={{
 *      probabilityOfKey: 0.8,
 *      waitForMs: 1000
 *    }}
 *  />
 */
export default class KeyInputGN extends React.Component<Props, State> {
  state: State = {
    QRScanModalVisible: false
  }

  static getDerivedStateFromProps (props: Props, state: State): object {
    return { value: props.value };
  }

  render () {
    const { QRScanModalVisible, value } = this.state;

    return (
        <View>

          <View style={styles.inputGroup}>
            <TextInputGN
                {...this.props}
                style={styles.textInput}
                onSuccess={this.handleOnSuccess}
                validate={this.props.validate}
                value={value}
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
                scanFor={this.props.type}
                onDone={this.onScanDone}
                mockConfig={this.props.mockConfig}
            />
          }

        </View>
    )

  }

  protected handleOnSuccess = (value?: string) => {
    this.setState({ value });
    this.props.onSuccess(value);
  }

  protected onScanDone = (scanStatus: ScanStatus, key?: string): void => {

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

