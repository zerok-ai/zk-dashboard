import queryString from 'query-string';

export const fillTemplate = function (templateString: string, templateVars: any) {
  var func = new Function(...Object.keys(templateVars), 'return `' + templateString + '`;');
  return func(...Object.values(templateVars));
};

export const stripNS = (nameStr: string) => {
  return nameStr.split('/')[1];
};

export const getWorkloadName = (nameStr: string) => {
  return stripNS(nameStr)?.split('-')[0];
};

export const getFormattedServiceName = (nameStr: string) => {
  try {
    let namesObj = JSON.parse(nameStr);
    nameStr = namesObj.map((itemName: string) => stripNS(itemName)).join(', ');
    return nameStr;
  } catch (err) {}
  return stripNS(nameStr);
};

export const getNamespace = (nameStr: string) => {
  try {
    let namesObj = JSON.parse(nameStr);
    nameStr = namesObj[0];
  } catch (err) {}
  return nameStr.split('/')[0];
};

export const stringWithoutComments = (s: string) => {
  return s.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');
};

export const JSONParseHandler = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    return jsonStr;
  }
};

export const isJsonStr = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
};

export const getPartsOfPath = (pathStr: string) => {
  const pathParts = pathStr.split('?');
  return {
    path: pathParts[0],
    params: JSON.stringify(queryString.parse(pathParts[1]))
  };
};
