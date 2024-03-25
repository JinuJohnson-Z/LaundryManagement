/*const config = {
env: process.env.NODE_ENV || 'development', 
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
'/mernproject' 
}
export default config*/

const config = {
  env: "development",
  port: 3000,
  jwtSecret: "YOUR_secret_key",
  
  mongoUri:
   // "mongodb+srv://Blessing:qzzJjISAcwfPklIo@cluster0.txlxgvp.mongodb.net/Skeleton?retryWrites=true&w=majority",
    "mongodb+srv://jjohn277:1G6oqYhOo6lTbeWv@cluster0.i6q6pah.mongodb.net/LaundaryManagement?retryWrites=true&w=majority"
};
export default config;
