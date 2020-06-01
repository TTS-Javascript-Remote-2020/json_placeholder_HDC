const form = document.querySelector('#loginForm form');
const container = document.querySelector('#container');
let currentUser = {};

const setNavButtons = (backpage) => {
  const nav = document.querySelector('#nav');
  nav.style.display = 'flex';
  nav.style.justifyContent = 'space-between';
  const backarrow = document.querySelector('#backarrow');
  document.querySelector('#logoutButton').onclick = () => history.go(0);
  switch (backpage) {
    case 'logout':
      backarrow.style.backgroundColor = '#5876a6';
      break;
    case 'facts':
      backarrow.style.backgroundColor = '#c8ced9';
      backarrow.onclick = showUserPage;
      break;
    default:
      console.log('Error occurred in navigation.')
  }
}

const showError = (error) => {
  const el = document.querySelector('#errorMessage');
  el.innerText = error;
}
// Don't like how this works, may need to refactor
const clearSection = (section) => {
  document.querySelector(section).innerText = '';
}

const showPic = () => {
  setNavButtons('facts');
  const section = document.querySelector('#facts');
  section.id = 'picture'
  clearSection('#picture');
  const pic = document.createElement('img');
  pic.src = 'https://picsum.photos/200/300';
  pic.alt = 'some picture from picsum';
  section.appendChild(pic);

}

const showUserPage = () => {
  if (currentUser && currentUser.first_name != '') {

    setNavButtons('logout');
    const section = document.querySelector('section');
    section.innerText = '';
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
         item.onclick = showPic;
         list.appendChild(item);
       }
       section.appendChild(list);
       container.appendChild(section);
     })
  } else {
    location.reload();
  }
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
