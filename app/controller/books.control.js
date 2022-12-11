const dealHelper=require("../helper/dealWithJson")
const dataHelper=require("../helper/dataHelper")
class controlbook{

    static allbooks = (req, res)=>{
        const books = dealHelper.readFromJSON()
        res.render("allBooks", {
            pageTitle: "All Books", 
            books, 
            hasBooks: books.length
        })
    }
   
    static addbook=(req,res)=>{
        res.render("addBooks",{
            pageTitle:"ADDBOOKS"
        })
    }

    static addLogicbook=(req,res)=>{
       
        const all = dealHelper.readFromJSON()
        const book = {id:all.length+1, ...req.query}
        all.push(book)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }
    static delbook = (req, res)=>{    
        const all = dealHelper.readFromJSON()
        const bookIndex = dataHelper.getId(all, "id", req.params.id)
        if(bookIndex!=-1) all.splice(bookIndex, 1)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }
    static searchbook=(req,res)=>{
        const all = dealHelper.readFromJSON()
         const data = all.filter(book=> book.name-book==req.params.name-book)
       // const bookIndex = dataHelper.getId(all, "id", req.params.name-book)
       // bookIndex?bookIndex=req.params.name-book:"alert alert-success"
       if(data)
         res.render("search",{data:all[data]})
         return data
    }

    static editbook = (req, res)=>{
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        res.render("edit", {
            pageTitle: "edit page",
            result: all[result]
        })    
    }

    static editlogicbook = (req,res)=>{
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        //if(result==-1) return res.render("err404", {pageTitle:"invalid", err:"invalid id"})
        const newbook = {id: req.params.id,...req.body}
        // newTask.status=="on"? newTask.status=true : newTask.status=false
         all[result] = newbook
       dealHelper.writeToJSON(all)
       res.redirect("/")
    }

}

module.exports=controlbook