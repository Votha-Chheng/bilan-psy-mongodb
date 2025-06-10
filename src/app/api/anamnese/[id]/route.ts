import { AnamneseRawData, AnamneseResults, BilanMedicauxResults } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }>}): Promise<NextResponse> {
  const {id: patientId} = await context.params
  let serviceReponse: ServiceResponse<AnamneseRawData|null> = {data: null}

  try {
    const res = await db.anamnese.findUnique({
      where: {
        patientId
      },
      select: {
        id: true,
        notesBrutes: true,
        patientId: true,
        proposPapaOuMaman: true,
        fratrie: true,
        compositionFamiliale: true,
        neant: true,
        dossierMDPH: true,
        maladiesEventuelles: true,
        accompagnementSuivi: true,
        autresAntecedents: true,
        handicap: true,
        confereDevPsy: true,
        accouchement: true,                       //<-- JSON tranformé en string[] côté serveur
        grossesse: true,
        stationAssise: true,
        quadrupedie: true,
        alimentation: true,
        autresDevPsy: true,
        ageMarche: true,                           //<-- JSON tranformé en string[] côté serveur
        acquisitionLangage: true,                  //<-- JSON tranformé en string[] côté serveur
        continence : true,                        //<-- JSON tranformé en string[] côté serveur
        velo: true,                              //<-- JSON tranformé en string[] côté serveur
        motriciteGlobale: true,                      //<-- JSON tranformé en string[] côté serveur
        motriciteFine: true,                     //<-- JSON tranformé en string[] côté serveur
        praxiesGestuelles: true,
        sensorialite: true,                  //<--- JSON de type string[type, commentaires] transformé coté serveur   
        extraScolaire: true,
        autresMotricite: true,
        classe : true,
        apprentissages: true, 
        outils : true,                       //<--- JSON de type string[type, commentaires] transformé coté serveur  
        ecriture: true,                        //<--- JSON de type [niveau, douleurs, observations] transformé coté serveur 
        cartableBureau: true,
        relationsPairs: true,                  //<--- JSON de type [sociable ou pas, observations] transformé coté serveur 
        comportement : true,                   //<---JSON [observations, suite d'adjectifs...]
        attention : true,                      //<---JSON [attentif, observations]
        cahiers : true,
        anterieur: true,
        sommeilQuotidien: true,             //<---- [dort seul, difficultés à s'endormair, observations]
        decritAuQuotidien: true,             //<---- [commentaires, suite de descriptions...]
        autonomie:true,                      //<---- [commentaires, suite de descriptions...]
        ecouteConsignes: true,
        agitationMotrice: true,
        devoirs : true,
        gestionEmotions: true,                  //<--------- [difficultés, observations] 
        gestionTemps: true,                     //<--------- [difficultés, observations] 
        temperament: true,                      //<--------- [temperament, observations] 
        alimentationQuotidien: true, 
        autresQuotidien: true,
      },
    })
    
    if(!res){
      serviceReponse = dataBaseError("Anamnèse introuvable.")
      return NextResponse.json(serviceReponse)
    }
    
    serviceReponse = {
      success: true,
      data: res
    }

    return NextResponse.json(serviceReponse)
    
  } catch (error) {
    console.log("Error in fetchAnamneseResultsByPatientId", error)
    serviceReponse = serverError(error, "Erreur lors de l'accès à la base de données.")
    return NextResponse.json(serviceReponse)
  }
}