import firebase from '@/plugins/firebase'
const firestorage = firebase.storage()
const db = firebase.firestore()

export const actions = {

 uploadImage: async (context, payload) => {
      console.log('uploadImageなう')
      console.log(payload.name)
      console.log(payload.file)
      const uploadTask = await firestorage.ref(payload.name)
                                    .putString(payload.file,'data_url', {contentType:'image/png'})
                                    .then((snapshot) =>{
                                      const card = db.collection('cards').doc(payload.name)

                                      card.set({
                                        name: payload.name,
                                      }, { merge: false })
                                    })
      return uploadTask
  }
}
