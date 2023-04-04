export const fillTemplate = function (templateString: string, templateVars: any) {
  var func = new Function(...Object.keys(templateVars), 'return `' + templateString + '`;');
  return func(...Object.values(templateVars));
};
