// Função para carregar os dados dos posts do arquivo JSON
function loadPosts() {
  fetch('posts.json')
    .then(response => response.json())
    .then(data => {
      const blogContainer = document.getElementById('blogContainer');
      blogContainer.innerHTML = ''; // Limpar o conteúdo existente antes de carregar os novos posts

      data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.id = 'post-' + post.id;

        const titleElement = document.createElement('h2');
        titleElement.classList.add('fw-bold');
        titleElement.textContent = post.title;

        const contentElement = document.createElement('p');
        contentElement.classList.add('post-content');
        contentElement.textContent = post.content;

        const actionsElement = document.createElement('div');
        actionsElement.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'me-2');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editPost(post.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deletePost(post.id));

        actionsElement.appendChild(editButton);
        actionsElement.appendChild(deleteButton);

        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(actionsElement);

        blogContainer.appendChild(postElement);
      });
    })
    .catch(error => console.log(error));
}

// Funções JavaScript para editar e excluir postagens
function editPost(postId) {
  // Lógica para editar a postagem com o ID fornecido
  // Aqui, abrimos o modal e preenchemos os campos com o conteúdo do post
  const post = findPostById(postId);

  if (post) {
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editTitleInput = document.getElementById('editTitle');
    const editContentInput = document.getElementById('editContent');
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    // Definir o ID do post sendo editado no botão "Salvar Alterações"
    saveChangesBtn.dataset.postId = postId;

    editTitleInput.value = post.title;
    editContentInput.value = post.content;

    editModal.show();
  }
}

function deletePost(postId) {
  const postElement = document.getElementById('post-' + postId);
  if (postElement) {
    const confirmDelete = confirm('Tem certeza que deseja excluir o post?');
    if (confirmDelete) {
      postElement.remove();
      console.log('Post excluído:', postId);
    }
  }
}

// Função para encontrar um post pelo ID
function findPostById(postId) {
  // Código para encontrar o post pelo ID no seu array de posts ou requisição AJAX, etc.
  // Substitua este exemplo pelo seu próprio código para obter os dados do post
  const posts = [
    { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post.' },
    { id: 2, title: 'Segundo Post', content: 'Conteúdo do segundo post.' },
    { id: 3, title: 'Terceiro Post', content: 'Conteúdo do terceiro post.' }
  ];
  var string_numero = postId
  var numero_inteiro = parseInt(string_numero)
  console.log(numero_inteiro)
  return posts.find(post => post.id === numero_inteiro);
}

// Carregar os posts quando a página for aberta
document.addEventListener('DOMContentLoaded', function() {
  loadPosts();

  const saveChangesBtn = document.getElementById('saveChangesBtn');

  saveChangesBtn.addEventListener('click', function() {

    // Lógica para salvar as alterações no post
    const editTitleInput = document.getElementById('editTitle');
    const editContentInput = document.getElementById('editContent');

    const postId = this.dataset.postId; // Obter o ID do post atualmente sendo editado através do atributo 'data-post-id' do botão

    const post = findPostById(postId);
    if (post) {
      post.title = editTitleInput.value;
      post.content = editContentInput.value;

      console.log('Alterações salvas:', post);

      // Atualize o conteúdo do post no HTML
      const postElement = document.getElementById(`post-${post.id}`);
      const titleElement = postElement.querySelector('.fw-bold');
      const contentElement = postElement.querySelector('.post-content');

      titleElement.textContent = post.title;
      contentElement.textContent = post.content;

      // Feche o modal
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
      editModal.hide();
    }
  });
});