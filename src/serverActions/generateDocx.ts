"use server"

import { Document, ImageRun, Packer, Paragraph } from "docx";
import { serverError } from "@/utils/serviceResponseError";
import { ServiceResponse } from "@/@types/ServiceResponse";
import { Title } from "@/components/creer-bilan/convertToDocxComponents/Title";
import { EnTete } from "@/components/creer-bilan/convertToDocxComponents/EnTete";
import { LineBreak } from "@/components/creer-bilan/convertToDocxComponents/ui/LineBreak";
import { PatientInfoDocx, PatientInfosGenerales } from "@/@types/PatientTypes";
import { InfosGenerales } from "@/components/creer-bilan/convertToDocxComponents/InfosGenerales";
import { DocumentConfidentiel } from "@/components/creer-bilan/convertToDocxComponents/DocumentConfidentiel";
import { SeparationLine } from "@/components/creer-bilan/convertToDocxComponents/ui/SeparationLine";
import { MotifConsultation } from "@/components/creer-bilan/convertToDocxComponents/MotifConsultation";
import { AnamneseDTO } from "@/@types/Anamnese";
import { GreyBgTitle } from "@/components/creer-bilan/convertToDocxComponents/ui/GreyBigTitle";
import { AntecedentsDocx, ProposDocx } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/antecedentsComponents";
import { generateAnamneseItemsParagraphs } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/generateAnamneseParagraphs";
import { seriesGenerales } from "@/datas/seriesForAnamneseDocx";
import { DevPsyDocx } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/devPsyDocxComponents";
import { generateDefaultParagraph, generateEmptyParagraph } from "@/components/creer-bilan/convertToDocxComponents/ui/ParagraphFunctions";
import { MotriciteDocx } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/motriciteComponents";
import { ScolariteDocx } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/scolariteComponents";
import { QuotidienDocx } from "@/components/creer-bilan/convertToDocxComponents/anamneseDocx/quotidienComponents";
import { TestsUtilisesDocx } from "@/components/creer-bilan/convertToDocxComponents/bilanDocx/TestUtilisesDocx";
import { BilanDTO } from "@/@types/BilanTests";
import { TableauCotation } from "@/components/creer-bilan/convertToDocxComponents/bilanDocx/TableauCotationDocx";
import { bilanSectionChildren } from "@/components/creer-bilan/convertToDocxComponents/bilanDocx/generateBilanSectionChildren";
import { ConclusionDTO } from "@/@types/ConclusionTypes";
import { ConclusionBodyDocx } from "@/components/creer-bilan/convertToDocxComponents/conclusionDocx/ConclusionBodyDocx";
import { GreyAmenagementsTitle } from "@/components/creer-bilan/convertToDocxComponents/amenagements/GreyAmenagementsTitle";
import { AmenagementItemDTO, AmenagementsGlobal } from "@/@types/AmenagementsTypes";
import { AmenagementsDocx } from "@/components/creer-bilan/convertToDocxComponents/amenagements/AmenagementsDocx";
import db from "@/utils/db";
import { returnArrayIfJson } from "@/utils/arrayFunctions";
import { fetchAllAmenagementItems, fetchManyAmenagementItems } from "./amenagementsAction";
import { Signature } from "@/components/creer-bilan/convertToDocxComponents/ui/Signature";

