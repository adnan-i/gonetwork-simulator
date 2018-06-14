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

  componentDidUpdate (prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      this.handleChangeText(this.props.value);
    }
  }

  render () {
    const { isValid } = this.state

    return (

        <View style={[styles.view, this.props.componentStyle]}>
          <TextInput
              {...this.props}
              style={[styles.textInput, this.props.textInputStyle]}
              onChangeText={this.handleChangeText}
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

  private handleChangeText = async (value?: string): Promise<void> => {
    const { validate, onSuccess, onChangeText } = this.props

    const isValid = await Promise.resolve(validate!(value))
    this.setState({ isValid })

    onChangeText!(value);
    if (isValid) onSuccess!(value)
  }

}

const styles = StyleSheet.create({
  view: { flex: 3 },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 },
  validationMessage: { color: 'red' }
})

