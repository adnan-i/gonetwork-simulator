import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export interface Props {
  defaultValue?: string
  value?: string
  validate?: { (p?: string): boolean };
  onSuccess?: { (p?: string): any } // Fired only if input passes validation
  onChangeText?: { (p?: string): any } // Fired on every input change
  componentStyle?: object
  textInputStyle?: object
  validationMessageStyle?: object
  validationError?: string

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

  public static defaultProps: Partial<Props> = {
    validate: (p) => true,
    onSuccess: (p) => void(0),
    onChangeText: (p) => void(0),
  };

  state: State = {
    isValid: true
  }

  static getDerivedStateFromProps (props, state) {
    return { value: props.value };
  }


  render () {
    const { isValid, value } = this.state

    return (

        <View style={[styles.view, this.props.componentStyle]}>
          <TextInput
              {...this.props}
              style={[styles.textInput, this.props.textInputStyle]}
              onChangeText={this.handleChangeText}
              value={value}
              defaultValue={this.props.defaultValue}
          />
          {
            !isValid
            &&
            <Text
                style={[styles.validationMessage, this.props.validationMessageStyle]}
            >
              {this.props.validationError || 'This field is required'}
            </Text>
          }
        </View>
    )

  }

  protected handleChangeText = async (value?: string): Promise<void> => {
    const { validate, onSuccess, onChangeText } = this.props

    const isValid = await Promise.resolve(validate!(value))

    this.setState({ isValid, value })

    onChangeText!(value);
    if (isValid) onSuccess!(value)
  }

}

const styles = StyleSheet.create({
  view: { flex: 3 },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 },
  validationMessage: { color: 'red' }
})

