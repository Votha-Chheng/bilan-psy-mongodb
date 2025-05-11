export const camelCaseToNormal=(camelCaseString: string): string=> {
  if (!camelCaseString) return camelCaseString;
  // On insère un espace avant chaque lettre majuscule et on convertit tout en minuscules
  const sentence = camelCaseString.replace(/([A-Z])/g, ' $1').toLowerCase();
  // On met la première lettre en majuscule et on retourne le résultat
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export const normalToCamelCase = (sentence: string): string=> {
  if (!sentence) return "";
  // Mettre toute la phrase en minuscules et séparer les mots
  const words = sentence
    .toLowerCase()
    .split(/[\s_-]+/);
  
  // Transformer chaque mot à partir du second en mettant la première lettre en majuscule
  const camelCased = words.map((word, index) =>
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  );
  
  // Joindre les mots sans espace
  return camelCased.join('');
}

export const convertToHtml = (text: string|null|undefined) => {
  if(!text) return ""
  const html = text.replace(/\n/g, '<br />')
  return html
}

export const getWeekDayFR = (date: Date): string=> {
  const dateString = date.toDateString()

  const weekDay = dateString.split(" ")[0]

  switch(weekDay){
    case "Mon": return "lundi"
    case "Tue": return "mardi"
    case "Wed": return "mercredi"
    case "Thu": return "jeudi"
    case "Fri": return "vendredi"
    case "Sat": return "samedi"
    case "Sun": return "dimanche"
    default : return ""
  }
}

