//  require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = process.env.PORT | 4000
const dataModel = require('./Model/DataModel');
const coonectDb = require('./Database/db');
coonectDb()
app.use(cors())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const dbStorage = multer.memoryStorage({})
const upload = multer({ storage: dbStorage });

app.use(express.json({ extends: true }))
// this is get call for getting data
app.get('/read', async (req, res) => {
  console.log('trigger')
  let findeData = await dataModel.find({})

  res.status(200).json({ messagae: "data from server", data: findeData })
});
// this is update call to update employee data
app.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const data  = JSON.parse(req.body.data);
    let findAndUpdate = await dataModel.findByIdAndUpdate(req.params.id, data, { new: true })
    return res.status(200).json({message:'Employee Updated Successfully'})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

})
// this is delete call to delete employee 
app.delete('/delete/:id', async (req, res) => {
  console.log(req.params, '29::')
  try {
    let FindAndDelete = await dataModel.findByIdAndDelete(req.params.id)
    console.log(FindAndDelete, '42::')
    res.json({ message: "Data Deleted Succesfully" })
    if (!FindAndDelete) {
      res.status(400).send({ message: "not user Found" })
    }
  } catch (error) {
    res.status(500).send({ message: "soething went wrong" })
    console.log(error, '34::')
  }

})
// this is post call to  create employee data
app.post('/write', upload.single('image'), async (req, res) => {
  try {
    const { data } = req.body;
    console.log(JSON.parse(data), req.file, '11')
    let uploadata = { ...JSON.parse(data), image: req.file }
    const newData = new dataModel(uploadata)
    await newData.save()

    res.json({ message: "data Added Succesfully" })

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  app.post('/login',async(req,res)=>{
    console.log(req,res,'73::')
    try{
       
    }catch(error){
       console.log(error,'76::')
    }
  })



})

// server running on port 
app.listen(port, () => {
  console.log(`server is running on port`, port)
})
