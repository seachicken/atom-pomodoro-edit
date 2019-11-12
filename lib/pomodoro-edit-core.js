'use babel';

export default class Core {
  
  findSymbol(text) {
    return text.match(/^\[p[0-9].*\]/m);
  }
}