/**
 * Create a world object to store entities and systems.
 * @memberof module:pub-sub-map
 * @type {PubSub}
 * @class
 */
class PubSub {
  subscribers = {};
  data = new Map();

  /**
   * Broadcast value to all subscribers identified by "type".
   * Optionally store it for subsequent subscribers to retrieve it immediately.
   * @param {string} type
   * @param {*} value
   * @param {boolean} store
   */
  publish(type, value, store) {
    if (store) this.data.set(type, value);
    this.subscribers[type]?.forEach((cb) => cb(value));
  }

  /**
   * Listen for published update identified by "type".
   * Optionally retrieve the current state on creation (ie. call cb(storedValue)).
   * @param {string} type
   * @param {Function} cb
   * @param {boolean} retrieve
   * @returns {Function} Call to stop listening.
   */
  subscribe(type, cb, retrieve) {
    this.subscribers[type] ||= new Set();
    this.subscribers[type].add(cb);
    if (retrieve) cb(this.data.get(type));
    return () => this.subscribers[type]?.delete(cb);
  }
}

/**
 * Extend a Map object to automate getting a namespaced PubSub instance on pubSubMap.get(namespace).
 * @memberof module:pub-sub-map
 * @class
 * @type {PubSubMap}
 */
class PubSubMap extends Map {
  /**
   * Get a namespaced instance of PubSub.
   * @param {string} key The key of the element to return from the Map object.
   * @returns {PubSub}
   */
  get(key) {
    if (!this.has(key)) this.set(key, new PubSub());
    return super.get(key);
  }
}

export {
  /** @class */
  PubSub,
  /** @class */
  PubSubMap,
};

/**
 * @module pub-sub-map
 *
 * @summary
 * Export a PubSubMap instance.
 */
export default new PubSubMap();
