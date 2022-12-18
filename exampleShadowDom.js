
let nb = 0

// function render1(){
//     document.querySelector('#root').innerHTML = `<ul>
//                                                     <li id="text1">text ${nb}</li>
//                                                 </ul>`
// }

function render2(){
    const list = React.createElement(
        'ul', 
        {}, 
        React.createElement('li', {}, 'text '+nb)
    )   
    ReactDOM.render(list, document.querySelector('#root'))  
}

render2()
// render1()

document.querySelector('#btn').addEventListener('click', function(){
    nb++
    render2()
    // render1()
})