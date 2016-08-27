import { FirebaseObjectObservable } from './index';
import { database } from 'firebase';
import * as utils from '../utils';
import 'rxjs/add/operator/mergeMap';
export function FirebaseObjectFactory(absoluteUrlOrDbRef, _a) {
    var _b = _a === void 0 ? {} : _a, preserveSnapshot = _b.preserveSnapshot, query = _b.query;
    var ref;
    utils.checkForUrlOrFirebaseRef(absoluteUrlOrDbRef, {
        isUrl: function () { return ref = database().refFromURL(absoluteUrlOrDbRef); },
        isRef: function () { return ref = absoluteUrlOrDbRef; }
    });
    return new FirebaseObjectObservable(function (obs) {
        ref.on('value', function (snapshot) {
            obs.next(preserveSnapshot ? snapshot : utils.unwrapMapFn(snapshot));
        }, function (err) {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        return function () { return ref.off(); };
    }, ref);
}
//# sourceMappingURL=firebase_object_factory.js.map