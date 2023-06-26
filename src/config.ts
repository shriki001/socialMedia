export const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'default-secret',
    port: process.env.PORT || 3000,
    mongoDBUri: process.env.MONGO_URI || 'mongodb://mongo'
  };