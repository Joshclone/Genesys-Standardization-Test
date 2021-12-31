const express = require('express');

const router = express.Router();
const Post = require('../models/Post');


//routers to patch-update delete  
  router.get('/', async(req, res) => {
      try {
          const posts = await Post.find();
          res.json(posts);
      } catch (err) {
          res.json({message: err})
   }
});


//Post transaction

router.post('/', async(req, res) => {
    console.log(req.body);
    const post = new Post({
        Name: req.body.Name,
        ReferenceNum: req.body.ReferenceNum,
        Sender: req.body.Sender,
        TransactionAmount: req.body.TransactionAmount,
        AmountInWords: req.body.AmountInWords,
       
    });
    try{
   const savedPost = await post.save()
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//specific transaction
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err})
    }
});

//Delete transaction

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err})
    }
});


//update  a transaction

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            
            {
                $set: {
                    Name: req.body.Name,
                    ReferenceNum: req.body.ReferenceNum,
                    Sender: req.body.Sender,
                    TransactionAmount: req.body.TransactionAmount,
                    AmountInWords: req.body.AmountInWords
                }
            } ,
           

);
        res.json(updatedPost);
        
    } catch (err) {
        res.json({ message: err });
    }
  

});





module.exports = router;