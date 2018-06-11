import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export interface Props {
  // type: string
  defaultValue?: any
  onSuccess: (p: any) => void
  validate: (p: any) => boolean

  [name: string]: any
}

export interface State {
  isValid: boolean
}

/**
 * @example:
 * <TextInputGN
 *    validate={(v) => v.length > 0}
 *    onChangeText={(v) => console.log('v', v)}
 *    defaultValue='default'
 *  />
 */
export default class TextInputGN extends React.Component<Props, State> {

  state: State = {
    isValid: true
  }

  handleChangeText (value?: string): void {
    const { validate, onSuccess } = this.props
    const isValid = validate(value)
    this.setState({ isValid })
    if (isValid) onSuccess(value)
  }

  render () {
    const { isValid } = this.state

    return (
        <View style={styles.view}>
          <TextInput
              {...this.props}
              style={styles.textInput}
              onChangeText={(value?: string) => this.handleChangeText(value)}
          />
          {!isValid && <Text style={styles.validationMessage}>This field is required</Text>}
        </View>
    )

  }

}

const styles = StyleSheet.create({
  view: {},
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
  validationMessage: { color: 'red' }
})

