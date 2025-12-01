import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js"

const router = Router()


// Route to create a new Quiz with just Title 
router.post("/quiz", async (req: Request, res: Response) => {

  try {

    const { title } = req.body;
    await prisma.quiz.create({ data: { title } });

    res.status(202).json({ "message": "quiz added in the database" });
  }

  catch (error) {
    console.log(error)
    res.status(401);
  }
})

// Route to create a Question for a given Quiz  
router.post("/question", async (req: Request, res: Response) => {

  try {
    const { quiz_name, question, options } = req.body;

    const returnQuiz = await prisma.quiz.findFirst({ where: { title: quiz_name }, select: { quiz_id: true } });

    if (!returnQuiz) {
      return res.status(404).json({ error: "quiz not found " });

    }

    const newQuestion = await prisma.question.create({
      data: {
        question, quiz_id: returnQuiz.quiz_id,
        options: {
          create: options.map((opt: { option: string; answer: boolean }) =>
          (
            {
              option: opt.option,
              answer: opt.answer

            }
          )
          )
        }
      }
    });

    res.status(201).json({ message: "Question Added Successfully " });

  }
  catch (error) {

    console.error(error);
    res.status(500).json({
      error: "server error"
    });


  }
});

// Add multiple Questions  at Once 
router.post("/questions", (req: Request, res: Response) => { });



// Get particular Quiz 
router.get("/quiz", async (req: Request, res: Response) => {

  const { quiz_name } = req.query;

  const returnQuiz = await prisma.quiz.findFirst({ where: { title: quiz_name }, select: { quiz_id: true } });

  const quiz = await prisma.quiz.findFirst(
    {
      where: { title: quiz_name },
      include:
      {
        questions:
        {
          include:
          {
            options:

            {
              select:
                { option_id: true, option: true }
            }
          }
        }
      }
    });

  res.status(200).json(quiz);

});

//Get all quiz 
router.get("/quizes", async (req: Request, res: Response) => {
  const quizs = await prisma.quiz.findMany({
    include: {
      questions: {
        include:
        {
          options: { select: { option_id: true, option: true, answer: true } }
        }
      } // Returns all fields for all posts
    },
  });

  res.status(202).json(quizs);
}


);



router.post("/quiz/answers", async (req: Request, res: Response) => {

  const { array } = req.body;
  let score = 0;
  let answer_array = [];


  for (const element of array) {
    const answer_id = await prisma.question.findFirst({ where: { question_id: element.question_id }, select: { options: { where: { answer: true }, select: { option_id: true } } } });



    if (answer_id.options[0].option_id === element.select_id) {
      score++;
    }


  };

  res.json({ "total": array.length, "score": score, });

})




export default router 
