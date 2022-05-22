const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name'],
        through: {
          attributes:[]
          
        
        },
        as: 'tag_names'
      }
    ]
  })
  .then(dbTagData => {
    console.log(dbTagData);
    res.json(dbTagData)
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [' product_name'],
        through: {
          attributes:[]
          
        
        },
        as: 'tag_names'
      }
    ]
  })
  .then(dbTagData => {
    console.log(dbTagData);
    res.json(dbTagData)
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(newTagData => {
    
    res.json(newTagData)
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
 Tag.update(req.body,{
   where: {
     id: req.params.id
   }
 })
 .then(updatedTagData => {
  
  res.json(updatedTagData)
  
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedTagData => res.json(deletedTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
