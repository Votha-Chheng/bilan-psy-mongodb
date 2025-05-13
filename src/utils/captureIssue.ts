// eslint-disable-next-line
export const captureIssue = (issuesList: any[]|undefined, key: string): boolean=> {
  if(issuesList && issuesList.length>0){
    const keyListe = issuesList.map(issue=> Object.keys(issue)[0])
    return keyListe.includes(key)
  }
  return false
}

// eslint-disable-next-line
export const getIssueMessage = (key: string, issuesList?: any[]): string|undefined=> {
  if(issuesList && issuesList?.length>0){
    const issue = issuesList.filter(issue=> Object.keys(issue)[0]===key)[0]
  
    return !issue  ? undefined : issue[key]
  }

  return undefined
}