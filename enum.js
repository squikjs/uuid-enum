import { v4 as uuid } from "uuid";

/**
 * Removes duplicates from fields and converts every element to string.
 * @param {Array} fields Fields of the enum.
 * @returns {Array<string>}
 */
function generateKeys(fields) {
  return [...new Set(fields.map((field) => field.toString()))];
}

/**
 * Creates a enum with uuid's as values and fields as keys.
 * @param {Array<string>} fields Fields of the enum.
 * @returns {Object}
 */
function generateEnum(fields) {
  return Object.fromEntries(fields.map((_, i) => [fields[i], uuid()]));
}

export class Enum {
  /**
   * Creates an enum with uuid support for more robust enums.
   * @param {Array<string>} fields The fields of your enum.
   */
  constructor(fields) {
    if (!Array.isArray(fields))
      throw new TypeError("Expected array as fields type");

    Object.entries(generateEnum(generateKeys(fields))).forEach(
      ([k, v]) => (this[k] = v)
    );
  }

  /**
   *  Freezes the enum, so that values cant be reassigned or changed. You also can't use "append", "recreate" or "delete" functions when you freeze and enum.
   * @returns {Enum}
   */
  freeze() {
    Object.freeze(this);
    return this;
  }

  /**
   * Check if field exists in enum.
   * @param {string} field Field to check existence.
   * @returns {boolean}
   */
  exists(field) {
    return field.toString() in this;
  }

  /**
   * Gets the uuid of a field.
   * @param {string} field Field to get uuid of.
   * @returns {uuid.v4}
   */
  get(field) {
    return this[field];
  }

  /**
   * Appends a field.
   * @param {string} field Field to append.
   * @returns {Enum}
   */
  append(field) {
    this[field.toString()] = uuid();
    return this;
  }

  /**
   * Deletes a field.
   * @param {string} field Field to delete.
   * @returns {Enum}
   */
  delete(field) {
    delete this[field.toString()];
    return this;
  }

  /**
   * Recreates the enum by refreshing uuid's.
   * @returns {Enum}
   */
  recreate() {
    Object.keys(this)
      .filter((f) => typeof f === "string")
      .forEach((f) => (this[f] = uuid()));

    return this;
  }
}
