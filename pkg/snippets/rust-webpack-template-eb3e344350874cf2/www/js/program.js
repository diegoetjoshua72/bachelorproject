export class Prog {

    static program_text = "";
    static  static_constructor(program_text_input){
        this.program_text = program_text_input[Symbol.iterator]();
    }

    go_through_iterator(){
        var done = false;
        while(done != true){
            var obj = this.program_text.next()
            if(obj.done == true){
                done = true;
            }
            console.log("it value : ", obj.value);
            console.log("it done : ", obj.done);
        }
    }

    get_piece_to_koweb(){
        let test = this.program_text.next() + "test";
        //next returns object with done and value properties
        //done is true when there is nothing more to pass
        read_some(test);
    }

    //export this to rust 
    get_piece_to_koweb_js(){
        return this.program_text.next().value + "test";
    }

    //experiment with the static method 
    static get_piece_to_koweb_static(){
        if(program_text != undefined){
            return this.program_text.next().value();
        }
        else {
            throw new Error("program_text was not set and we tried to get from the iterator");
        }
    }

    //for now i will want to make it work character by character
    //but then i want it to work for 64mb pieces per next()
    //then make it modifiable by the user :D 
    //the js side will know that the program that it is not done passing the whole thing so i don't need to rely on rust for that 
    //compresion gain suppresion du bruit
}