import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { PermissionDownloadResponse } from "@/types/workAtHeights";

// Estilos para PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    paddingTop: "5mm",
    paddingBottom: "5mm",
    paddingHorizontal: "5mm",
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    border: "1px solid black",
    padding: "8px",
  },
  logoContainer: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "32px",
    height: "32px",
    objectFit: "fill",
  },
  headerTitleContainer: {
    textAlign: "center",
    width: "50%",
  },
  headerTitle: {
    marginBottom: "2px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: "10px",
  },
  headerPermissionTitle: {
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  headerInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 8,
    textAlign: "right",
    width: "25%",
  },
  headerInfoRow: {
    height: "16px",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "8px",
    marginTop: "2px",
  },
  headerInfoRowConsecutive: {
    height: "20px",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "8px",
    marginVertical: "2px",
  },
  headerInfoLabel: {
    fontSize: 8,
    fontWeight: "bold",
  },
  headerInfoValue: {
    width: 50,
    justifySelf: "center",
    borderBottom: "1px solid black",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  section: {
    border: "1px solid black",
    padding: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 9,
    width: "25%",
  },
  value: {
    borderBottom: "1px solid black",
    flexGrow: 1,
    marginLeft: 5,
    fontSize: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    marginBottom: 20,
  },
  tableHeader: {
    fontSize: "10px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fe8848",
    padding: 5,
    border: "1px solid black",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    justifyConte: "center",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
  },

  tableRowHeader: {
    flexDirection: "row",
    width: "100%",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
  },
  tableRowHeaderSingle: {
    flexDirection: "row",
    width: "33.33%",
    height: "30px",
    textAlign: "center",
  },
  tableHeaderCell: {
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
  },
  tableHeaderCellCorner: {
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
    borderRight: "1px solid black",
  },
  tableHeaderCellIntermediate: {
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
  },
  tableHeaderCellIntermediateNo: {
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
  },
  tableHeaderCellAspect: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
  },
  tableCell: {
    padding: "4px",
    fontSize: "7px",
  },
  tableCellCheck: {
    paddingHorizontal: "4px",
    paddingTop: "6px",
    paddingBottom: "4px",
    width: "6%", // Adjusted to be smaller
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "8px",
  },
  centeredTitle: {
    fontSize: "10px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fe8848",
    border: "1px solid black",
    borderBottom: "none",
    padding: "2px",
  },
  criticalTasksContainerOuter: {
    flexDirection: "column",
    marginBottom: 10,
  },
  criticalTasksContainerInter: {
    flexDirection: "row",
    justifyContent: "space-around",
    border: "1px solid black",
    padding: "2px",
    marginBottom: 10,
  },
  criticalTaskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  criticalTaskItemLabel: {
    fontSize: "9px",
  },
  checkbox: {
    width: 15,
    height: 15,
    fontSize: "10px",
    fontWeight: "bold",
    border: "1px solid black",
    justifyContent: "center",
    alignItems: "center",
  },
  heightLoadContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  heightLoadItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  heightLoadLabel: {
    fontWeight: "bold",
    width: "auto",
  },
  heightLoadValue: {
    borderBottom: "1px solid black",
    height: 15,
    width: 20,
    marginLeft: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
  },
  heightLoadUnit: {
    marginLeft: 2,
    marginBottom: 2,
    fontSize: 10,
    textAlign: "center",
  },
  signaturesContainer: {
    border: "1px solid black",
    padding: 5,
    marginBottom: 10,
  },
  signaturesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "48%",
  },
  signatureHeader: {
    fontSize: "10px",
    fontWeight: "bold",
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    marginBottom: "4px",
    minHeight: 30,
  },
  signatureName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  signatureNameLabel: {
    fontSize: 9,
    fontWeight: "bold",
    width: "25%",
  },
  signatureNameValue: {
    borderBottom: "1px solid black",
    marginLeft: "4px",
    flexGrow: 1,
    textAlign: "center",
  },
  signatureImageContainer: {
    border: "1px solid black",
    marginLeft: 5,
    flexGrow: 1,
    width: 150,
    height: 75,
    textAlign: "center",
  },
  signatureImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  executorsTitle: {
    fontSize: "10px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fe8848",
    padding: 5,
    border: "1px solid black",
  },
  executorsText: {
    fontSize: 8,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  executorsTable: {
    display: "flex",
    width: "auto",
    marginBottom: 5,
  },
  executorsTableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#fe8848",
  },
  executorsTableHeaderCell: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    padding: "4px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "10px",
  },
  executorsTableCell: {
    padding: "4px",
    fontSize: "10px",
    Height: "55px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid black",
  },
  executorsSignatureCell: {
    height: "55px",
    borderRight: "1px solid black",
  },
  executorsSignatureImage: {
    padding: 5,
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

interface PdfDocumentProps {
  data: PermissionDownloadResponse["data"][0];
}

const PendingPermissionPdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  console.log("Critical tasks: ", data.criticalTasks);
  const documentsSupportWithAnswers = data.documentsSupport;
  const itemsCheckWithAnswers = data.answersCheckPermission;
  const signaturesExecutorsPermission = data.signaturesPermission.filter(
    (s) => s.role === "ejecutor"
  );
  const signaturesAuthorizerPermission = data.signaturesPermission.filter(
    (s) => s.role === "autorizador"
  );
  const signaturesCoordinatorPermission = data.signaturesPermission.filter(
    (s) => s.role === "coordinador"
  );

  // Helper function to render a single row of a table with 3 columns
  const renderDocumentRow = (document: any, colIndex: number) => {
    if (!document) {
      return (
        <React.Fragment key={`empty-${colIndex}`}>
          <View
            style={{ width: "8%", flexGrow: 1, borderRight: "1px solid black" }}
          ></View>
          <View style={{ width: "6%" }}></View>
          <View
            style={{
              width: "6%",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          ></View>
          <View style={{ width: "6%", borderRight: "1px solid black" }}></View>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={document.name}>
        <View
          style={[
            styles["tableCell"],
            {
              width: "8%",
              flexGrow: 1,
              borderRight: "1px solid black",
              flexShrink: 1,
            },
          ]}
        >
          <Text
            style={{
              textAlign: "left",
            }}
          >
            {document.name}
          </Text>
        </View>
        <View style={styles["tableCellCheck"]}>
          <Text>{document.response === "SI" ? "X" : ""}</Text>
        </View>
        <View
          style={[
            styles["tableCellCheck"],
            {
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            },
          ]}
        >
          <Text>{document.response === "NO" ? "X" : ""}</Text>
        </View>
        <View
          style={[styles["tableCellCheck"], { borderRight: "1px solid black" }]}
        >
          <Text>{document.response === "NA" ? "X" : ""}</Text>
        </View>
      </React.Fragment>
    );
  };

  const renderChecklistRow = (item: any, rowIndex: number) => {
    if (!item) return null;
    return (
      <View style={styles["tableRow"]} key={rowIndex}>
        <View style={{ width: "45%", borderRight: "1px solid black" }}>
          <Text style={styles["tableCell"]}>{item.verification}</Text>
        </View>
        <View style={{ width: "45%", borderRight: "1px solid black" }}>
          <Text style={[styles["tableCell"]]}>{item.aspect}</Text>
        </View>
        <View style={styles["tableCellCheck"]}>
          <Text>{item.response === "SI" ? "X" : ""}</Text>
        </View>
        <View
          style={[
            styles["tableCellCheck"],
            { borderLeft: "1px solid black", borderRight: "1px solid black" },
          ]}
        >
          <Text>{item.response === "NO" ? "X" : ""}</Text>
        </View>
        <View
          style={[styles["tableCellCheck"], { borderRight: "1px solid black" }]}
        >
          <Text>{item.response === "NA" ? "X" : ""}</Text>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles["page"]}>
        {/* Header */}
        <View style={styles["header"]}>
          <View style={styles["logoContainer"]}>
            <Image style={styles["logo"]} src={"/shield.png"} />
          </View>
          <View style={styles["headerTitleContainer"]}>
            <Text style={styles["headerTitle"]}>NOMBRE EMPRESA</Text>
            <Text style={styles["headerSubtitle"]}>SG-SST</Text>
            <Text style={styles["headerPermissionTitle"]}>
              PERMISO DE TRABAJO EN ALTURAS
            </Text>
          </View>
          <View style={styles["headerInfoContainer"]}>
            <View style={styles["headerInfoRow"]}>
              <Text style={styles["headerInfoLabel"]}>Versión:</Text>
              <Text> 01</Text>
            </View>
            <View style={styles["headerInfoRow"]}>
              <Text style={styles["headerInfoLabel"]}>Fecha:</Text>
              <Text> 20 - 09 - 2025</Text>
            </View>
            <View style={styles["headerInfoRowConsecutive"]}>
              <Text style={styles["headerInfoLabel"]}>Consecutivo:</Text>
              <Text style={styles["headerInfoValue"]}>{data.sequence}</Text>
            </View>
          </View>
        </View>

        {/* Datos Generales */}
        <View style={styles["section"]}>
          <View style={styles["row"]}>
            <Text style={styles["label"]}>CONTRATISTA:</Text>
            <Text style={styles["value"]}>{data.customer}</Text>
          </View>
          <View style={styles["row"]}>
            <Text style={styles["label"]}>FECHA:</Text>
            <Text style={styles["value"]}>
              {new Date(data.permissionStartDate).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles["row"]}>
            <Text style={styles["label"]}>DESCRIPCION DEL TRABAJO:</Text>
            <Text style={styles["value"]}>{data.description}</Text>
          </View>
        </View>

        {/* Otras Tareas Críticas Simultáneas */}

        <View style={styles["criticalTasksContainerOuter"]}>
          <Text style={styles["centeredTitle"]}>
            OTRAS TAREAS CRÍTICAS SIMULTÁNEAS
          </Text>
          <View style={styles["criticalTasksContainerInter"]}>
            <View style={styles["criticalTaskItem"]}>
              <Text style={styles["criticalTaskItemLabel"]}>
                TRABAJO EN CALIENTE
              </Text>
              <View style={styles["checkbox"]}>
                <Text>
                  {data.criticalTasks?.includes("Trabajo en caliente")
                    ? "X"
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles["criticalTaskItem"]}>
              <Text style={styles["criticalTaskItemLabel"]}>
                IZAJE DE CARGAS
              </Text>
              <View style={styles["checkbox"]}>
                <Text>
                  {data.criticalTasks?.includes("Izaje de cargas") ? "X" : ""}
                </Text>
              </View>
            </View>
            <View style={styles["criticalTaskItem"]}>
              <Text style={styles["criticalTaskItemLabel"]}>
                USO DE PRODUCTOS QUÍMICOS
              </Text>
              <View style={styles["checkbox"]}>
                <Text>
                  {data.criticalTasks?.includes("Uso de productos químicos")
                    ? "X"
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Documentos de Soporte Requeridos */}
        <View style={styles["table"]}>
          <Text style={styles["tableHeader"]}>
            DOCUMENTOS DE SOPORTE REQUERIDOS
          </Text>
          <View style={styles["tableRowHeader"]}>
            <Text
              style={[
                styles["tableHeaderCellCorner"],
                { width: "8%", flexGrow: 1 },
              ]}
            >
              REGISTRO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              SI
            </Text>
            <Text
              style={[styles["tableHeaderCellIntermediateNo"], { width: "6%" }]}
            >
              NO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              N/A
            </Text>

            <Text
              style={[
                styles["tableHeaderCellIntermediate"],
                { width: "8%", flexGrow: 1 },
              ]}
            >
              REGISTRO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              SI
            </Text>
            <Text
              style={[styles["tableHeaderCellIntermediateNo"], { width: "6%" }]}
            >
              NO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              N/A
            </Text>

            <Text
              style={[
                styles["tableHeaderCellIntermediate"],
                { width: "8%", flexGrow: 1 },
              ]}
            >
              REGISTRO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              SI
            </Text>
            <Text
              style={[styles["tableHeaderCellIntermediateNo"], { width: "6%" }]}
            >
              NO
            </Text>
            <Text
              style={[
                styles["tableHeaderCell"],
                {
                  width: "6%",
                },
              ]}
            >
              N/A
            </Text>
          </View>
          {Array.from(
            { length: Math.ceil(documentsSupportWithAnswers.length / 3) },
            (_, rowIndex) => (
              <View style={styles["tableRow"]} key={rowIndex}>
                {renderDocumentRow(
                  documentsSupportWithAnswers[rowIndex * 3],
                  0
                )}
                {renderDocumentRow(
                  documentsSupportWithAnswers[rowIndex * 3 + 1],
                  1
                )}
                {renderDocumentRow(
                  documentsSupportWithAnswers[rowIndex * 3 + 2],
                  2
                )}
              </View>
            )
          )}
        </View>

        {/* Altura y Carga Máxima */}
        <View style={styles["heightLoadContainer"]}>
          <View style={styles["heightLoadItem"]}>
            <Text style={styles["heightLoadLabel"]}>
              ALTURA MÁXIMA DE TRABAJO AUTORIZADA:
            </Text>
            <Text style={styles["heightLoadValue"]}>
              {parseInt(data.maxHeightAuthorized)}
            </Text>
            <Text style={styles["heightLoadUnit"]}>m</Text>
          </View>
          <View style={styles["heightLoadItem"]}>
            <Text style={styles["heightLoadLabel"]}>
              CARGA MÁXIMA DE TRABAJO AUTORIZADA:
            </Text>
            <Text style={styles["heightLoadValue"]}>
              {parseInt(data.maxLoadAuthorized)}
            </Text>
            <Text style={styles["heightLoadUnit"]}>Kg</Text>
          </View>
        </View>

        {/* Equipos de Protección Contra Caídas */}
        <View style={styles["table"]}>
          <Text style={styles["tableHeader"]}>
            EQUIPO DE PROTECCIÓN CONTRA CAÍDAS REQUERIDOS PARA LA TAREA
          </Text>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Puntos de anclaje</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Puntos de anclaje") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Mosquetones</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Mosquetones") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Descendedor</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Descendedor") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Mecanismos de anclaje</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Mecanismos de anclaje") ? "X" : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Eslinga para restricción</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Eslinga para restricción")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Ascendedor</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.fallElements.includes("Ascendedor") ? "X" : ""}</Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Líneas de vida horizontal cable</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Lineas de vida horizontal cable")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Eslinga para posicionamiento</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Eslinga para posicionamiento")
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Arrestador (freno)</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Arrestador (freno)") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Líneas de vida horizontal cuerda</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Lineas de vida horizontal cuerda")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Eslinga para detención</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Eslinga para detención")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Poleas</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.fallElements.includes("Poleas") ? "X" : ""}</Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Líneas de vida vertical cable</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Lineas de vida vertical cable")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Arnés integral de seguridad</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Arnes integral de seguridad")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Líneas de vida vertical cuerda</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Lineas de vida vertical cuerda")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Cuerda certificada para rescate</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.fallElements.includes("Cuerda certificada para rescate")
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* Equipos de Protección personal */}
        <View style={styles["table"]}>
          <Text style={styles["tableHeader"]}>
            ELEMENTOS DE PROTECCIÓN PERSONAL NECESARIAS PARA LA ACTIVIDAD
          </Text>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Casco con barbuquejo de 3 puntos</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes(
                  "Casco con barbuquejo de 3 puntos"
                )
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Guantes dieléctricos</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes(
                  "Guantes dieléctricos"
                )
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Protección respiratoria</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes(
                  "Protección respiratoria"
                )
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Botas de seguridad</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Botas de seguridad")
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Protección facial</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Protección facial")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Chaleco reflectivo</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Chaleco reflectivo")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Gafas de seguridad</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Gafas de seguridad")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Ropa de trabajo (overol)</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes(
                  "Ropa de trabajo (overol)"
                )
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Guantes de algodón</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Guantes de algodón")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Protección auditiva</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Proteccion auditiva")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Pantalla facial</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Pantalla facial")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Guantes de cuero</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Guantes de cuero")
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Careta de soldador</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Careta de soldador")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Impermeable</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("Impermeable")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("") ? "" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.personalProtectionElements.includes("") ? "" : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* SISTEMAS DE ACCESO, EQUIPOS Y ELEMENTOS DE SEGURIDAD REQUERIDOS PARA LA TAREA */}
        <View style={styles["table"]}>
          <Text style={styles["tableHeader"]}>
            SISTEMAS DE ACCESO, EQUIPOS Y ELEMENTOS DE SEGURIDAD REQUERIDOS PARA
            LA TAREA
          </Text>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Extintores</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Extintores") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Kit ambiental</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Kit ambiental") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Escaleras tipo tijera</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Escaleras tipo tijera")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Elementos para delimitación</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Elementos para delimitación")
                  ? "X"
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Kit Lava ojos</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Kit Lava ojos") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Escaleras extensibles</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Escalera extensibles")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Elementos de señalización</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Elementos de señalización")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Detector de gases</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Detector de gases") ? "X" : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Escaleras fijas</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Escaleras fijas") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Equipos de Comunicación</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Equipos de Comunicación")
                  ? "X"
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Andamios</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.accessElements.includes("Andamios") ? "X" : ""}</Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Elevadores</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Elevadores") ? "X" : ""}
              </Text>
            </View>
          </View>
          <View style={styles["tableRow"]}>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Botiquín</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.accessElements.includes("Botiquín") ? "X" : ""}</Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text>Grúas con canasta</Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>
                {data.accessElements.includes("Grúas con canasta") ? "X" : ""}
              </Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.accessElements.includes("") ? "" : ""}</Text>
            </View>
            <View
              style={[
                styles["tableCell"],
                { width: "38%", borderRight: "1px solid black" },
              ]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles["tableCellCheck"],
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>{data.accessElements.includes("") ? "" : ""}</Text>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles["page"]}>
        {/* Checklist */}
        <View style={[styles["table"], { marginBottom: 5 }]}>
          <Text style={styles["tableHeader"]}>
            LISTA DE CHEQUEO PARA PERMISO DE TRABAJO EN ALTURAS
          </Text>
          <View style={styles["tableRowHeader"]}>
            <Text style={[styles["tableHeaderCell"], { width: "45%" }]}>
              VERIFICACION IMPLEMENTACION
            </Text>
            <Text style={[styles["tableHeaderCellAspect"], { width: "45%" }]}>
              ASPECTO A TENER EN CUENTA
            </Text>
            <Text style={[styles["tableHeaderCell"], { width: "6%" }]}>SI</Text>
            <Text
              style={[styles["tableHeaderCellIntermediateNo"], { width: "6%" }]}
            >
              NO
            </Text>
            <Text style={[styles["tableHeaderCell"], { width: "6%" }]}>
              N/A
            </Text>
          </View>
          {itemsCheckWithAnswers.map(renderChecklistRow)}
        </View>

        {/* Datos del Ejecutor y/o Ejecutores */}
        <Text style={styles["executorsTitle"]}>
          DATOS DEL EJECUTOR Y/O EJECUTORES
        </Text>
        <Text style={styles["executorsText"]}>
          He entendido claramente el alcance y riesgos del trabajo y lo
          realizaré con todas las medidas de seguridad para realizar un trabajo
          seguro en altura. Manifiesto que estoy en óptimas condiciones de salud
          para desempeñar el trabajo en alturas.
        </Text>
        <View style={styles["executorsTable"]}>
          <View style={styles["tableRow"]}>
            <Text
              style={[styles["executorsTableHeaderCell"], { width: "35%" }]}
            >
              NOMBRE
            </Text>
            <Text
              style={[styles["executorsTableHeaderCell"], { width: "35%" }]}
            >
              C.C. N°
            </Text>
            <Text
              style={[styles["executorsTableHeaderCell"], { width: "30%" }]}
            >
              FIRMA
            </Text>
          </View>
          {signaturesExecutorsPermission.map((executor, index) => (
            <View style={styles["tableRow"]} key={index}>
              <Text
                style={[
                  styles["executorsTableCell"],
                  { width: "35%", textAlign: "center" },
                ]}
              >
                {executor.name}
              </Text>
              <Text
                style={[
                  styles["executorsTableCell"],
                  { width: "35%", textAlign: "center" },
                ]}
              >
                {executor.identification}
              </Text>
              <View
                style={[styles["executorsSignatureCell"], { width: "30%" }]}
              >
                <Image
                  src={executor.signature}
                  style={styles["executorsSignatureImage"]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Aprobación y Refrendación del Permiso */}
        <View style={styles["signaturesContainer"]}>
          <View style={styles["signaturesGrid"]}>
            <View style={styles["signatureBox"]}>
              <Text style={styles["signatureHeader"]}>
                DATOS DEL AUTORIZANTE
              </Text>
              <Text style={styles["signatureText"]}>
                He verificado las condiciones de seguridad y doy aprobación para
                ejecutar el trabajo seguro en alturas
              </Text>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>NOMBRE:</Text>
                <Text style={styles["signatureNameValue"]}>
                  {signaturesAuthorizerPermission[0]?.name}
                </Text>
              </View>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>C.C. N°:</Text>
                <Text style={styles["signatureNameValue"]}>
                  {signaturesAuthorizerPermission[0]?.identification}
                </Text>
              </View>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>FIRMA:</Text>
                <View style={styles["signatureImageContainer"]}>
                  <Image
                    src={signaturesAuthorizerPermission[0]?.signature}
                    style={styles["signatureImage"]}
                  />
                </View>
              </View>
            </View>

            <View style={styles["signatureBox"]}>
              <Text style={styles["signatureHeader"]}>
                DATOS DEL COORDINADOR DE ALTURAS
              </Text>
              <Text style={styles["signatureText"]}>
                He verificado las listas de chequeo que avalan este permiso y el
                alcance de los riesgos del trabajo en alturas y supervisaré que
                todas las medidas de seguridad sean implementadas para realizar
                un trabajo seguro en altura
              </Text>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>NOMBRE:</Text>
                <Text style={styles["signatureNameValue"]}>
                  {signaturesCoordinatorPermission[0]?.name}
                </Text>
              </View>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>C.C. N°:</Text>
                <Text style={styles["signatureNameValue"]}>
                  {signaturesCoordinatorPermission[0]?.identification}
                </Text>
              </View>
              <View style={styles["signatureName"]}>
                <Text style={styles["signatureNameLabel"]}>FIRMA:</Text>
                <View style={styles["signatureImageContainer"]}>
                  <Image
                    src={signaturesCoordinatorPermission[0]?.signature}
                    style={styles["signatureImage"]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export { PendingPermissionPdfDocument };
