import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { ref, getDownloadURL, getStorage } from 'firebase/storage'
import { getApp } from 'firebase/app'

admin.initializeApp()

export const downloadFile = (filePath: string) => {
  const app = getApp('Apetit')
  console.log(app)
  const firebaseStorage = getStorage(app)
  const fileRef = ref(firebaseStorage, filePath)

  return getDownloadURL(fileRef)
}

exports.uploadImage = functions.https.onCall(async (data) => {
  try {
    const recipe = data
    const photoPath = recipe.photo || 'recipes/default.jpg'
    const recipePhoto = await downloadFile(photoPath)
    functions.logger.log(recipe)
    functions.logger.log(recipePhoto)
    const recipeIngredients = recipe.ingredients.map(
      (ingredient: any) => ingredient.product
    )

    return {
      ...recipe,
      ingredients: recipeIngredients,
      photo: recipePhoto,
    }
  } catch (e) {
    console.log(e)
    functions.logger.log(e)
    return null
  }
})

exports.onRecipeUpload = functions.https.onRequest(async (req, res) => {
  try {
    const recipe = req.body.data
    const photoPath = recipe.photo || 'recipes/default.jpg'
    const recipePhoto = await downloadFile(photoPath)
    console.log(recipePhoto)
    const recipeIngredients = recipe.ingredients.map(
      (ingredient: any) => ingredient.product
    )
    res.send({
      result: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipeIngredients,
        objectID: recipe.id,
        photo: recipePhoto,
      },
    })
  } catch (e) {
    console.log(e)
    functions.logger.log(e)
    res.status(500).end()
  }
})
