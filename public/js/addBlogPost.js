const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    console.log('before response')

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({title, content}),
        headers: {'Content-Type': 'application/json'}
    });
    console.log(response.ok)
    if (response.ok) {
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);