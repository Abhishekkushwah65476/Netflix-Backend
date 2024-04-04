const express = require("express")
const multer  = require('multer')
// const app = express();




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
    })
    var upload = multer({ storage: storage })

 
   
  //  app.use(express.static('uploads'));


const router=express.Router()
const VideoController = require("../controllers/videoController")
const GenreController = require("../controllers/genreController")
const MovieController =require("../controllers/moviesController")
const ListController=require("../controllers/ListController")
const middlewares=require("../Middleware/auth")


router.post("/addVideo",VideoController.addVideo)
router.get("/getVideo",VideoController.GetVideo)
router.put("/updateVideo/:id",VideoController.updateVideo)
router.delete("/deleteVideo/:id",VideoController.deleteVideo)


// genre start

router.post("/addGenre",GenreController.addGenre)
router.get("/getGenre",middlewares.authenticateToken,GenreController.getGenre)
router.delete("/deleteGenre/:id",GenreController.deleteGenre)

// genre end


const cpUpload = upload.fields([
    { name: 'img', maxCount: 1 }, 
    { name: 'imgTitle', maxCount: 1 },
    { name: 'imgSm', maxCount: 1 },
    { name: 'trailer', maxCount: 1 },
    { name: 'video', maxCount: 1 },
])
// movei start
router.post("/addMovie",cpUpload,middlewares.authenticateToken,MovieController.addMovie)
router.get("/getallMovies",cpUpload,middlewares.authenticateToken,MovieController.getAllMovies)
router.put("/updateMovie/:id",cpUpload,middlewares.authenticateToken,MovieController.updateMovie)
router.delete("/deleteMovie/:id",middlewares.authenticateToken,MovieController.deleteMovie)
router.get("/getSingleMovie/find/:id",MovieController.getOneMovie)
router.get("/getRandomMovie",MovieController.getRandomMovie)
// movei end

//List Start
router.post("/Addlist",middlewares.authenticateToken,ListController.addList)
router.delete("/deletelist/:id",middlewares.authenticateToken,ListController.deleteList)
router.get("/getList/",ListController.getList)
router.put("/updateList/:id",middlewares.authenticateToken,ListController.updateList)

//List End




module.exports=router