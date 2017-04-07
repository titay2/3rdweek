'use strict';
const catDiv = document.querySelector('#cats');


document.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    const formData = new FormData(evt.target);
    const url = '/cats';
    fetch(url, {
            method: 'post',
            body: formData
        }
    ).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
        //getCats();

    });
})

const remove = (id)=> {
    const url = '/cats';
    fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then(function (cats) {
            cats = cats.filter(function (cat) {
                return cat.id !== id
            })
        })
}

const getCats = () => {
    const url = '/cats';
    fetch(url)
        .then((resp) => {
            return resp.json();
        })

        .then((cats) => {
            for (const cat of cats) {
                const article = document.createElement('article');
                //console.log(JSON.stringify(cat.name));
                article.innerHTML = `<div id=${cat._id}>
                                     <p>${cat.name}</p>
                                     <p>${cat.gender}</p>
                                     <p>${cat.age} years</p>
                                     <p>${cat.weight} kg</p>
                                     <a href="#" data-action="edit">edit</a> |
                                     <a href="#" data-action="delete">delete</a>  
                                     <hr>
                                     </div>
`
                catDiv.appendChild(article);
            }
        })
};

getCats()


const url = '/cats';
fetch(url)
    .then((resp) => {
        return resp.json();
    }).then((cats) => {
    catDiv.addEventListener('click', function (event) {
        event.preventDefault()
        const button = event.target
        const row = button.closest('div')
        const id = row.id
        const action = button.dataset.action
        console.log(id)
        if (action === 'delete') {
            row.remove
            console.log("deleting")
            const url = '/cats/' + id;
            fetch(url, {
                    method: 'delete'
                }
            )
                .then((resp) => {

                    // return resp.json();
                    //getCats();
                })
        }
        if (action === 'edit') {
            const $cells = row.querySelectorAll('p')
            const name = $cells[0].textContent.trim()
            const gender = $cells[1].textContent.trim()
            const age = $cells[2].textContent.trim()
            const weight = $cells[3].textContent.trim()

            row.innerHTML = `
        <p>
          <input value="${name}" data-original="${name}">
        </p>
        <p>
          <input value="${gender}" data-original="${gender}">
        </p>
        <p>
          <input data-original="${age}" value="${age}">
        </p>
        <p>
          <input data-original="${weight}" value="${weight}">
        </p>
        <p class="actions">
          <button data-action="save">save</button>
          <a href="#" data-action="cancel">cancel</a>
        </p>
      `
        }

        if (action === 'cancel') {
            const $inputs = row.querySelectorAll('input')
            const name = $inputs[0].dataset.original
            const gender = $inputs[1].dataset.original
            const age = $inputs[2].dataset.original
            const weight = $inputs[3].dataset.original

            row.innerHTML = `
        <p>
          ${name}
        </p>
        <p>
          ${gender}
        </p>
        <p>
          ${age}
        </p>
        <p>
          ${weight}
        </p>
        <p class="actions">
          <a href="#" data-action="edit">edit</a> |
          <a href="#" data-action="delete">delete</a>
        </p>
      `
        }

        if(action==='save'){
            const row = button.closest('div')
            console.log(row.id)

            const cells = row.querySelectorAll('input')
            console.log(cells)

            const id = row.id
            const url = '/cats/new/' + id;

            fetch(url, {
                    method: 'put',
                    body: cells

                }
            )

        }
    })
})


;