const jwt = require('jsonwebtoken');
const jwkRsa = require('jwks-rsa');
const fromEvent = require('graphcool-lib').fromEvent;

const verifyToken = token =>
  new Promise((resolve, reject) => {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
      reject('Unable to retrieve key identifier from token');
    }
    if (decoded.header.alg !== 'RS256') {
      reject(
        `Wrong signature algorithm, expected RS256, got ${decoded.header.alg}`
      );
    }
    const jkwsClient = jwkRsa({
      cache: true,
      jwksUri: `https://loft-manager.eu.auth0.com/.well-known/jwks.json`,
    });

    jkwsClient.getSigningKey(decoded.header.kid, (err, key) => {
      if (err) return reject(err);

      const signingKey = key.publicKey || key.rsaPublicKey;

      jwt.verify(
        token,
        signingKey,
        {
          algorithms: ['RS256'],
          ignoreExpiration: true,
          issuer: 'https://loft-manager.eu.auth0.com/',
          audience: '50_eCAWYM0eDxZWfN3oAVKAatyl3XguG',
        },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        }
      );
    });
  });

const getGraphcoolUser = (auth0UserId, api) =>
  api
    .request(
      `
        query getUser($auth0UserId: String!){
          User(auth0UserId: $auth0UserId){
            id
          }
        }
      `,
      { auth0UserId }
    )
    .then(queryResult => queryResult.User);

const createGraphCoolUser = (auth0UserId, api) =>
  api
    .request(
      `
        mutation createUser($auth0UserId: String!) {
          createUser(
            auth0UserId: $auth0UserId
          ){
            id
          }
        }
      `,
      { auth0UserId }
    )
    .then(queryResult => queryResult.createUser);

export default async event => {

  try {
    const { idToken } = event.data;
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const decodedToken = await verifyToken(idToken);
    let graphCoolUser = await getGraphcoolUser(decodedToken.sub, api);

    if (graphCoolUser === null) {
      graphCoolUser = await createGraphCoolUser(
        decodedToken.sub,
        api
      );
    }

    const token = await graphcool.generateNodeToken(
      graphCoolUser.id,
      'User',
      decodedToken.exp
    );

    return { data: { id: graphCoolUser.id, token } };
  } catch (err) {
    return { error: err };
  }
};
