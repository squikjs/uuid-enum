import { v4 as uuid } from "uuid";

function generateKeys(fields) {
  return [...new Set(fields.map((field) => field.toString()))];
}

function generateEnum(keys, values) {
  return Object.fromEntries(
    keys.map((_, i) => [keys[i], Array.isArray(values) ? values[i] : uuid()])
  );
}

export class Enum {
  constructor(fields) {
    if (!Array.isArray(fields))
      throw new TypeError("Expected array as fields type");

    Object.entries(generateEnum(generateKeys(fields))).forEach(
      ([k, v]) => (this[k] = v)
    );
  }

  freeze() {
    Object.freeze(this);
    return this;
  }

  exists(field) {
    return field.toString() in this;
  }

  get(field) {
    return this[field];
  }

  append(field) {
    this[field.toString()] = uuid();
    return this;
  }

  recreate() {
    Object.keys(this)
      .filter((f) => typeof f === "string")
      .forEach((f) => (this[f] = uuid()));

    return this;
  }

  delete(field) {
    delete this[field.toString()];
    return this;
  }
}
