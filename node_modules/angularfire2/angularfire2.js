"use strict";
var firebase_1 = require('firebase');
var utils = require('./utils');
var tokens_1 = require('./tokens');
exports.WindowLocation = tokens_1.WindowLocation;
var core_1 = require('@angular/core');
var index_1 = require('./auth/index');
exports.AngularFireAuth = index_1.AngularFireAuth;
exports.firebaseAuthConfig = index_1.firebaseAuthConfig;
exports.FirebaseAuth = index_1.FirebaseAuth;
exports.AuthMethods = index_1.AuthMethods;
exports.AuthProviders = index_1.AuthProviders;
var index_2 = require('./database/index');
exports.FirebaseListObservable = index_2.FirebaseListObservable;
exports.FirebaseObjectObservable = index_2.FirebaseObjectObservable;
exports.FirebaseListFactory = index_2.FirebaseListFactory;
exports.FirebaseObjectFactory = index_2.FirebaseObjectFactory;
exports.AngularFireDatabase = index_2.AngularFireDatabase;
exports.FirebaseDatabase = index_2.FirebaseDatabase;
var AngularFire = (function () {
    function AngularFire(fbUrl, auth, database) {
        this.fbUrl = fbUrl;
        this.auth = auth;
        this.database = database;
    }
    AngularFire.decorators = [
        { type: core_1.Injectable },
    ];
    AngularFire.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [tokens_1.FirebaseConfig,] },] },
        { type: index_1.AngularFireAuth, },
        { type: index_2.AngularFireDatabase, },
    ];
    return AngularFire;
}());
exports.AngularFire = AngularFire;
function _getFirebase(config) {
    return firebase_1.initializeApp(config);
}
exports._getFirebase = _getFirebase;
function _getWindowLocation() {
    return window.location;
}
exports._getWindowLocation = _getWindowLocation;
function _getAuthBackend(app) {
    return new index_1.FirebaseSdkAuthBackend(app, false);
}
exports._getAuthBackend = _getAuthBackend;
function _getDefaultFirebase(config) {
    config.databaseURL = utils.stripTrailingSlash(config.databaseURL);
    return config;
}
exports._getDefaultFirebase = _getDefaultFirebase;
exports.COMMON_PROVIDERS = [
    { provide: index_1.FirebaseAuth,
        useExisting: index_1.AngularFireAuth
    },
    {
        provide: tokens_1.FirebaseApp,
        useFactory: _getFirebase,
        deps: [tokens_1.FirebaseConfig]
    },
    index_1.AngularFireAuth,
    AngularFire,
    index_2.AngularFireDatabase
];
exports.FIREBASE_PROVIDERS = [
    exports.COMMON_PROVIDERS,
    {
        provide: index_1.AuthBackend,
        useFactory: _getAuthBackend,
        deps: [tokens_1.FirebaseApp]
    },
    {
        provide: tokens_1.WindowLocation,
        useFactory: _getWindowLocation
    },
];
exports.defaultFirebase = function (config) {
    return [
        { provide: tokens_1.FirebaseUserConfig, useValue: config },
        { provide: tokens_1.FirebaseConfig, useFactory: _getDefaultFirebase, deps: [tokens_1.FirebaseUserConfig] }
    ];
};
var AngularFireModule = (function () {
    function AngularFireModule() {
    }
    AngularFireModule.initializeApp = function (config, authConfig) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: tokens_1.FirebaseUserConfig, useValue: config },
                { provide: tokens_1.FirebaseConfig, useFactory: _getDefaultFirebase, deps: [tokens_1.FirebaseUserConfig] },
                { provide: tokens_1.FirebaseAuthConfig, useValue: authConfig }
            ]
        };
    };
    AngularFireModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: exports.FIREBASE_PROVIDERS
                },] },
    ];
    return AngularFireModule;
}());
exports.AngularFireModule = AngularFireModule;
var tokens_2 = require('./tokens');
exports.FirebaseConfig = tokens_2.FirebaseConfig;
exports.FirebaseApp = tokens_2.FirebaseApp;
exports.FirebaseAuthConfig = tokens_2.FirebaseAuthConfig;
exports.FirebaseRef = tokens_2.FirebaseRef;
exports.FirebaseUrl = tokens_2.FirebaseUrl;
exports.FirebaseUserConfig = tokens_2.FirebaseUserConfig;
//# sourceMappingURL=angularfire2.js.map