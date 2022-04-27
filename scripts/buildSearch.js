const dotenv = require('dotenv')
const algoliasearch = require('algoliasearch/lite')
const firestore = require('@firebase/firestore')
const firebaseApp = require('@firebase/app')
const firebaseStor = require('@firebase/storage')

let app
let firebaseDb
let searchClient
let searchIndex

const initializeClients = () => {
  app = firebaseApp.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  })
  firebaseDb = firestore.getFirestore(app)
  firebaseStorage = firebaseStor.getStorage(app)

  searchClient = algoliasearch(
    process.env.ALGOLIA_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )
  searchIndex = searchClient.initIndex('apetit')
}

const downloadFile = (filePath) => {
  const fileRef = firebaseStor.ref(firebaseStorage, filePath)

  return firebaseStor.getDownloadURL(fileRef)
}

const getAllRecipes = async () => {
  const data = await firestore.getDocs(
    firestore.query(firestore.collection(firebaseDb, 'recipes'))
  )
  const docs = data.docs
  return Promise.all(
    docs.map(async (doc) => {
      const recipe = doc.data()
      const photoPath = recipe.photo || 'recipes/default.jpg'
      const recipePhoto = await downloadFile(photoPath)
      const recipeIngredients = recipe.ingredients.map(
        (ingredient) => ingredient.product
      )
      return {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipeIngredients,
        photo: recipePhoto,
        objectID: doc.id,
      }
    })
  )
}

;(async function () {
  dotenv.config()
  console.log('Adding records to search engine')
  try {
    initializeClients()
    const recipes = await getAllRecipes()

    const response = await searchIndex.saveObjects(recipes)

    console.log(
      `🎉 Sucessfully added ${response.objectIDs.length} records to Algolia search`
    )
  } catch (error) {
    console.log(error)
  }
})()
