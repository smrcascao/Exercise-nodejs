"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QueueScheduler_1 = require('rxjs/scheduler/QueueScheduler');
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
exports.isFirebaseRef = isFirebaseRef;
function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
exports.isFirebaseDataSnapshot = isFirebaseDataSnapshot;
function isAFUnwrappedSnapshot(value) {
    return typeof value.$key === 'string';
}
exports.isAFUnwrappedSnapshot = isAFUnwrappedSnapshot;
function isFirebaseQuery(value) {
    return typeof value.orderByChild === 'function';
}
exports.isFirebaseQuery = isFirebaseQuery;
function isEmptyObject(obj) {
    if (!isPresent(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
}
exports.isEmptyObject = isEmptyObject;
function unwrapMapFn(snapshot) {
    var unwrapped = isPresent(snapshot.val()) ? snapshot.val() : { $value: null };
    if ((/string|number|boolean/).test(typeof unwrapped)) {
        unwrapped = {
            $value: unwrapped
        };
    }
    unwrapped.$key = snapshot.ref.key;
    return unwrapped;
}
exports.unwrapMapFn = unwrapMapFn;
function checkForUrlOrFirebaseRef(urlOrRef, cases) {
    if (isString(urlOrRef)) {
        return cases.isUrl();
    }
    if (isFirebaseRef(urlOrRef)) {
        return cases.isRef();
    }
    if (isFirebaseQuery(urlOrRef)) {
        return cases.isQuery();
    }
    throw new Error('Provide a url or a Firebase database reference');
}
exports.checkForUrlOrFirebaseRef = checkForUrlOrFirebaseRef;
function stripTrailingSlash(value) {
    if (value.substring(value.length - 1, value.length) === '/') {
        return value.substring(0, value.length - 1);
    }
    else {
        return value;
    }
}
exports.stripTrailingSlash = stripTrailingSlash;
function stripLeadingSlash(value) {
    if (value.substring(0, 1) === '/') {
        return value.substring(1, value.length);
    }
    else {
        return value;
    }
}
exports.stripLeadingSlash = stripLeadingSlash;
var ZoneScheduler = (function (_super) {
    __extends(ZoneScheduler, _super);
    function ZoneScheduler(zone) {
        _super.call(this);
        this.zone = zone;
    }
    ZoneScheduler.prototype.schedule = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this.zone.run(function () { return _super.prototype.schedule.apply(_this, args); });
    };
    return ZoneScheduler;
}(QueueScheduler_1.QueueScheduler));
exports.ZoneScheduler = ZoneScheduler;
//# sourceMappingURL=utils.js.map