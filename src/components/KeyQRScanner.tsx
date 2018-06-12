import * as React from 'react'
import { Modal, Button, View, Text } from 'react-native'
import { RNCamera, BarCodeType } from 'react-native-camera'

import * as util from 'ethereumjs-util'

import * as T from '../typings'

export type ScanStatus = 'cancel' | 'fail' | 'mis-match' | 'success'

export type MockConfig = {
  probabilityOfKey: number
  waitForMs: number
}

export interface Props {
  scanFor?: T.KeyType // by-defualt it will look for both public and private keys
  onDone: (s: ScanStatus, k?: string) => void
  mockConfig?: MockConfig
}

export interface State {
  timeoutId: number
}

const defaultMockConfig: MockConfig = {
  probabilityOfKey: 0.5,
  waitForMs: 2000,
}

const mockKeys = {
  private: '0xc712c08b0c42c073f8c67cf5c0fa8c4cf5ffa89c0b33c2d4e53aa4fe969da887',
  public: '0xF8e9b7b0F5936C0221B56F15ea2182D796d09E63'
}

export default class QRScan extends React.Component<Props, State> {

  componentWillUnmount () {
    const { timeoutId } = this.state
    if (timeoutId) clearTimeout(timeoutId)
  }

  // todo: cancel support and/or timeout
  onScan = (ev: { type?: keyof BarCodeType, data: string }) => {
    const scanFor: T.KeyType[] = this.props.scanFor ? [this.props.scanFor] : ['private', 'public']
    const maybeKey = util.toBuffer(ev.data)

    const valid = scanFor.map(k => {
      if (k === 'private') return util.isValidPrivate(maybeKey) && ev.data
      else if (k === 'public') return util.isValidPublic(maybeKey) && ev.data
    })
        .filter(Boolean)

    if (valid[0]) {
      this.props.onDone('success', ev.data)
    } else {
      this.props.onDone('fail')
    }
  }

  render () {
    return (
        <Modal
            animationType="slide"
            onShow={this.handleModalOnShow}
            onDismiss={this.handleModalOnClose}
            onRequestClose={this.handleModalOnClose}
        >
          <RNCamera
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              onBarCodeRead={this.onScan}
              style={{
                width: '100%',
                height: '100%'
              }}
          />
        </Modal>
    )
  }

  private handleModalOnShow = (): void => {
    const mocked: boolean = !!this.props.mockConfig
    if (mocked) this.initMockTimer()
  }

  private handleModalOnClose = (): void => {
    const { timeoutId } = this.state
    if (timeoutId) clearTimeout(timeoutId)
    this.onScan({ data: '' })
  }

  private getMockConfig (): MockConfig {
    const { mockConfig } = this.props
    return { ...defaultMockConfig, ...(mockConfig || {}) }
  }

  private initMockTimer () {
    const { scanFor } = this.props
    const mockConfig = this.getMockConfig()

    const randomKey: string = this.getRandomKey(scanFor)

    const timeoutId: number = setTimeout(() => {
      const success: boolean = Math.random() < mockConfig.probabilityOfKey
      this.onScan({ data: randomKey })
    }, mockConfig.waitForMs)

    this.setState({ timeoutId })
  }

  private getRandomKey (scanFor?: T.KeyType): string {
    const keyTypes: T.KeyType[] = scanFor ? [scanFor, scanFor] : ['private', 'public']
    return mockKeys[keyTypes[Math.round(Math.random())]]
  }


}
