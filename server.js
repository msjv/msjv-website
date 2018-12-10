const path = require('path')
const express = require('express')

const PORT = process.argv[2] || process.env.CSG_PORT || 3000
const ENTRY = path.resolve(__dirname, './dist/index.html')

const app = express()

app.use(express.static(path.resolve(__dirname, './dist')))
app.get('*', (req, res) => {
  res.sendFile(ENTRY)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
