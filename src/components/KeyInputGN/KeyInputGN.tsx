import * as React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import TextInputGN from '../TextInputGN/TextInputGN'
import { Icon } from 'react-native-elements'
import QRScan, { ScanStatus } from '../KeyQRScanner'

import * as T from '../../typings'

export interface Props {
  type?: T.KeyType
  defaultValue?: string

  value?: string
  validate?: { (p?: string): boolean };
  onSuccess?: { (p?: string): any } // Fired only if input passes validation
  onChangeText?: { (p?: string): any } // Fired on every input change
  componentStyle?: object
  textInputStyle?: object
  validationMessageStyle?: object
  validationError?: string

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

  public static defaultProps: Partial<Props> = {
    value: '',
    validate: (p) => true,
    onSuccess: (p) => void(0),
    onChangeText: (p) => void(0),
  };

  state: State = {
    QRScanModalVisible: false
  }

  render () {
    const { QRScanModalVisible } = this.state;

    return (
        <View>

          <View style={styles.inputGroup}>
            <TextInputGN
                {...this.props}
                style={styles.textInput}
                value={this.state.value}
                onChangeText={(value) => {
                  this.setState({ value });
                  this.props.onChangeText!(value);
                }}
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

  protected onScanDone = (scanStatus: ScanStatus, value?: string): void => {

    this.setState({ QRScanModalVisible: false })

    if (scanStatus !== 'success') return

    this.setState({ value })

    this.props.onChangeText!(value);

    if (this.props.validate!(value)) {
      this.props.onSuccess!(value);
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

