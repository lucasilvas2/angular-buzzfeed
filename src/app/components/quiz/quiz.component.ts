import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = 'Title'

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  resultQuestion:string = ''

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex++

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const result:string = await this.checkResult(this.answers)
      this.finished = true
      this.resultQuestion = quiz_questions.results[result as keyof typeof quiz_questions.results];
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length){
        return previous
      }else{
        return current
      }
    })

    return result
  }
}
