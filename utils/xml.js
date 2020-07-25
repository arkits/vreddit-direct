const xmlParser = require('fast-xml-parser');
const he = require('he');

var options = {
    attributeNamePrefix: '@_',
    attrNodeName: 'attr', //default is 'false'
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: '__cdata', //default is 'false'
    cdataPositionChar: '\\c',
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ['parse-me-as-string']
};

function xmlToJson(xmlData) {
    if (xmlParser.validate(xmlData) === true) {
        //optional (it'll return an object in case it's not valid)
        var jsonObj = xmlParser.parse(xmlData, options);
    }

    return jsonObj;
}

module.exports = xmlToJson;
