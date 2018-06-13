import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { subscriptionLogsToBeFn } from 'rxjs/testing/TestScheduler'

export interface Props {
  // type: 'text' | 'private-key' | 'public-key'
  defaultValue?: string
  value?: string
  onSuccess: (p: any) => void
  validate: (p: any) => boolean
  style?: object

  [name: string]: any
}

export interface State {
  isValid: boolean
  value?: string
}

/**
 * @example:
 * <TextInputGN
 *    validate={(v) => v.length > 0}
 *    onSuccess={(v) => console.log('v', v)}
 *    value='default'
 *  />
 */
export default class TextInputGN extends React.Component<Props, State> {

  state: State = {
    isValid: true
  }

  static getDerivedStateFromProps (props, state) {
    return { value: props.value };
  }


  render () {
    const { isValid, value } = this.state

    return (

        <View style={[styles.view, this.props.style]}>
          <TextInput
              {...this.props}
              style={styles.textInput}
              onChangeText={this.handleChangeText}
              value={value}
              defaultValue={this.props.defaultValue}
          />
          {!isValid && <Text style={styles.validationMessage}>This field is required</Text>}
        </View>
    )

  }

  protected handleChangeText = (value?: string): void => {
    const { validate, onSuccess } = this.props
    const isValid = validate(value)
    this.setState({ isValid, value })
    if (isValid) onSuccess(value)
  }

}

const styles = StyleSheet.create({
  view: { flex: 3 },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
  validationMessage: { color: 'red' }
})

