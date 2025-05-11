import { Table } from "docx";
import { generateRow } from "../docxUtils";
import { blue, green, red, yellow } from "@/datas/fillColors";

export const TableauCotation = new Table({
  width: {
    size:100,
    type: "pct"
  },
  rows: [
    generateRow([
      {
        bold: true,
        text: "Cotation",
        size: 22,
        cellWidth: 22,
        alignment: "center"
      },
      {
        text: "Déviation standard (DS)",
        size: 22,
        cellWidth: 26,
        alignment: "center"
      },
      {
        size: 22,
        alignment: "center",
        text: "Percentiles"
      },
      {
        size: 22,
        text: "Note Standard (NS)",
        alignment: "center",
        cellWidth: 26
      },
    ]),
    generateRow([
      {
        text: "Au-dessus du niveau attendu",
        size: 22,
        cellWidth: 22,
      },
      {
        text: "> 1DS",
        size: 22,
        cellWidth: 26,
        fill: blue,
        alignment: "center"
      },
      {
        size: 22,
        text: "> 75ème",
        cellWidth: 26,
        fill: blue,
        alignment: "center"
      },
      {
        size: 22,
        text: "> 12",
        cellWidth: 26,
        fill: blue,
        alignment: "center"
      },
    ]),
    generateRow([
      {
        text: "Au niveau attendu",
        size: 22,
        cellWidth: 22,
      },
      {
        text: "-1DS < Score < 1DS",
        size: 22,
        cellWidth: 26,
        fill: green,
        alignment: "center"
      },
      {
        size: 22,
        text: "25ème < Score < 75ème",
        cellWidth: 26,
        fill: green,
        alignment: "center"
      },
      {
        size: 22,
        text: "7 < Score < 12",
        cellWidth: 26,
        fill: green,
        alignment: "center"
      },
    ]),
    generateRow([
      {
        text: "En-dessous du niveau attendu",
        size: 22,
        cellWidth: 22,
      },
      {
        text: "< -1DS",
        size: 22,
        cellWidth: 26,
        fill: yellow,
        alignment: "center"
      },
      {
        size: 22,
        text: "< 25ème",
        cellWidth: 26,
        fill: yellow,
        alignment: "center"
      },
      {
        size: 22,
        text: "< 7",
        cellWidth: 26,
        fill: yellow,
        alignment: "center"
      },
    ]),
    generateRow([
      {
        text: "Pathologique",
        size: 22,
        cellWidth: 22,
      },
      {
        text: "≤ -2DS",
        size: 22,
        cellWidth: 26,
        fill: red,
        alignment: "center"
      },
      {
        size: 22,
        text: "≤ 15ème",
        cellWidth: 26,
        fill: red,
        alignment: "center"
      },
      {
        size: 22,
        text: "≤ 4",
        cellWidth: 26,
        fill: red,
        alignment: "center"
      },
    ]),
  ]
})