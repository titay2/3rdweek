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
        console.log("the cats from the data base"+json);
        getCats();

    });
});
const url = '/cats/:id';
fetch(url)
    .then((resp) => {
        return resp.json();
    }).then((cats) => {

})

const getOne = ( id ) => {
    const url = '/cats/:' + id;
    fetch(url)
        .then((resp) => {
            return resp.json();
        }).then((cats) => {

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
                article.dataset.id = cat.id
                article.innerHTML = `
                                     <p>${cat.name}
                                     <br>${cat.gender}</p>
                                     <p>${cat.age} years</p>
                                     <p>${cat.weight} kg</p>
                                     <a href="#" data-action="edit">edit</a> |
                                     <a href="#" data-action="delete">delete</a>  
                                     <hr>
                                     `;
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
        const $button = event.target
        const $row = $button.closest('article')
        const id = $row.dataset.id
        const action = $button.dataset.action
        console.log(id)
        if (action === 'delete') {
            console.log(id)
            console.log(id)
            const url = '/cats';
            fetch(url)
                .then((resp) => {
                    return resp.json();
                }).then((cats) => {
                for (const cat of cats) {

                    cat.delete({name: id}, (err) => {
                        if (err) throw err;
                        console.log('User deleted!');
                    }).then(() => {
                        $row.remove()
                    })
                }
            })


        }
    })
})


/*const remove = ()=>{
    const url = '/cats';
    fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then((cats) => {
            for (const cat of cats) {

                catDiv.addEventListener('click', function (event) {

                    event.preventDefault()
                    const $button = event.target
                    const $row = $button.closest('article')
                    const id = $row.dataset.id
                    const action = $button.dataset.action

                    if (action === 'delete') {
                        console.log(id)

                        cats.findByIdAndRemove(id, (err) => {
                            if (err) throw err;
                            console.log('User deleted!');
                        }).then(() => {
                            $row.remove()
                        })

                    }
                })

            }
        })


}*/
 /*.then((cats) => {
    catDiv.addEventListener('click', function (event) {
        event.preventDefault()
        const $button = event.target
        const $row = $button.closest('article')
        const id = $row.dataset.id
        const action = $button.dataset.action

        if (action === 'delete') {
            cats.findByIdAndRemove(id, (err) => {
                if (err) throw err;
                console.log('User deleted!');
            }).then(() => {
                $row.remove()
            })

        }
    })
})*/
/*
catDiv.addEventListener('click', function (event) {
    event.preventDefault()

    const $button = event.target
    const $row = $button.closest('article')
    const id = $row.dataset.id
    const action = $button.dataset.action

    if (action === 'delete') {
        console.log(id)
        getCats().then((cats)=>{

        }).findByIdAndRemove(id, (err) => {
            if (err) throw err;
            console.log('User deleted!');
        })
        //Cats.remove(id)
            .then( () => {
                $row.remove()
            })
    }
*/




    /*if (action === 'edit') {
        var $cells = $row.querySelectorAll('td')
        var name = $cells[0].textContent.trim()
        var contact = $cells[1].textContent.trim()
        var note = $cells[2].textContent.trim()

        $row.innerHTML = `
        <td>
          <input value="${name}" data-original="${name}">
        </td>
        <td>
          <input value="${contact}" data-original="${contact}">
        </td>
        <td>
          <textarea data-original="${note}">${note}</textarea>
        </td>
        <td class="actions">
          <button data-action="save">save</button>
          <a href="#" data-action="cancel">cancel</a>
        </td>
      `
    }

    if (action === 'save') {
        var $inputs = $row.querySelectorAll('input, textarea')

        contactsStore.update({
            id: id,
            name: $inputs[0].value,
            contact: $inputs[1].value,
            note: $inputs[2].value
        })

            .then(function (contact) {
                $row.innerHTML = `
          <td>
          ${contact.name}
          </td>
          <td>
          ${contact.contact}
          </td>
          <td>
          ${contact.note}
          </td>
          <td class="actions">
          <a href="#" data-action="edit">edit</a> |
          <a href="#" data-action="delete">delete</a>
          </td>
          `
            })
    }

    if (action === 'cancel') {
        var $inputs = $row.querySelectorAll('input, textarea')
        var name = $inputs[0].dataset.original
        var contact = $inputs[1].dataset.original
        var note = $inputs[2].dataset.original

        $row.innerHTML = `
        <td>
          ${name}
        </td>
        <td>
          ${contact}
        </td>
        <td>
          ${note}
        </td>
        <td class="actions">
          <a href="#" data-action="edit">edit</a> |
          <a href="#" data-action="delete">delete</a>
        </td>
      `
    }*/
//})
