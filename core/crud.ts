import fs from "fs";
const DB_FILE_PATH = "core/db";

console.log("crud");

interface Todo{
    date: string;
    content: string;
    done: boolean;
}

function create(content: string){
    const todo: Todo  = {
        date: new Date().toISOString(),
        content: content,
        done: false,
    };

    console.log(todo);
    
    const todos: Array<Todo> = [
        ...read(),
        todo,
    ]

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos},null,2))
    return content;
}

function read(): Array<Todo>{
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (!db.todos){ //teste de falha rapido
        return[];
    }
    return db.todos
}

function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, "");
}

CLEAR_DB()
create("segunda TODO")
create("terceira TODO")
console.log(read());