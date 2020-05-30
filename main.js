const form = document.querySelector('#loginForm form');
const container = document.querySelector('#container');
let currentUser = {};

const showError = (error) => {
  const el = document.querySelector('#errorMessage');
  el.innerText = error;
}

const clearSection = (section) => {
  document.querySelector(section).innerText = '';
}
// This is where I am
// const showPic = () => {
//   const section = document.querySelector('section');
//   clearSection(section);
//   fetch('https://picsum.photos/200/300')
//     .then(response => {
//       const pic = document.createElement('img');
//       pic.src = response;
//       section.appendChild(pic);
//     })
//     .catch(error => console.log('An error has occured.'))
// }

const showUserPage = (currentUser) => {
  const section = document.querySelector('section');
  const title = document.createElement('h1');
  title.innerText = `${currentUser.first_name}'s Cat Facts`;
  section.appendChild(title);

  section.id = 'facts';
  const list = document.createElement('ul');

  fetch('https://cat-fact.herokuapp.com/facts')
  .then(response => response.json())
   .then(data => {
     for (let i = 0; i < 10; i++) {
       const item = document.createElement('li');
       item.innerText = data.all[i].text;
       // item.onclick = showPic;
       list.appendChild(item);
     }
     section.appendChild(list);
     container.appendChild(section);
   })
}

const checkUser = (email) => {
  fetch('https://reqres.in/api/users?page=2')
    .then(response => response.json())
    .then(data=> {
      currentUser = data.data.find(user => user.email === email);
      if (currentUser) {
        clearSection('#loginForm');
        showUserPage(currentUser)
      } else {
        showError('Email not found.')
      }
    })
    .catch(error => console.log(error))
}

const loginUser = (event) => {
  event.preventDefault();
  showError('');
  const email = event.target.userEmail.value;
  form.reset();
  checkUser(email);
}

form.onsubmit = loginUser;
