import {main} from '/globalAssets/js/main.js'
main()

let email = document.querySelector('#email')
let paswword = document.querySelector("#password")

let btComfirm = document.querySelector("#btComfirm")

let userCheck = document.querySelector("metodouser")
let emailCheck = document.querySelector("#metodoemail")

let status

btComfirm.onclick = async function() {
    if(userCheck.checked){
        status = 1
    } else if (emailCheck.checked){
        status = 2
    } else {
        status = 3
    }
    let response = await fetch("/api/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {credential: status}
    })
}