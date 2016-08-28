import { FirebaseObjectObservable } from './index';
import { FirebaseObjectFactoryOpts } from '../interfaces';
import 'rxjs/add/operator/mergeMap';
export declare function FirebaseObjectFactory(absoluteUrlOrDbRef: string | firebase.database.Reference, {preserveSnapshot, query}?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any>;
