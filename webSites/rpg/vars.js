var count
var type

function setVarName(input) {
    let name = new Array(0)
    console.log(count)
    while((input[count] != "=") && (input[count] != " ")){
        name.push(input[count])
        count++
        console.log(count)
        console.log(input[count])
    }
    return name
}

export function setVars(input, inputsplit, vars) {
    let posint = input.indexOf('int ')
    let posreal = input.indexOf('real ')
    let posstring = input.indexOf('string ')
    if(posint != -1 || posreal != 1 || posstring != 1){
        if(posint != -1){
            count = posint + 4
            type = 'i'
        } else if (posreal != -1){
            count = posreal + 5
            type = 'r'
        } else {
            count = posstring + 7
            type = 's'
        }
        let varname = setVarName(inputsplit)
        let varvalue = []
        console.log(inputsplit, count)
        console.log(inputsplit[count])
        while(count < inputsplit.length) {
            if((inputsplit[count] != " ") && (inputsplit[count] != "=")){
                varvalue.push(inputsplit[count])
            }
            count++
        }
        varname = varname.join('')
        varvalue = varvalue.join('')
        vars[0].push(varvalue)
        vars[1].push(varname)
        vars[2].push(type)
        console.log(vars[0])
        console.log(vars[1])
        console.log(vars[2])
    }
}