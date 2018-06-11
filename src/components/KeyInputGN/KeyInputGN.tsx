import * as React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import TextInputGN from '../TextInputGN/TextInputGN'
import Icon from 'react-native-vector-icons/FontAwesome'

export interface Props {
  defaultValue?: string
  onSuccess: (p: any) => void
  validate: (p: any) => boolean

  [name: string]: any
}


/**
 * @example:
 * <KeyInputGN
 *    validate={(v) => v.length > 0}
 *    onSuccess={(v) => console.log('v', v)}
 *    defaultValue='default'
 *  />
 */
export default class KeyInputGN extends React.Component<Props> {

  render () {

    return (
        <View style={{ flex: 1 }}>
          <View style={styles.inputGroup}>
            <TextInputGN
                style={styles.textInput}
                onSuccess={this.props.onSuccess}
                validate={this.props.validate}
            />
            <Button
                onPress={this.onButtonPress}
                title="Press me"
            >
              {/*<Icon name="camera" size={30} color="#900" />*/}
            </Button>
          </View>
        </View>
    )

  }

  protected onButtonPress (): void {
    console.log('pressed')
  }

}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  },
  textInput: {
    flex: 3,
    borderColor: 'gray',
    borderWidth: 1
  }
})

