const express = require( 'express' )
const bodyParser = require( 'express' )
const session = require( 'express-session' )
// ask what's going on below
require( 'dotenv' ).config
 
//  MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession')

// CONTROLLER
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express()

app.use( bodyParser.json() )

app.use( session( {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
} ) )

app.use( checkForSession )
app.use( express.static (`${__dirname}/build`))

// SWAG
app.get('/api/swag', swag_controller.read)

// AUTH
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

// CART
app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

// SEARCH
app.get('/api/search', search_controller.search)

// the part below should be done without looking at notes
const port = process.env.SESSION_PORT || 3000
app.listen( port, () => { console.log( `Listening on port ${port}.` ) } )
