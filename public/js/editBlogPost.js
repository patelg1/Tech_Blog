const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/edit/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({title, content}),
        headers: {'Content-Type': 'application/json'}
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }    
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);