const fetchAllInfosForDocx = async(patientId: string): Promise<ServiceResponse<PatientInfoDocx|null>|undefined>=> {
  try {
    const [patientInfo, anamnese, bilan, conclusion, amenagements] = await db.$transaction([
      db.patient.findUnique({
        where: {
          id: patientId
        }
      }),
      db.anamnese.findUnique({
        where: {
          patientId
        },
        include: {
          bilansMedicauxResults: true
        }
      }),
      db.bilan.findUnique({
        where: {
          patientId
        },
        include: {
          bhk: true,
          mabc2: true,
          visuomotricenepsy2: true,
          praxiesgestuelles: true,
          imitationpositionsnepsy2: true,
          connaissancedroitegauche: true,
          flechesnepsy2: true,
          figuresreya: true,
          figuresreyb: true,
          epreuvecubesnepsy2: true,
        }
      }),
      db.conclusion.findUnique({
        where: {
          patientId
        }
      }),
      db.amenagements.findUnique({
        where: {
          patientId
        }
      })
    ])

    const anameneseParsed: AnamneseDTO = {
      ...anamnese,
      dossierMDPH: returnArrayIfJson(anamnese?.dossierMDPH ?? null),
      accouchement: returnArrayIfJson(anamnese?.accouchement ?? null),
      ageMarche: returnArrayIfJson(anamnese?.ageMarche ?? null),
      acquisitionLangage: returnArrayIfJson(anamnese?.acquisitionLangage ?? null),
      continence: returnArrayIfJson(anamnese?.continence ?? null),
      velo: returnArrayIfJson(anamnese?.velo ?? null),
      motriciteGlobale: returnArrayIfJson(anamnese?.motriciteGlobale ?? null),
      motriciteFine: returnArrayIfJson(anamnese?.motriciteFine ?? null),
      sensorialite: returnArrayIfJson(anamnese?.sensorialite ?? null),              
      apprentissages: returnArrayIfJson(anamnese?.apprentissages ?? null),
      outils: returnArrayIfJson(anamnese?.outils ?? null), 
      ecriture: returnArrayIfJson(anamnese?.ecriture ?? null),
      cartableBureau: returnArrayIfJson(anamnese?.cartableBureau ?? null),                    
      relationsPairs: returnArrayIfJson(anamnese?.relationsPairs ?? null),               
      comportement: returnArrayIfJson(anamnese?.comportement ?? null),                 
      attention: returnArrayIfJson(anamnese?.attention ?? null),                    
      sommeilQuotidien: returnArrayIfJson(anamnese?.sommeilQuotidien ?? null),           
      decritAuQuotidien: returnArrayIfJson(anamnese?.decritAuQuotidien ?? null),             
      autonomie: returnArrayIfJson(anamnese?.autonomie ?? null),             
      gestionEmotions: returnArrayIfJson(anamnese?.gestionEmotions ?? null),         
      gestionTemps: returnArrayIfJson(anamnese?.gestionTemps ?? null),
      temperament: returnArrayIfJson(anamnese?.temperament ?? null),
      bilansMedicauxResults: {
        id : anamnese?.bilansMedicauxResults?.id,
        bilanORL: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanORL ?? null) ?? undefined,
        bilanOphtalmo: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanOphtalmo ?? null) ?? undefined,
        bilanOrthophonique: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanOrthophonique ?? null) ?? undefined,
        bilanOrthoptique: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanOrthoptique ?? null) ?? undefined, 
        bilanNeuropsy: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanNeuropsy ?? null) ?? undefined, 
        bilanNeuropediatre: returnArrayIfJson(anamnese?.bilansMedicauxResults?.bilanNeuropediatre ?? null) ?? undefined,
        selectedBilans: returnArrayIfJson(anamnese?.bilansMedicauxResults?.selectedBilans ?? null) ?? undefined,
      } 
    }
    const bilanParsed: BilanDTO = {
      ...bilan,
      tests: returnArrayIfJson(bilan?.tests ?? null),
      bhk: {
        ...bilan?.bhk,
        tenueOutilScripteur: returnArrayIfJson(bilan?.bhk?.tenueOutilScripteur ?? null)
      },
    }

    const conclusionparsed: ConclusionDTO = {
      ...conclusion,
      profilPsy: returnArrayIfJson(conclusion?.profilPsy ?? null),
      projetPsy: returnArrayIfJson(conclusion?.projetPsy ?? null)
    } 

    let amenagementsItems: AmenagementItemDTO[]|null = null
    let categoriesList: string[]|null = null

    if(amenagements){
      const res = await fetchManyAmenagementItems(amenagements?.amenagementItemsIds)
      amenagementsItems = res.data ?? null
      const response = await fetchAllAmenagementItems()

      if(response.data){
        const categories = response.data.map(amenagementItem=> amenagementItem.category as string )
        const setOfCategories = Array.from(new Set(categories))
        categoriesList = setOfCategories ?? null
    }

    const amenagementsGlobal: AmenagementsGlobal = {
      amenagementsId: amenagements?.id ?? null,
      listAmenagementsItems: amenagementsItems,
      categoriesList
    }

    const data: PatientInfoDocx = {
      id: patientInfo?.id,
      nom: patientInfo?.nom  ?? null,
      prenom: patientInfo?.prenom  ?? null,
      dateNaissance: patientInfo?.dateNaissance  ?? null,
      adulte: patientInfo?.adulte ?? null,
      medecin: patientInfo?.medecin,
      motif: patientInfo?.motif,
      dateBilan: patientInfo?.dateBilan,
      createdAt: patientInfo?.createdAt ?? null, 
      updated: patientInfo?.updated ?? null,
      ecole: patientInfo?.ecole ?? null,
      sexe: patientInfo?.sexe,
      anamnese:anameneseParsed,
      bilan: bilanParsed,
      conclusion: conclusionparsed,
      amenagements: amenagementsGlobal
    }

    return {
      success: true,
      data
    }
  }
  } catch (error) {
    console.log("fetchAllInfosForDocx action", error)
    return serverError(error)
  }
}

