import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { subscriptionLogsToBeFn } from 'rxjs/testing/TestScheduler'

export interface Props {
  // type: 'text' | 'private-key' | 'public-key'
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
 *    onSuccess={(v) => console.log('v', v)}
 *    defaultValue='default'
 *  />
 */
export default class TextInputGN extends React.Component<Props, State> {

  state: State = {
    isValid: true
  }

  render () {
    const { isValid } = this.state

    return (

        <View style={styles.view}>
          <TextInput
              {...this.props}
              style={[styles.textInput, this.props.style]}
              onChangeText={(value?: string) => this.handleChangeText(value)}
          />
          {!isValid && <Text style={styles.validationMessage}>This field is required</Text>}
        </View>
    )

  }

  protected handleChangeText (value?: string): void {
    const { validate, onSuccess } = this.props
    const isValid = validate(value)
    this.setState({ isValid })
    if (isValid) onSuccess(value)
  }

}

const styles = StyleSheet.create({
  view: {},
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
  validationMessage: { color: 'red' }
})

