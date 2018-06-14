import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker, Icon } from 'native-base';
import TextInputGN from '../TextInputGN/TextInputGN'
import { BigNumber } from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 16, ROUNDING_MODE: 4 })

export type Currency = 'WEI' | 'GWEI' | 'ETH'

export interface Props {
  currency?: Currency

  [name: string]: any
}

export interface State {
  value?: BigNumber | undefined
  weiValue?: BigNumber
  currency: Currency
  baseCurrency: Currency
}

const ratesInWei = {
  ETH: new BigNumber(1000000000000000000),
  GWEI: new BigNumber(1000000000),
  WEI: new BigNumber(1),
}

/**
 * @example:
 * <CoinInputGN
 *    validate={(v) => v.length > 0}
 *    onSuccess={(v) => console.log('v', v)}
 *    value='default'
 *  />
 */
export default class CoinInputGN extends React.Component<Props, State> {

  // static readonly ratesInWei = {
  //   ETH: new BigNumber(1000000000000000000),
  //   GWEI: new BigNumber(1000000000),
  //   WEI: new BigNumber(1),
  // }

  state: State = {
    currency: 'ETH',
    baseCurrency: 'WEI',
  }

  static getDerivedStateFromProps ({ currency }, state): null | Partial<State> {
    return currency ? { currency } : null;
  }

  render () {
    const { value, currency } = this.state;

    return (
        <View style={[styles.inputGroup, this.props.style]}>
          <TextInputGN
              {...this.props}
              keyboardType={`numeric`}
              style={styles.textInput}
              onSuccess={(value?: string) => {
                this.storeViewValueToState(value);
              }}
              validate={this.isValidNumberInput}
              value={(value && value.toFixed()) || ''}
              onChangeText={this.handleChangeText}

              validationError="Invalid value"
          />
          <Picker
              mode="dropdown"
              iosHeader="Select currency"
              iosIcon={<Icon name="ios-arrow-down-outline"/>}
              style={{ width: undefined }}
              selectedValue={currency}
              onValueChange={this.handlePickerValueChange}
              placeholderIconColor="#007aff"

          >
            <Picker.Item label="Ether" value="ETH"/>
            <Picker.Item label="Gwei" value="GWEI"/>
            <Picker.Item label="Wei" value="WEI"/>
          </Picker>
        </View>
    )

  }

  private storeViewValueToState = (value?: string): void => {
    this.setState({
      value: value ? new BigNumber(value) : undefined,
      weiValue: this.convertValueToCurrency(value)
    });

  }

  private isValidNumberInput = (value: string = ''): boolean => {
    const regex = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');
    return regex.test(value);
  }

  private handleChangeText = (value?: string): void => {
    if (this.isValidNumberInput(value)) {
      this.storeViewValueToState(value);
    }
  }

  private convertValueToCurrency (
      value?: BigNumber | string | undefined,
      targetCurrency: Currency = this.state.baseCurrency
  ): BigNumber | undefined {

    const { currency } = this.state;
    if (!value) return;

    const val: BigNumber = new BigNumber(value);

    const weiRate: BigNumber = ratesInWei[currency];
    const weiValue: BigNumber = weiRate.multipliedBy(val);

    return weiValue.dividedBy(ratesInWei[targetCurrency]);

  }


  private handlePickerValueChange = (currency: Currency): void => {
    const { value } = this.state;

    this.setState({
      currency,
      value: this.convertValueToCurrency(value, currency),
      weiValue: this.convertValueToCurrency(value)
    });

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

