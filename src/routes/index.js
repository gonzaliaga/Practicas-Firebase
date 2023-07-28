const { Router } = require('express');
const { db } = require('../firebase');

const Swal = require('sweetalert2')

const router = Router();

router.get('/', async (req, res) => {

    const querySnapshot = await db.collection('almuerzo').get()

    const almuerzo = querySnapshot.docs.map(doc => ({
        id: doc.id,...doc.data(),
    }))

    console.log(almuerzo);

    res.render('index')
})

router.post('/new-almuerzo', async (req, res)=> {
    //TODO add new document to firebase collection 'almuerzos' with req body data as
    const {nombre, precio, imgURL}=req.body

    await db.collection('almuerzo').add({
        nombre,
        precio,
        imgURL
    })
    res.send('Nuevo almuerzo creado')
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Nuevo almuerzo creado !!!',
        showConfirmButton: false,
        timer: 1500
      })
})

router.get('/edit-almuerzo/:id', async (req, res)=>{

    await db.collection('almuerzo').doc(req.params.id).get();
})

router.get('/delete-almuerzo/:id', async (req, res)=>{

    await db.collection('almuerzo').doc(req.params.id).delete();
    res.send('Almuerzo Borrado')
})

router.post('/update-almuerzo/:id', async (req, res)=>{
    const {id}=req.params

    await db.collection('almuerzo').doc(id).update(req.body);

    res.send('Almuerzo Actualizado')
})


module.exports = router;