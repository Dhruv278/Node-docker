const express = require('express');
const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');



const app = express();
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

// Redis
const session = require("express-session")
const redis = require('redis')
const RedisStore = require('connect-redis').default
const redisClient = redis.createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` })

redisClient.connect().catch(console.error)

// to pass incoming ip to express server from nginx 
app.enable("trust proxy")

app.use(session({
    proxy: true,
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge:3000000   // in ms
    }
}))



console.log(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSOurce=admin`)

// Database
mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSOurce=admin`, {

})
    .then(() => {
        
        console.log("Database connected");
    }).catch(e => console.log(e))



app.use(express.json());
app.get("/", (req, res) => {
    console.log("working")
    res.send("<h2>Hello+++</h2>");
})
app.use("/post", postRouter);
app.use("/auth", authRouter);

// Global error handler 
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        status: "error",
        data: {
            error: err
        }
    })
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on the prot ${port}`);
})