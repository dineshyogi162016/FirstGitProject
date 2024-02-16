const Products = require("../../products")

const SearchInProducts = async (req, res) => {
   try {
      let key = req.params.key
      
      const searchResult = await Products.find({
         "$or": [
            {"name": { $regex: key , $options : "i" }}
         ]
      })

      // console.log(searchResult)
      res.send(searchResult)

   } catch (error) {
      res.send({error: "Product searching error"})
   }
}

module.exports = SearchInProducts ;