const blog_body = document.getElementsByClassName('blog-body')
const page_body = document.getElementById('page-body')
const INDEX_PAGE_BTN = document.getElementsByClassName('index-page-btn')
const nav_items = document.getElementsByClassName('nav-items')
var maxNum = 100   //! Do not use Const!!!
let printLetter;

const pageUrl = window.location.href
const pageUrls = {
    home: "http://localhost:8000/blog",
    new: "http://localhost:8000/blog/new",
}


const urls = Object.values(pageUrls)




addActiveClassToNavBarLinks()
sentenceCropper()
boldText()




function addActiveClassToNavBarLinks() {
    for (let i = 0; i < nav_items.length; i++) {
        if (pageUrl === urls[i]) {
            nav_items[i].classList.add("active")

        } else {
            nav_items[i].classList.remove("active")
        }

    }
}

function sentenceCropper() {
    for (let i = 0; i < blog_body.length; i++) {
        let count = blog_body[i].textContent.length
        console.log(count)
        if (count > maxNum) {
            blog_body[i].textContent = croppedSentence(blog_body[i]) + "...."
        }
    }
}


function croppedSentence(instance) {
    let croppedSentence = ""
    maxNum = getSentence(instance).lastIndexOf(" ")
    for (let k = 0; k < maxNum; k++) {
        printLetter = getSentence(instance).charAt(k)
        croppedSentence += printLetter
    }
    return croppedSentence
}

function getSentence(instance) {
    let sentence = ""
    for (let k = 0; k < maxNum; k++) {
        printLetter = instance.textContent.charAt(k)
        sentence += printLetter
    }
    return sentence
}
// var tes = string.replace(boldString, "a")
function boldText() {

    if (page_body.textContent.length < maxNum) {
// * Text not greater than maxNum get full sentence
        console.log("Hurray", 0)
        const STR = getSentence(page_body)
        console.log(STR)
        // const NEW_BODY = page_body.textContent.replace(STR, "<strong>" + "<em>" + STR + "</em>" + "</strong>")
        const NEW_BODY = page_body.textContent.replace(STR, STR.italics().bold())
        page_body.innerHTML = NEW_BODY

    } else {
        // * Text greater than maxNum get only cropped sentence
        const STR = croppedSentence(page_body) //* get cropped sentence
        // const NEW_BODY = page_body.textContent.replace(STR, "<strong>" + "<em>" + STR + "</em>" + "</strong>") 
        const NEW_BODY = page_body.textContent.replace(STR, STR.italics().bold()) //* replace string with bold string
        page_body.innerHTML = NEW_BODY //* display new page body
        // console.log(NEW_BODY, 0)
    }
}



// function myFunction() {



//     console.log("worked")

// }

// function removeClass(){
// nav_items[0].classList.remove("active")
// }