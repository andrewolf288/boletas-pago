import React from 'react'
import { VoucherStyles } from '../styles'
import { Document, Page, Text, View } from '@react-pdf/renderer'

const styles = VoucherStyles

export const VoucherPDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}
