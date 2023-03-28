const fs = require('fs');
const http = require('http'); 
const path =require('path')
const express = require('express');
const morgan = require('morgan');
const engine = require('express-handlebars');
const port =8000;
const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('combined'));
app.engine('handlebars',engine.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'source\\views'));

   app.get('/',(req,res)=>{
    res.setHeader("ngrok-skip-browser-warning",1);
    res.render('home');
    
}) 

app.post('/',(req,res)=>{
    res.render('h');
    console.log("\n\n");
    let t = JSON.stringify((req.body));
    fs.writeFile('data.txt',t,function(err){
        if(err) throw err;
    })
   console.log(`data: `,req.body)

})
app.listen(
    port,
     
    ()=> { 
        console.log('\nserver run at localhost:8000')

        var options = {
            port: 8000,
            host: '',
          }; 
          
        var request = http.request(options);
          
          request.setHeader("ngrok-skip-browser-warning",1);
          request.end();
    
     }
) ;