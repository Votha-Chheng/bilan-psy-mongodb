import { AnamneseResults } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { serverError } from "@/utils/serviceResponseError"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest): Promise<NextResponse> {
  let keys = request.nextUrl.searchParams.get("keys")
  if (!keys) {
    return NextResponse.json({
      success: false,
      message: "Aucun domaine spécifié pour la récupération des données.",
    })
  }
  const parsedKeys: string[] = JSON.parse(keys)
  let serviceReponse: ServiceResponse<AnamneseResults[]|null> = {data: null}

 const selectObject = parsedKeys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {patientId: true} as Record<string, boolean>)

  const whereObject = parsedKeys.reduce((acc, key) => {
    acc[key] = { not: null };
    return acc;
  }, {} as Record<string, { not: null }>);

  try {
    const res = await db.anamnese.findMany({
      select: selectObject,
      where: whereObject
    })

    const datasArray = res.map((record: Record<string, string>) => {
      const newRecord = {...record}
      if ("acquisitionLangage" in newRecord){
        newRecord["acquisitionLangage"] = JSON.parse(record["acquisitionLangage"]) 
      }
      if ("motriciteGlobale" in newRecord){
        newRecord["motriciteGlobale"] = JSON.parse(record["motriciteGlobale"]) 
      }
      if ("motriciteFine" in newRecord){
        newRecord["motriciteFine"] = JSON.parse(record["motriciteFine"]) 
      }
      if ("velo" in newRecord){
        newRecord["velo"] = JSON.parse(record["velo"]) 
      }
      if ("sensorialite" in newRecord){
        newRecord["sensorialite"] = JSON.parse(record["sensorialite"]) 
      }
      if ("apprentissages" in newRecord){
        newRecord["apprentissages"] = JSON.parse(record["apprentissages"]) 
      }
      if ("outils" in newRecord){
        newRecord["outils"] = JSON.parse(record["outils"]) 
      }
      if ("ecriture" in newRecord){
        newRecord["ecriture"] = JSON.parse(record["ecriture"]) 
      }
      if ("relationsPairs" in newRecord){
        newRecord["relationsPairs"] = JSON.parse(record["relationsPairs"]) 
      }
      if ("comportement" in newRecord){
        newRecord["comportement"] = JSON.parse(record["comportement"]) 
      }
      if ("attention" in newRecord){
        newRecord["attention"] = JSON.parse(record["attention"]) 
      }
      if ("decritAuQuotidien" in newRecord){
        newRecord["decritAuQuotidien"] = JSON.parse(record["decritAuQuotidien"]) 
      }
      if ("temperament" in newRecord){
        newRecord["temperament"] = JSON.parse(record["temperament"]) 
      }
      if ("sommeilQuotidien" in newRecord){
        newRecord["sommeilQuotidien"] = JSON.parse(record["sommeilQuotidien"]) 
      }
      if ("gestionEmotions" in newRecord){
        newRecord["gestionEmotions"] = JSON.parse(record["gestionEmotions"]) 
      }
      if ("gestionTemps" in newRecord){
        newRecord["gestionTemps"] = JSON.parse(record["gestionTemps"]) 
      }
      return newRecord
    })

    serviceReponse = {
      success: true,
      data: datasArray as unknown as AnamneseResults[],
      message: "Descriptions récupérées avec succès."
    }

    return NextResponse.json(serviceReponse)
  } catch (error) {
    console.log("Error in fetchAnamneseDescriptionByDomaine", error)
    serviceReponse = serverError(error, "Erreur lors de la récupération des descriptions.")
    return NextResponse.json(serviceReponse)
  }
}