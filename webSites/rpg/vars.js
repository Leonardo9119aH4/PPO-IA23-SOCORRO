var type
var count = 0
var varcontrol = false

function setVarName(input) {
    let name = new Array(0)
    while((input[count] != "=") && (input[count] != " ")){
        name.push(input[count])
        count++
    }
    return name
}

export function setVars(input, inputsplit, vars) {
    varcontrol = false
    let posint = input.indexOf('int ')
    let posreal = input.indexOf('real ')
    let posstring = input.indexOf('string ')
    if(posint != -1 || posreal != -1 || posstring != -1){
        varcontrol = true
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
        let varname = setVarName(inputsplit, count)
        let varvalue = []
        while(count < inputsplit.length) {
            if((inputsplit[count] != " ") && (inputsplit[count] != "=")){
                varvalue.push(inputsplit[count])
            }
            count++
            varname = varname.join('')
            varvalue = varvalue.join('')
            if(verifyType(varvalue)){
                vars[0].push(varvalue)
                vars[1].push(varname)
                vars[2].push(type)
            }
        }
    } else {
        return
    }
}

function verifyType(value) {
    switch(type){
        case 's':
            if(parseInt(value) == NaN){
                return true
            }
            break
        case 'i':
            if(Number.isInteger(parseInt(value))){
                return true
            }
            break
        case 'r':
            if(parseFloat(value) % 1 != 0){
                return true
            }
            break
    }
    return false
}

export function getVars(input, inputsplit, vars) {
    let newinput = input
    console.log(vars)
    if(!varcontrol){
        vars[1].forEach((varname, index) => {
            if(input.indexOf(varname) != -1){
                let x = input.indexOf(varname)
                if(inputsplit[x + varname.length] == " " || inputsplit[x + varname.length] == "<" || inputsplit[x + varname.length] == ">" || inputsplit[x + varname.length] == "=" || inputsplit[x + varname.length] == ")" && inputsplit[x - 1] == " " || inputsplit[x - 1] == "<" || inputsplit[x - 1] == ">" || inputsplit[x - 1] == "=" || inputsplit[x - 1] == "("){
                    newinput = input.replace(new RegExp('\\b' + varname + '\\b', 'gi'), vars[0][index])
                    return newinput
                }
            }
        })
    }
    return newinput
}