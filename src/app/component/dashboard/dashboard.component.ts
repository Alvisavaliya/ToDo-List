import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObject: Task = new Task();
  taskArr:Task[]=[]

  addTaskValue:string='';
  addTaskValueGender='';

  editTaskValue: string='';
  editTaskValueGender:string = ''



  constructor(private crudService:CrudService) { }

  ngOnInit(): void {

    this.editTaskValue='';
    this.addTaskValueGender=''
    this.addTaskValue='';

    this.taskObject=new Task()
    this.taskArr=[]
    this.getAllTask()

  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res=>
      {
        this.taskArr=res
      },err =>
      {
        alert('unable to get list of Task')
      })
  }

  addTask(){
    this.taskObject.task_name=this.addTaskValue;
    this.taskObject.gender=this.addTaskValueGender
    if(this.addTaskValue === "" || this.addTaskValueGender === ""){
      alert("Enter all fild")
    }
    else{
      this.crudService.addTask(this.taskObject).subscribe(res=>
        {
          this.ngOnInit()
          this.addTaskValue='';
          this.addTaskValueGender='';
          console.log(res);
          
        },err =>  
        {
          alert(err)
        })
    }
  }

  editTask()
  {
    this.taskObject.task_name=this.editTaskValue 
    this.taskObject.gender=this.editTaskValueGender

    this.crudService.editTask(this.taskObject).subscribe(res=>{
      this.ngOnInit()
    },err=>
  {
    alert('Failed to Update task');
  })
  }

  DeleteTask(etask:Task)
  {
    this.crudService.DeleteTask(etask).subscribe(res=>{
      this.ngOnInit()
    },err=>
    {
      alert('Failed to Delete Task')
    })
  }
 
  call(etask :Task){
    this.taskObject=etask;
    this.editTaskValue=etask.task_name
    this.editTaskValueGender=etask.gender
  }
}
