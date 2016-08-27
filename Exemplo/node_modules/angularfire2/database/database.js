"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var tokens_1 = require('../tokens');
var index_1 = require('./index');
var utils = require('../utils');
var index_2 = require('./index');
var AngularFireDatabase = (function () {
    function AngularFireDatabase(fbConfig, fbApp) {
        this.fbConfig = fbConfig;
        this.fbApp = fbApp;
    }
    AngularFireDatabase.prototype.list = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return index_1.FirebaseListFactory(_this.fbApp.database().refFromURL(getAbsUrl(_this.fbConfig, urlOrRef)), opts); },
            isRef: function () { return index_1.FirebaseListFactory(urlOrRef); }
        });
    };
    AngularFireDatabase.prototype.object = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return index_2.FirebaseObjectFactory(_this.fbApp.database().refFromURL(getAbsUrl(_this.fbConfig, urlOrRef)), opts); },
            isRef: function () { return index_2.FirebaseObjectFactory(urlOrRef); }
        });
    };
    AngularFireDatabase.decorators = [
        { type: core_1.Injectable },
    ];
    AngularFireDatabase.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [tokens_1.FirebaseConfig,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [tokens_1.FirebaseApp,] },] },
    ];
    return AngularFireDatabase;
}());
exports.AngularFireDatabase = AngularFireDatabase;
var FirebaseDatabase = (function (_super) {
    __extends(FirebaseDatabase, _super);
    function FirebaseDatabase() {
        _super.apply(this, arguments);
    }
    return FirebaseDatabase;
}(AngularFireDatabase));
exports.FirebaseDatabase = FirebaseDatabase;
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root.databaseURL + '/' + utils.stripLeadingSlash(url);
    }
    return url;
}
//# sourceMappingURL=database.js.map