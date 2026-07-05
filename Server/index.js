const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');
const contactUsRoute = require("./routes/Contact");

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors'); //backened entertain the front request
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middleware
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://studynotion-frontend-seven-psi.vercel.app",
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) {
                return callback(null, true);
            }
            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }
            console.log("Blocked Origin:", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options(/(.*)/, cors());
app.use(express.json());
app.use(cookieParser());

const os = require('os');
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: os.tmpdir(),
    })
)

//cloudinary connetion
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`App is running at ${PORT}`);
    });
}

module.exports = app;