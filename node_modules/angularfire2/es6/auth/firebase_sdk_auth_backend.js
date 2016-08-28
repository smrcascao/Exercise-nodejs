var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from '../tokens';
import { ZoneScheduler } from '../utils';
import { auth } from 'firebase';
import { authDataToAuthState, AuthBackend, AuthProviders } from './auth_backend';
var FacebookAuthProvider = auth.FacebookAuthProvider, GithubAuthProvider = auth.GithubAuthProvider, GoogleAuthProvider = auth.GoogleAuthProvider, TwitterAuthProvider = auth.TwitterAuthProvider;
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/observeOn';
export var FirebaseSdkAuthBackend = (function (_super) {
    __extends(FirebaseSdkAuthBackend, _super);
    function FirebaseSdkAuthBackend(_fbApp, _webWorkerMode) {
        if (_webWorkerMode === void 0) { _webWorkerMode = false; }
        _super.call(this);
        this._webWorkerMode = _webWorkerMode;
        this._fbAuth = _fbApp.auth();
    }
    FirebaseSdkAuthBackend.prototype.createUser = function (creds) {
        return Promise.resolve(this._fbAuth.createUserWithEmailAndPassword(creds.email, creds.password))
            .then(function (user) { return authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.getAuth = function () {
        return authDataToAuthState(this._fbAuth.currentUser);
    };
    FirebaseSdkAuthBackend.prototype.onAuth = function () {
        var _this = this;
        return Observable.create(function (observer) {
            return _this._fbAuth.onAuthStateChanged(observer);
        })
            .map(function (user) {
            if (!user)
                return null;
            return authDataToAuthState(user, user.providerData[0]);
        })
            .observeOn(new ZoneScheduler(Zone.current));
    };
    FirebaseSdkAuthBackend.prototype.unauth = function () {
        Promise.resolve(this._fbAuth.signOut());
    };
    FirebaseSdkAuthBackend.prototype.authWithCustomToken = function (token) {
        return Promise.resolve(this._fbAuth.signInWithCustomToken(token))
            .then(function (user) { return authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authAnonymously = function () {
        return Promise.resolve(this._fbAuth.signInAnonymously())
            .then(function (user) { return authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authWithPassword = function (creds) {
        return Promise.resolve(this._fbAuth.signInWithEmailAndPassword(creds.email, creds.password))
            .then(function (user) { return authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthPopup = function (provider, options) {
        var providerFromFirebase = this._enumToAuthProvider(provider);
        if (options.scope) {
            options.scope.forEach(function (scope) { return providerFromFirebase.addScope(scope); });
        }
        return Promise.resolve(this._fbAuth.signInWithPopup(providerFromFirebase));
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthRedirect = function (provider, options) {
        return Promise.resolve(this._fbAuth.signInWithRedirect(this._enumToAuthProvider(provider)));
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthToken = function (credential) {
        return Promise.resolve(this._fbAuth.signInWithCredential(credential))
            .then(function (user) { return authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.getRedirectResult = function () {
        return Observable.fromPromise(Promise.resolve(this._fbAuth.getRedirectResult()));
    };
    FirebaseSdkAuthBackend.prototype._enumToAuthProvider = function (providerId) {
        switch (providerId) {
            case AuthProviders.Github:
                return new GithubAuthProvider();
            case AuthProviders.Twitter:
                return new TwitterAuthProvider();
            case AuthProviders.Facebook:
                return new FacebookAuthProvider();
            case AuthProviders.Google:
                return new GoogleAuthProvider();
            default:
                throw new Error("Unsupported firebase auth provider " + providerId);
        }
    };
    FirebaseSdkAuthBackend.decorators = [
        { type: Injectable },
    ];
    FirebaseSdkAuthBackend.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseApp,] },] },
        null,
    ];
    return FirebaseSdkAuthBackend;
}(AuthBackend));
//# sourceMappingURL=firebase_sdk_auth_backend.js.map