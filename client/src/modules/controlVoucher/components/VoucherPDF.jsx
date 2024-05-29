import React from 'react'
import { VoucherStyles, FontRegister } from '../styles'
import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { formatDate, getMonthName, parseDateVoucher } from '../../../utils'
import ImageLogoBatan from '../../../assets/logo-oficial.png'
import FirmaGerencia from '../../../assets/firma-boleta.png'

const styles = VoucherStyles
FontRegister()

const styleValueProperty = (text, emptyText = '-') => `:    ${text.length !== 0 ? text : emptyText}`
const styleValueBooleanValue = (value) => `:    ${value ? 'SI' : 'NO'}`
const styleValueMoney = (value) => `:    S/ ${value}`
const styleDateValue = (date) => `:    ${date ? formatDate(date) : '-'}`
const textInformacionEnterprise = 'URB. PARQUE INDUSTRIAL RIO SECO MZ. E LT.8, CERRO COLORADO - RUC N° 20120914279 - D.S. 001-98-TR (22.01.98)'
const textObservaciones = 'EN VIRTUD AL D. LEG N° 1310 DE FECHA 29.12.2016, QUE APRUEBA EL USO DE TECNOLOGIAS DE DIGITALIZACION DE DOCUMENTOS LABORALES, PARA SUSTITUIR DOCUMENTOS FISICOS Y FIRMAS OLOGRAFICAS, SE ENVIO LA PRESENTE DEL PLAZO, AL E-MAIL DECLARADO POR EL TRABAJADOR'

