import { XMLValidator} from "fast-xml-parser";

export const xmlHelpers = {};

xmlHelpers.isXmlValid = (xmlContent) => {
  try {
    const result = XMLValidator.validate(xmlContent, {
      allowBooleanAttributes: true
    });

    return result === true;
  }
  catch (error) {
    console.error("Could not validate XML: " + JSON.stringify(error));
    return false;
  }
};