const commentFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('textarea[name = "comment-body"]').value.trim();
    const post_ID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (text){
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({post_ID, text}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
        document.location.reload()
        }else {
            alert(response.statusText);
        }
    }    
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);