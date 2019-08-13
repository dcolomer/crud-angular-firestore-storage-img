// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDxF2ddLeViR9NJk6J3L2EKstjKbwFuOfA',
    authDomain: 'crud-firebase-1534d.firebaseapp.com',
    databaseURL: 'https://crud-firebase-1534d.firebaseio.com',
    projectId: 'crud-firebase-1534d',
    storageBucket: 'crud-firebase-1534d.appspot.com',
    messagingSenderId: '387377244618',
    appId: '1:387377244618:web:0d3ff7608975be26'
  },
  toastrConfig: {
    positionClass: 'toast-bottom-right'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