export const VoucherPDF = ({ data }) => {
  const { remuneration, worker } = data
  const title = `BOLETA DE PAGO MENSUAL - ${getMonthName(remuneration.month)}-${remuneration.year} - ${data.worker.user.last_name} ${data.worker.user.first_name}`
  return (
    <Document
      title={title}
      language='es'
    >
      <Page
        size="A4"
      >
        <View style={{ flexDirection: 'column', margin: 10 }}>
          {/* ENCABEZADO BOLETA DE PAGO */}
          <View style={{ ...styles.containerFlexRow }}>
            <Image src={ImageLogoBatan} style={styles.imageLogo}/>
            <View style={styles.sectionSubtitleHeader}>
              <Text style={styles.textHeaderVoucher}>{`BOLETA DE PAGO MENSUAL - ${getMonthName(remuneration.month)}-${remuneration.year}`}</Text>
              <Text style={styles.textSubTitleHeader}>{textInformacionEnterprise}</Text>
            </View>
          </View>
          {/* DATOS DEL TRABAJADOR Y RESUMEN DE TAREO */}
          <View style={styles.containerFlexRow}>
            {/* PRIMER SECCION */}
            <View style={{ flexDirection: 'column', marginRight: 15, width: '38%' }}>
              {/* EMPRESA */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>EMPRESA</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty('EMARAN S.A.C.')}</Text>
              </View>
              {/* TRABAJADOR */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>TRABAJADOR</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(`${worker.user.last_name} ${worker.user.first_name}`)}</Text>
              </View>
              {/* CARGO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>CARGO</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.workerPosition.description)}</Text>
              </View>
              {/* DOC. IDENTIDAD */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DOC. IDENTIDAD</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.document)}</Text>
              </View>
              {/* REG. LABORAL */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>REG. LABORAL</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.workRegime)}</Text>
              </View>
              {/* TIPO DE TRAB. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>TIPO DE TRAB.</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.typeWorker.description)}</Text>
              </View>
              {/* SIT. ESPECIAL */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>SIT. ESPECIAL</Text>
                <Text style={styles.textValueProperty}>{styleValueBooleanValue(worker.specialSituation)}</Text>
              </View>
              {/* REG. PENSIONARIO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>REG. PENSIONARIO</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.pensionScheme)}</Text>
              </View>
              {/* C.U.S.P.P. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>C.U.S.P.P.</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.codeCUSPP)}</Text>
              </View>
            </View>
            {/* SEGUNDA SECCION */}
            <View style={{ flexDirection: 'column', marginRight: 15, width: '31%' }}>
              {/* SUELDO / SALARIO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>SUELDO / SALARIO</Text>
                <Text style={styles.textValueProperty}>{styleValueMoney(worker.salary)}</Text>
              </View>
              {/* FECHA INGRESO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>FECHA INGRESO</Text>
                <Text style={styles.textValueProperty}>{styleDateValue(worker.admissionDate)}</Text>
              </View>
              {/* FECHA DE CESE */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>FECHA DE CESE</Text>
                <Text style={styles.textValueProperty}>{styleDateValue(worker.terminationDate)}</Text>
              </View>
              {/* CENTRO DE COSTO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>CENTRO DE COSTO</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.costCenter)}</Text>
              </View>
              {/* FECHA INICIO VAC. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>FECHA INICIO VAC.</Text>
                <Text style={styles.textValueProperty}>{styleDateValue(data.fechaInicioVacaciones)}</Text>
              </View>
              {/* FECHA FINAL VAC. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>FECHA FINAL VAC.</Text>
                <Text style={styles.textValueProperty}>{styleDateValue(data.fechaFinVacaciones)}</Text>
              </View>
              {/* SEDE */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>SEDE</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.sede)}</Text>
              </View>
              {/* SITUACIÓN */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>SITUACIÓN</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(worker.situation)}</Text>
              </View>
              {/* HIJOS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>HIJOS</Text>
                <Text style={styles.textValueProperty}>{styleValueBooleanValue(worker.hasChildren)}</Text>
              </View>
            </View>
            {/* TERCERA SECCION */}
            <View style={{ flexDirection: 'column', width: '31%' }}>
              {/* DÍAS LABORADOS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DÍAS LABORADOS</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasLaborados)}</Text>
              </View>
              {/* DÍAS NO LAB. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DÍAS NO LAB.</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasNoLaborados, '0:00')}</Text>
              </View>
              {/* HRS. LABORADAS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>HRS. LABORADAS</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.horasLaboradas, '0:00')}</Text>
              </View>
              {/* HRS. EX. SIMPLES */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>HRS. EX. SIMPLES</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.horasExtraSimples, '0:00')}</Text>
              </View>
              {/*  HRS. EX. DOBLES */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>HRS. EX. DOBLES</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.horasExtrasDobles, '0:00')}</Text>
              </View>
              {/* BONIF. NOCTURNA */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>BONIF. NOCTURNA</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.bonificacionNocturna, '0:00')}</Text>
              </View>
              {/* LIC CON GOCE HAB. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>LIC CON GOCE HAB.</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasLicenciaGoceHaber)}</Text>
              </View>
              {/* DÍAS FALTAS  */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DÍAS FALTAS</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasFalta)}</Text>
              </View>
              {/* DÍAS VACACIONES */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DÍAS VACACIONES</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasVacaciones)}</Text>
              </View>
              {/* DÍAS DESC. MED. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitleProperty}>DÍAS DESC. MED.</Text>
                <Text style={styles.textValueProperty}>{styleValueProperty(data.diasDescansoMedico)}</Text>
              </View>
            </View>
          </View>
          {/* Linea divisora */}
          <View style={styles.dividerLine} />
          {/* Encabezado */}
          <View style={styles.containerFlexRow}>
            <Text style={{ ...styles.textTitleSectionData, width: '25%' }}>REMUNERACIONES</Text>
            <Text style={{ ...styles.textTitleSectionData, width: '8%' }}>IMPORTE</Text>
            <Text style={{ ...styles.textTitleSectionData, width: '25%' }}>DESCUENTOS</Text>
            <Text style={{ ...styles.textTitleSectionData, width: '8%' }}>IMPORTE</Text>
            <Text style={{ ...styles.textTitleSectionData, width: '25%' }}>APORTES DEL EMPLEADOR</Text>
            <Text style={{ ...styles.textTitleSectionData, width: '8%' }}>IMPORTE</Text>
          </View>
          {/* Linea divisora */}
          <View style={styles.dividerLine} />
          {/* SECCIÓN DE RESUMEN DE PAGOS */}
          <View style={styles.containerFlexRow}>
            <View style={{ ...styles.containerFlexCol, marginRight: 20 }}>
              {/* HABER BÁSICO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>HABER BÁSICO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.haberBasico}</Text>
              </View>
              {/* ASIGNACION FAMILIAR */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>ASIGNACION FAMILIAR</Text>
                <Text style={styles.textValuePropertyGrid}>{data.asignacionFamiliar}</Text>
              </View>
              {/* LICENCIA CON GOCE DE HABER */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>LICENCIA CON GOCE DE HABER</Text>
                <Text style={styles.textValuePropertyGrid}>{data.licenciaGoceHaber}</Text>
              </View>
              {/* INCAPACIDAD POR ENFERMEDAD */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>INCAPACIDAD POR ENFERMEDAD</Text>
                <Text style={styles.textValuePropertyGrid}>{data.incapacidadEnfermedad}</Text>
              </View>
              {/* HRS EXT SIMPLES 25% */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>HRS EXT SIMPLES 25%</Text>
                <Text style={styles.textValuePropertyGrid}>{data.hrsExtSimples25}</Text>
              </View>
              {/* HRS EXT SIMPLES 35% */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>HRS EXT SIMPLES 35%</Text>
                <Text style={styles.textValuePropertyGrid}>{data.hrsExtSimples35}</Text>
              </View>
              {/* DIA DEL TRABAJOR */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>DIA DEL TRABAJOR</Text>
                <Text style={styles.textValuePropertyGrid}>{data.diaDelTrabajador}</Text>
              </View>
              {/* COMISION / DESTAJO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>COMISION / DESTAJO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.comisionDestajo}</Text>
              </View>
              {/* GRATIFICACION */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>GRATIFICACION</Text>
                <Text style={styles.textValuePropertyGrid}>{data.gratificacion}</Text>
              </View>
              {/* BONO EXTRAORD. GRATI  */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>BONO EXTRAORD. GRATI</Text>
                <Text style={styles.textValuePropertyGrid}>{data.bonoExtraordinario}</Text>
              </View>
              {/* CTS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>CTS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.cts}</Text>
              </View>
              {/* VACACIONES */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>VACACIONES</Text>
                <Text style={styles.textValuePropertyGrid}>{data.vacaciones}</Text>
              </View>
              {/* UTILIDAD */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>UTILIDAD</Text>
                <Text style={styles.textValuePropertyGrid}>{data.utilidad}</Text>
              </View>
              {/* CANASTA/ VALE */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>CANASTA/ VALE</Text>
                <Text style={styles.textValuePropertyGrid}>{data.canastaVale}</Text>
              </View>
              {/* PREMIO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>PREMIO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.premio}</Text>
              </View>
            </View>
            {/* DESCUENTOS */}
            <View style={{ ...styles.containerFlexCol, marginRight: 20 }}>
              {/* S.N.P. */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>S.N.P.</Text>
                <Text style={styles.textValuePropertyGrid}>{data.snp}</Text>
              </View>
              {/* A.F.P. FONDO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>A.F.P. FONDO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.afpFondo}</Text>
              </View>
              {/* A.F.P. SEGURO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>A.F.P. SEGURO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.afpSeguro}</Text>
              </View>
              {/* A.F.P. COMISION */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>A.F.P. COMISION</Text>
                <Text style={styles.textValuePropertyGrid}>{data.afpComision}</Text>
              </View>
              {/* RTA 5TA CATEGORIA */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>RTA. 5TA CATEGORIA</Text>
                <Text style={styles.textValuePropertyGrid}>{data.rtaStaCategoria}</Text>
              </View>
              {/* ADELANTOS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>ADELANTOS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.adelantos}</Text>
              </View>
              {/* ESSALUD + VIDA */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>ESSALUD + VIDA</Text>
                <Text style={styles.textValuePropertyGrid}>{data.esSaludVida}</Text>
              </View>
              {/* TARDANZAS/PERMISOS C/ DSCTO */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>TARDANZAS/PERMISOS C/ DSCTO</Text>
                <Text style={styles.textValuePropertyGrid}>{data.tardanzaPermisosDescuentos}</Text>
              </View>
              {/* INASISTENCIAS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>INASISTENCIAS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.inasistencia}</Text>
              </View>
              {/* PAG GRATIF */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>PAG. GRATIF</Text>
                <Text style={styles.textValuePropertyGrid}>{data.pagoGratificaciones}</Text>
              </View>
              {/* PAG CTS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>PAG. CTS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.pagoCTS}</Text>
              </View>
              {/* PAG VACACIONES / BENEFICIOS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>PAG. VACACIONES / BENEFICIOS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.pagoVacacionesBeneficios}</Text>
              </View>
              {/* OTROS DESCUENTOS */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>OTROS DESCUENTOS</Text>
                <Text style={styles.textValuePropertyGrid}>{data.otrosDescuentos}</Text>
              </View>
              {/* PAG UTILIDAD */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>PAG. UTILIDAD</Text>
                <Text style={styles.textValuePropertyGrid}>{data.pagoUtilidad}</Text>
              </View>
              {/* ENT. CANASTA/ VALE */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>ENT. CANASTA/ VALE</Text>
                <Text style={styles.textValuePropertyGrid}>{data.entCanastaVale}</Text>
              </View>
            </View>
            {/* APORTES DEL EMPLEADOR */}
            <View style={{ ...styles.containerFlexCol, marginRight: 20 }}>
              {/* ESSALUD */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>ESSALUD</Text>
                <Text style={styles.textValuePropertyGrid}>{data.esEssalud}</Text>
              </View>
              {/* SENATI */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>SENATI</Text>
                <Text style={styles.textValuePropertyGrid}>{data.senati}</Text>
              </View>
              {/* SCTR SALUD Y PENSION */}
              <View style={styles.containerFlexRow}>
                <Text style={styles.textTitlePropertyGrid}>SCTR SALUD Y PENSION</Text>
                <Text style={styles.textValuePropertyGrid}>{data.sctrSaludPension}</Text>
              </View>
            </View>
          </View>
          {/* Linea divisora */}
          <View style={styles.dividerLine} />
          {/* SECCIÓN DE OBSERVACIONES */}
          <View style={styles.containerFlexRow}>
            <Text style={styles.textTitleObservation}>OBSERVACIONES:</Text>
            <Text style={{ ...styles.textValueObservation }}>{textObservaciones}</Text>
          </View>
          {/* Linea divisora */}
          <View style={styles.dividerLine} />
          {/* SECCIÓN DE TOTALES DE REMUNERACION */}
          <View style={styles.containerFlexRow}>
            <View style={styles.containerFlexCol}>
              <View style={styles.containerFlexRow}>
                {/* TOTAL REMUNERACIONES */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}>TOTAL REMUNERACIONES</Text>
                  <Text style={{ ...styles.textValuePropertyGrid, fontWeight: 'bold' }}>{data.totalRemuneraciones}</Text>
                </View>
                {/* TOTAL DESCUENTOS */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}>TOTAL DESCUENTOS</Text>
                  <Text style={{ ...styles.textValuePropertyGrid, fontWeight: 'bold' }}>{data.totalDescuentos}</Text>
                </View>
                {/* TOTAL APORTACIONES */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}>TOTAL APORTACIONES</Text>
                  <Text style={{ ...styles.textValuePropertyGrid, fontWeight: 'bold' }}>{data.totalAportaciones}</Text>
                </View>
              </View>
              <View style={styles.containerFlexRow}>
                {/* NETO A PAGAR */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}>NETO A PAGAR</Text>
                  <Text style={{ ...styles.textValuePropertyGrid, fontWeight: 'bold' }}>{data.netoPagar}</Text>
                </View>
                {/* BLOCK EMPTY */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}></Text>
                  <Text style={{ ...styles.textValuePropertyGrid, fontWeight: 'bold' }}></Text>
                </View>
                {/* PLLA HABERES CTA. SUELDO */}
                <View style={{ ...styles.containerFlexRow, marginRight: 20 }}>
                  <Text style={styles.textTitlePropertyGrid}>PLLA HABERES CTA. SUELDO</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Linea divisora */}
          <View style={styles.dividerLine} />
          {/* SECCIÓN DE FIRMAS */}
          <View style={{ ...styles.containerFlexRow, marginTop: 20, marginLeft: 40 }}>
            <View
              style={{
                ...styles.containerFlexCol,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image src={FirmaGerencia} style={styles.imageSignature}/>
              <View style={styles.dividerLineSignature} />
              <Text style={{ ...styles.textTitleProperty, textAlign: 'center' }}>FIRMA DEL EMPLEADOR</Text>
            </View>
            <View
              style={{
                ...styles.containerFlexCol,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 20
              }}
            >
              <Text style={styles.textValueObservation}>{`ENVIADO EL: ${parseDateVoucher(data.creationDate)}`}</Text>
              <Text style={styles.textValueObservation}>De: asistentecontable@emaransac.com</Text>
              <Text style={styles.textValueObservation}>{`Para: ${data.worker.user.email}`}</Text>
              <Text style={styles.textValueObservation}>
              RECIBIDO CONFORME LO ESTABLECE EL
              </Text>
              <Text style={styles.textValueObservation}>
              D.L. N° 1310 DEL 29.12.2016
              </Text>
              <View style={styles.dividerLineSignature} />
              <Text style={{ ...styles.textTitleProperty, textAlign: 'center' }}>RECIBI CONFORME</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
