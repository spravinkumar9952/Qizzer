import Express, { json } from 'express';
import bodyParser from 'body-parser';


const app = Express();


app.set('view engine', 'ejs');


// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let Question = [
    {
        description: "Responsive containers allow you to specify a class that is 100% wide until the specified breakpoint is reached, after which we apply max-widths for each of the higher breakpoints. For example, .container-sm is 100% wide to start until the sm breakpoint is reached, where it will scale up with md, lg, xl, and xxl.",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        answer: "1"
    },
    {
        description: "allow you to specify a class that is 100% wide until the specified breakpoint is reached, after which we apply max-widths for each of the higher breakpoints. For example, .container-sm is 100% wide to start until the sm breakpoint is reached, where it will scale up with md, lg, xl, and xxl.",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        answer: "5"
    }
]

let score = 0, ind = -1;

app.get('/createProblems', (req, res)=>{
    res.render('createProblems.ejs', {message: ""});
})

app.get('/mcq', (req, res)=>{
    
    ind = Math.floor((Math.random() * Question.length));

    if(Question.length == 0){
        res.render('result.ejs', {score} );
    }

    let Questions = Question[ind];
    let endTime = new Date("Feb 7, 2023 21:38:25").getTime();

    res.render('mcq.ejs', {Questions, score, endTime});
});


app.post('/mcq', (req, res) =>{
    if(req.body.option === Question[ind].answer)
        score++;
    
    Question.splice(ind, 1);
    console.log(score);
    res.redirect('mcq');
})


app.post('/createProblems', (req, res) => {
    const questObj = {
        description: req.body.question,
        options: req.body.option,
        answer: req.body.answer
    }

    Question.push(questObj);

    console.log(Question);

    res.render('createProblems', {message: "Quesetion was added successfully!"});
});

app.get('/', (req, res)=>{
    res.render('home.ejs');
})


app.listen(5000, (req, res)=>{
    console.log("Server is now Active on 5000");
});

