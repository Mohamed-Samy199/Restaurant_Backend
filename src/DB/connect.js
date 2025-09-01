import mongoose from "mongoose"

const DBConnect = async () => {
    await mongoose.connect(process.env.DB_LOCAL)
    .then(res => {console.log(`DB Connection Successful... `)})
    .catch(err => {console.log(`DB Connection Fail ${err}`)})
}

export default DBConnect;