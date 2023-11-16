const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

/** Memanggil Models */
const Product = require('./models/product')


// connect ke mongoDB
mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) =>{
    console.log('tersambung ke mongodb')
}).catch((err) => {
    console.log(err)
})

// set ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
// utk express bisa input atau menerima body request
app.use(express.urlencoded({ extended: true }))
// buat override update
app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log('ShopApp berjalan di http://127.0.0.1:3000')
})

// route
app.get('/',(req,res) => {
    res.send('Hello World')
})

// rest ejs
app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category){
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

// route untuk create form
app.get('/products/create', (req, res) => {
    res.render('products/create')
})

app.post('/products/', async (req, res) => {
    const product = new Product(req.body)
    await product.save()
    res.redirect(`/products/${product._id}`)
})

// biar gak bentrok id harus dibawah create form
app.get('/products/:id', async(req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req,res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})