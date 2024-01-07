import admin from 'firebase-admin'


const serviceAccount ={
  "type": process.env.FIREBASE_ADMIN_TYPE,
  "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
  "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_X509_PROVIDER_CERT_URI,
  "client_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_X509_CLIENT_CERT_URI,
  "universe_domain": process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  "app_name":"admin"
};

export const app= admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slack-with-ai-default-rtdb.firebaseio.com"
});
export const firebaseAdmin=()=>{
    return app;
}

// export function createFirebaseAdminApp(serviceAccount){
//   if(admin.app.length>0){
//     return admin.app();
//   }
//   return admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://slack-with-ai-default-rtdb.firebaseio.com"
//   })
// }

// export async function initAdmin(){
//   const serviceAccount ={
//     "type": process.env.FIREBASE_ADMIN_TYPE,
//     "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
//     "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
//     "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
//     "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
//     "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
//     "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
//     "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_X509_PROVIDER_CERT_URI,
//     "client_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_X509_CLIENT_CERT_URI,
//     "universe_domain": process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
//     "app_name":"admin",
//   };
//   return createFirebaseAdminApp(serviceAccount);
// }