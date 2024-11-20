# pub-sub-map

[![npm version](https://img.shields.io/npm/v/pub-sub-map)](https://www.npmjs.com/package/pub-sub-map)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pub-sub-map)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pub-sub-map)](https://bundlephobia.com/package/pub-sub-map)
[![dependencies](https://img.shields.io/librariesio/release/npm/pub-sub-map)](https://github.com/dmnsgn/pub-sub-map/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pub-sub-map)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/pub-sub-map)](https://github.com/dmnsgn/pub-sub-map/blob/main/LICENSE.md)

A minimal, namespaced pub-sub implementation with optional data storing on publish and data retrieval on subscribe.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

## Installation

```bash
npm install pub-sub-map
```

## Usage

```js
import pubSubMap from "pub-sub-map";

const ON = "on";
const OFF = "off";
const NAMESPACE = "LIGHT";

const pubSub = pubSubMap.get(NAMESPACE);

// Listen for light state (before any pubish())
const unsubscribe = pubSub.subscribe("switch", (value) => {
  console.log(value);
  // 1. => value === ON
});

// 1. Turn the light on, storing the value
pubSub.publish("switch", ON, true);

// Unsubscribe the first callback
unsubscribe();

// Listen for light state and retrieve the current state immediately (callback on subscribe() and subsequent publish())
pubSub.subscribe(
  "switch",
  (value) => {
    console.log(value);
    // 1. => value === ON
    // 2. => value === OFF
  },
  true,
);

// Listen for light state without checking current state (callback on subsequent publish)
pubSub.subscribe("switch", (value) => {
  console.log(value);
  // => 2. value === OFF
});

// 2. Turn the light off
pubSub.publish("switch", OFF, true);
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_pub-sub-map">pub-sub-map</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#PubSub">PubSub</a></dt>
<dd></dd>
<dt><a href="#PubSubMap">PubSubMap</a></dt>
<dd></dd>
</dl>

<a name="module_pub-sub-map"></a>

## pub-sub-map

**Summary**: Export a PubSubMap instance.

- [pub-sub-map](#module_pub-sub-map)
  - [.exports.PubSub](#module_pub-sub-map.exports.PubSub) : [<code>PubSub</code>](#PubSub)
  - [.exports.PubSubMap](#module_pub-sub-map.exports.PubSubMap) : [<code>PubSubMap</code>](#PubSubMap)

<a name="module_pub-sub-map.exports.PubSub"></a>

### pub-sub-map.exports.PubSub : [<code>PubSub</code>](#PubSub)

Create a world object to store entities and systems.

**Kind**: static class of [<code>pub-sub-map</code>](#module_pub-sub-map)
<a name="module_pub-sub-map.exports.PubSubMap"></a>

### pub-sub-map.exports.PubSubMap : [<code>PubSubMap</code>](#PubSubMap)

Extend a Map object to automate getting a namespaced PubSub instance on pubSubMap.get(namespace).

**Kind**: static class of [<code>pub-sub-map</code>](#module_pub-sub-map)
<a name="PubSub"></a>

## PubSub

**Kind**: global class

- [PubSub](#PubSub)
  - [.publish(type, value, store)](#PubSub+publish)
  - [.subscribe(type, cb, retrieve)](#PubSub+subscribe) ⇒ <code>function</code>

<a name="PubSub+publish"></a>

### pubSub.publish(type, value, store)

Broadcast value to all subscribers identified by "type".
Optionally store it for subsequent subscribers to retrieve it immediately.

**Kind**: instance method of [<code>PubSub</code>](#PubSub)

| Param | Type                 |
| ----- | -------------------- |
| type  | <code>string</code>  |
| value | <code>\*</code>      |
| store | <code>boolean</code> |

<a name="PubSub+subscribe"></a>

### pubSub.subscribe(type, cb, retrieve) ⇒ <code>function</code>

Listen for published update identified by "type".
Optionally retrieve the current state on creation (ie. call cb(storedValue)).

**Kind**: instance method of [<code>PubSub</code>](#PubSub)
**Returns**: <code>function</code> - Call to stop listening.

| Param    | Type                  |
| -------- | --------------------- |
| type     | <code>string</code>   |
| cb       | <code>function</code> |
| retrieve | <code>boolean</code>  |

<a name="PubSubMap"></a>

## PubSubMap

**Kind**: global class
<a name="PubSubMap+get"></a>

### pubSubMap.get(key) ⇒ [<code>PubSub</code>](#PubSub)

Get a namespaced instance of PubSub.

**Kind**: instance method of [<code>PubSubMap</code>](#PubSubMap)

| Param | Type                | Description                                           |
| ----- | ------------------- | ----------------------------------------------------- |
| key   | <code>string</code> | The key of the element to return from the Map object. |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/pub-sub-map/blob/main/LICENSE.md).
