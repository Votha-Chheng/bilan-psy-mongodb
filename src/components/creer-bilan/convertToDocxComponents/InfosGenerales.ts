import { PatientInfosGenerales } from "@/@types/PatientTypes";
import { getAge } from "@/utils/getAge";
import dayjs from "dayjs";
import { Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";

export const InfosGenerales = (infosGeneralesPatient: PatientInfosGenerales|null)=> {
  const {nom, prenom, sexe, dateNaissance, dateBilan} = infosGeneralesPatient ?? {}
  
  return new Table({
    width: {size: 100, type:WidthType.PERCENTAGE},
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {size: 100, type:WidthType.PERCENTAGE},
            margins: { top: 300, bottom: 300 },
            shading: { fill: "DDDDDD", type:"clear" },
            borders: {
              top: { style:"nil" }, // Pas de bordure en haut
              left: { style:"nil" }, // Pas de bordure à gauche
              bottom: { style:"nil" }, // Pas de bordure en bas
              right: { style:"nil" }, // Pas de bordure à droite
            },
            children: [
              new Paragraph({
                alignment: "center",
                children: [
                  new TextRun({
                    text: "COMPTE-RENDU DE BILAN PSYCHOMOTEUR",
                    font: "Calibri",
                    bold: true,
                    size: 32,
                  }),
                  new TextRun({
                    break: 1,
                  }),
                  new TextRun({
                    text: `${prenom} ${nom?.toUpperCase()}`,
                    font: "Calibri",
                    bold: true,
                    size: 30,
                  }),
                  new TextRun({
                    text: ` né${sexe === "f" ? "e" : ""} le ${dayjs(dateNaissance ?? "").format("DD/MM/YYYY")} (${getAge(dayjs(dateNaissance).format("DD/MM/YYYY") ?? "")})`,
                    font: "Calibri",
                    bold: true,
                    size: 30,
                  }),
                  new TextRun({
                    break: 1,
                  }),
                  new TextRun({
                    text: `Bilan effectué ${dateBilan ?? "DATE MANQUANTE"}` ,
                    font: "Calibri",
                    size: 30,
                  }),
                ]
              })
            ],
          }),
        ],
      }),
    ],
  })
}
  
