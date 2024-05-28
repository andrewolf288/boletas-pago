import { Font, StyleSheet } from '@react-pdf/renderer'

const fontSizeBase = 7
const robotoRegularUrl = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
const robotoBoldUrl = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf'
const fontFamily = 'Roboto'

export const FontRegister = () => Font.register({
  family: 'Roboto',
  fonts: [
    { src: robotoRegularUrl }, // fuente normal
    { src: robotoBoldUrl, fontWeight: 'bold' } // fuente en negrita
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
    fontFamily,
    fontSize: fontSizeBase + 3,
    fontWeight: 'bold'
  },
  textTitleSectionData: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: fontSizeBase
  },
  textSubTitleHeader: {
    fontFamily,
    fontSize: fontSizeBase
  },
  textTitleProperty: {
    fontFamily,
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '38%'
  },
  textValueProperty: {
    fontFamily,
    fontSize: fontSizeBase,
    width: '62%'
  },
  textTitleObservation: {
    fontFamily,
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '20%'
  },
  textValueObservation: {
    fontFamily,
    fontSize: fontSizeBase - 1,
    width: '80%'
  },
  textTitlePropertyGrid: {
    fontFamily,
    fontSize: fontSizeBase,
    fontWeight: 'bold',
    width: '70%'
  },
  textValuePropertyGrid: {
    fontFamily,
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
