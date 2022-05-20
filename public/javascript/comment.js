// handles addind a comment
async function commentFormHandler(event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const content = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  console.log(post_id, content);

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);
