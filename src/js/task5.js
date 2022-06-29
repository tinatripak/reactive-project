
function initialize(params) {
    const topics = document.getElementById('topics');

    const url = 'http://127.0.0.1:3000/topics';
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

    function createElementUl(){
        let ul = document.createElement('ul');
        topics.appendChild(ul);
        return ul;
    }
    function insertIdInHtml(id, count, ul){
        let li = document.createElement('li');
        li.id = id.split(' ')[0]; 
        li.className = "topic";
        li.innerHTML = `⃝&nbsp;&nbsp;&nbsp;&nbsp;${id}&nbsp;->&nbsp;${count}`;
        ul.appendChild(li);
    }
}

module.exports = {

    init: initialize
}
