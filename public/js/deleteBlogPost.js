const deleteFormHandler = async (event) => {
    event.preventDefault();
    
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/edit/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({post_id: postId}),
        headers: {'Content-Type': 'application/json'}
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }    
};

document.querySelector('.delete-post-form').addEventListener('click', deleteFormHandler);