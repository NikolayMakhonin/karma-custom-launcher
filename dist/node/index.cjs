'use strict';

var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

function factory(injector, args) {
    const token = `launcher:${args.parent}`;
    args = Object.assign({}, args);
    delete args.parent;
    const locals = {
        args: ['value', args],
    };
    const plugin = injector.createChild([locals], [token]).get(token);
    ___default["default"].mergeWith(plugin, args);
    return plugin;
}
module.exports = {
    'launcher:Custom': ['factory', factory],
};
