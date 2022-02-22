import mongoose from 'mongoose'
import app from './app'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mongoUri = 'mongodb+srv://cpagan:fNYJcZJYV59I2wrp@cluster0.agmne.mongodb.net/pivot'

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`App running on port ${process.env.PORT}`)
    )
  })
  .catch((error) => {
    console.log(
      'Mongodb connection error. Please make sure your mongodb is running.' + error
    )
  })
