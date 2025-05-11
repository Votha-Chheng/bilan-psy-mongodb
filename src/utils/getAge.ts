
export const getAge = (birthFormatDDMMYYYY: string): string => {
  // Extraction du jour, mois et année depuis la chaîne
  const [jour, mois, annee] = birthFormatDDMMYYYY.split("/").map(Number);
  
  // Création d'un objet Date pour la date de naissance
  const dateNaissance = new Date(annee, mois - 1, jour);
  const maintenant = new Date();

  // Calcul de l'écart en années
  let ageAnnees = maintenant.getFullYear() - dateNaissance.getFullYear();
  let ageMois = maintenant.getMonth() - dateNaissance.getMonth();

  // Ajuster l'âge si le mois actuel est antérieur au mois de naissance
  // ou s'ils sont dans le même mois mais que le jour actuel est antérieur au jour de naissance
  if (ageMois < 0 || (ageMois === 0 && maintenant.getDate() < dateNaissance.getDate())) {
    ageAnnees--;
    ageMois = (ageMois + 12) % 12;
  } else {
    // Si le jour courant est inférieur au jour de naissance, on retire un mois
    if (maintenant.getDate() < dateNaissance.getDate()) {
      ageMois--;
    }
  }

  return `${ageAnnees} ${ageAnnees<2 ? "an":"ans"} ${ageMois>0 && ageMois+" mois"}`
}