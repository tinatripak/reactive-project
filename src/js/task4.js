function initialize(params) {
    const users = document.getElementById('users');
    const inputButton = document.getElementById('input-button');
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const year = document.getElementById('year');
    const button = document.getElementById('find');
    var e = document.getElementById("date-range-options");
    let ul = document.createElement('ul');
    ul.id = 'list-users';

    e.addEventListener("change", function() {
        if(select() === 'month'){
            day.style.display = 'none';
            month.style.display = 'block';
            inputButton.style.display = 'flex';
        } else if(select() === 'day'){
            month.style.display = 'block';
            inputButton.style.display = 'flex';
            day.style.display = 'block';
        } else{
            day.style.display = 'none';
            month.style.display = 'none';
        }
    });
    function select(){
    return e.value;
    }

    button.addEventListener('click', function(){
        if(ul.children.length >= 1){
            ul.removeChild(ul.children[0]);
        }
        if(select() === 'year'){
            const url = `http://127.0.0.1:3000/users/${year.value}`;
            fetch(url)
            .then(res => res.json())
            .then(res => {
                const ul = createElementUl();
                res.forEach((item) => {
                    const itemId = item._id;
                    const count = item.count;
                    insertIdInHtml(itemId, count, ul);
                })
            })
            .catch(err => console.log('Request Failed', err)); 
        } else if(select() === 'month'){
            const url = `http://127.0.0.1:3000/users/${year.value}/${month.value}`;
            fetch(url)
            .then(res => res.json())
            .then(res => {
                const ul = createElementUl();
                res.forEach((item) => {
                    const itemId = item._id;
                    const count = item.count;
                    insertIdInHtml(itemId, count, ul);
                })
            })
            .catch(err => console.log('Request Failed', err)); 
        } else{
            const url = `http://127.0.0.1:3000/users/${year.value}/${month.value}/${day.value}`;
            fetch(url)
            .then(res => res.json())
            .then(res => {
                const ul = createElementUl();
                res.forEach((item) => {
                    const itemId = item._id;
                    const count = item.count;
                    insertIdInHtml(itemId, count, ul);
                })
            })
            .catch(err => console.log('Request Failed', err)); 
        }
    })
    function findUser(data){
        const url = `http://127.0.0.1:3000/users/${data}`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            const ul = createElementUl();
            res.forEach((item) => {
                const itemId = item._id;
                const count = item.count;
                insertIdInHtml(itemId, count, ul);
            })
        })
        .catch(err => console.log('Request Failed', err)); 
    }
    function createElementUl(){
        users.appendChild(ul);
        return ul;
    }
    function insertIdInHtml(id, count, ul){
        let li = document.createElement('li');
        li.id = id.split(' ')[0]; 
        li.className = "user";
        li.innerHTML = `⃝&nbsp;&nbsp;&nbsp;&nbsp;${id}&nbsp;->&nbsp;${count}`;
        ul.appendChild(li);
    }

}


module.exports = {

    init: initialize
}
