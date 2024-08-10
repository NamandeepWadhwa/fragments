// Use crypto.randomUUID() to create unique IDs, see:
// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
const { randomUUID } = require('crypto');
// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');


class Fragment {
  constructor({ id, ownerId, created, updated, type, size = 0 }) {
    if (!ownerId || !type || !Fragment.isSupportedType(type) || size < 0 || !(typeof size ==="number"))
      {
      throw new Error('ownerId is required');
    };
    

    this.id = id || randomUUID();
    this.ownerId = ownerId;
    this.created = created || new Date().toISOString();
    this.updated = updated || this.created;
    this.type = type;
    this.size = size;

  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
   
    // TODO
    return  listFragments(ownerId, expand);

  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    // TODO
    const res=await  readFragment(ownerId, id);
    if (res===undefined){
      throw new Error('Fragment not found');
    }
    return new Fragment(res);
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<void>
   */
  static delete(ownerId, id) {
    // TODO
    return deleteFragment(ownerId, id);
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise<void>
   */
  save() {
    // TODO
    this.updated = new Date().toISOString();
    return  writeFragment(this);
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
   getData() {
    // TODO
    return readFragmentData(this.ownerId, this.id);
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise<void>
   */
  async setData(data) {
    if(!data){
      throw new Error('data is required');
    }
    this.size = data.length;

    // TODO
    this.updated = new Date().toISOString();
    return writeFragmentData(this.ownerId, this.id, data);
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */
  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  get isText() {
    // TODO
    if (this.mimeType.startsWith('text/')) {
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  get formats() {
    // TODO
    return [this.mimeType];
  }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
   
   
    
try {
  // Parse the content-type value
  const { type, parameters = {} } = contentType.parse(value);

  // Define supported content types
  const supportedTypes = [
    'text/plain',
    'text/markdown',
    'text/html',
    'text/csv',
    'application/json',
    'application/yaml',
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/avif',
    'image/gif',
  ];

  // Check if the type is in the list of supported types
  const isSupportedType = supportedTypes.includes(type);

 const charset = parameters.charset;
 const isUtf8 = charset ? charset.toLowerCase() === 'utf-8' : true; // charset is optional

 // Return true if the type is supported and charset is valid if provided
 return isSupportedType && isUtf8;
} catch (e) {
  // If there's an error parsing, it's not a supported type
  console.error(e);
  return false;
} 
  }
}

module.exports.Fragment = Fragment;
