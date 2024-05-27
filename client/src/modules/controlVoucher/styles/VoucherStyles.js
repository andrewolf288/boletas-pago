import { Font, StyleSheet } from '@react-pdf/renderer'

const fontSizeBase = 7
export const FontCalibri = () => Font.register({
  family: 'Calibri',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' }
  ]
})

export const VoucherStyles = StyleSheet.create({
  pageContainer: {
    margin: 10
  },
  containerFlexRow: {
    flexDirection: 'row',
    width: '100%'
  },
  containerFlexCol: {
    flexDirection: 'column',
    flex: 1
  },
  section: {
    padding: 10,
    flexGrow: 1
  },
  sectionSubtitleHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center'
  },
  dividerLine: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  dividerLineSignature: {
    width: 110,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10
  },
  textHeaderVoucher: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase + 3,
    fontWeight: 'bold'
  },
  textTitleSectionData: {
    fontFamily: 'Calibri',
    fontWeight: 'bold',
    fontSize: fontSizeBase
  },
  textSubTitleHeader: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase
  },
  textTitleProperty: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '38%'
  },
  textValueProperty: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase,
    width: '62%'
  },
  textTitleObservation: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '20%'
  },
  textValueObservation: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase - 1,
    width: '80%'
  },
  textTitlePropertyGrid: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '70%'
  },
  textValuePropertyGrid: {
    fontFamily: 'Calibri',
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'right'
  },
  imageLogo: {
    maxWidth: 70,
    height: 70,
    objectFit: 'contain',
    flexGrow: 0
  },
  imageSignature: {
    maxWidth: 150,
    height: 60,
    objectFit: 'contain',
    flexGrow: 0
  }
})