async function getImageBuffer(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const imageUrl = `${baseUrl}/signature.png`;

export async function generateDocx(patientId: string): Promise<ServiceResponse<string|null>> {
  try {
    const imageBuffer = await getImageBuffer(imageUrl);
    const result = await fetchAllInfosForDocx(patientId)
    const {data} = result ?? {}
    const {anamnese: anamneseResults, bilan: bilanResults, conclusion: conclusionResults, amenagements: amenagementsGlobal} = data ?? {}

    const patientInfoGenerales: PatientInfosGenerales = {
      id: data?.id,
      nom: data?.nom ?? null,
      prenom: data?.prenom ?? null,
      dateNaissance: data?.dateNaissance ?? null,
      ecole: data?.ecole ?? null,
      sexe:  data?.sexe,
      adulte: data?.adulte ?? null,
      medecin: data?.medecin,
      motif: data?.motif,
      dateBilan: data?.dateBilan,
      createdAt: data?.createdAt ?? null,
      updated: data?.updated ?? null
    }
  
    const doc = new Document({
      numbering: {
        config: [{
          reference: "bullet-list",
          levels: [
            {
              level: 0,
              format: "bullet",
              text: "–",
              alignment: "left",
              style: {
                paragraph: {
                  indent: {
                    left: 720,
                    hanging: 360
                  }
                }
              }
            },
            {
              level: 1,
              format: "bullet",
              text: "◦",
              alignment: "left",
              style: {
                paragraph: {
                  indent: {
                    left: 950,
                    hanging: 200
                  }
                }
              }
            },
            // Vous pouvez définir d'autres niveaux si besoin
          ],
        }]
      },
      sections: [
        { 
          properties: {
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            Title, 
            EnTete, 
            LineBreak(1), 
            InfosGenerales(patientInfoGenerales), 
            DocumentConfidentiel(patientInfoGenerales?.medecin ?? null),
            SeparationLine(10),
            LineBreak(1), 
            MotifConsultation(patientInfoGenerales?.motif ?? null)
          ] 
        },
        {
          properties: {
            type:"continuous",
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            LineBreak(1),
            GreyBgTitle("ANAMNÈSE"),
            ProposDocx(anamneseResults ?? null) ?? generateEmptyParagraph(),
            ...generateAnamneseItemsParagraphs(anamneseResults, seriesGenerales(anamneseResults ?? null), "Informations générales"),
            ...AntecedentsDocx(anamneseResults ?? null),
            ...DevPsyDocx(anamneseResults ?? null),
            ...MotriciteDocx(anamneseResults ?? null),
            ...ScolariteDocx(anamneseResults ?? null),
            ...QuotidienDocx(anamneseResults ?? null)
          ]
        },
        //Bilan-Tests ***********************************
        {
          properties: {
            type:"continuous",
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            LineBreak(2),
            GreyBgTitle("BILAN"),
            TestsUtilisesDocx(bilanResults ?? null),
            TableauCotation,
            ...bilanSectionChildren(bilanResults ?? null)
          ]
        },
        //Conclusion ***********************************
        {
          properties: {
            type:"continuous",
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            LineBreak(2),
            GreyBgTitle("CONCLUSION"),
            LineBreak(1),
            ...ConclusionBodyDocx(conclusionResults ?? null),
            LineBreak(2),
            generateDefaultParagraph("Je reste à votre disposition pour tout renseignement complémentaire.", {indent: {firstLine: 300}}),
            LineBreak(3),
            Signature,
          ]
        },
        {
          properties: {
            type:"continuous",
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            new Paragraph({
              indent: {right: 300},
              alignment: "right",
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: { width: 200, height: 100 },
                  // eslint-disable-next-line
                } as any),
              ],
            }),
          ]
        },
  
        //ANNEXE et AMENAGEMENTS ***********************************
        {
          properties: {
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            GreyAmenagementsTitle(`${patientInfoGenerales?.prenom} ${patientInfoGenerales?.nom?.toUpperCase()}`),
            LineBreak(1),
            ...AmenagementsDocx(amenagementsGlobal ?? null),
            LineBreak(2),
            generateDefaultParagraph("Je reste à votre disposition pour tout renseignement complémentaire.", {indent: {firstLine: 300}}),
            LineBreak(3),
            Signature,
          ]
        },
        {
          properties: {
            type:"continuous",
            page: {
              margin: {
                top: 800,
                bottom: 1000,
                left: 1000,
                right: 1000,
              }
            }
          },
          children: [
            new Paragraph({
              indent: {right: 300},
              alignment: "right",
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: { width: 200, height: 100 },
                  // eslint-disable-next-line
                } as any),
              ],
            }),
          ]
        },
      ],
    });
  
  
    // Générer le fichier sous forme de buffer
    const buffer = await Packer.toBuffer(doc);
  
    // Convertir en Base64 (évite les corruptions)
    return {
      success: true,
      data:Buffer.from(new Uint8Array(buffer)).toString("base64")
    }

  } catch (error:unknown) {
    console.log("generateDocx action", error)
    return serverError(error)
    
  }
  
}


