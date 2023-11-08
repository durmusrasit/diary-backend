const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())
const funcs = require('./helpers')



const diaryData = [
    {
        id: Date.now(),
        content: "Kampüs'te coworking",
        date: funcs.currentDate(),
        isFav: false
    }
]


app.get("/diary", (req, res) => {
  res.json({
    status: "ok",
    data: diaryData
  });
});

app.post("/diary", (req, res) => {
    const newDiary = {
        id: Date.now(),
        date: funcs.currentDate(),...req.body
    }
    diaryData.push(newDiary)
    res.json({
        stat: "eklendi",
        data: newDiary,
        
    })
    
});

app.delete("/diary/:id", (req, res) => {
    const id = req.params.id
    const found = diaryData.findIndex((diary ) => {
        
        return parseInt(diary.id) === parseInt(id)
    })
    diaryData.splice(found, 1)
    res.json({data: diaryData})
});

app.patch("/diary/:id", (req, res) => {
    const id = req.params.id
    const newContent = req.body.diaryContent
    const diaryIndex = diaryData.findIndex(diary => parseInt(diary.id) === parseInt(id))
        diaryData[diaryIndex].content = newContent
  
    res.send();
});
























console.log("listening to 3000...");
app.listen(3000);
