const renderTweets = (tweets) => {
    let finalHTML = `<section id="action">
    <button id="save" onclick="saveTweets()">Save Tweets Order</button>
    <button id="cancel" onclick="cancelTweets()">Cancel</button>
</section>`;
    tweets.forEach((tweet, index) => {
        const itemHTML = `<article class="form">
        <p class="index">${index + 1}</p>
            <h2 id="tweet-heading" class="form-heading">Update the Tweet</h2>

            <input type="number" name="id" value="${tweet.id}" style="display: none" />
            <input type="number" name="priority" value="${tweet.priority}" style="display: none" />

            <textarea name="message" id="message" placeholder="What's on your mind?" maxlength="280" class="textarea">
${tweet.message}</textarea
            >

            <input
                type="text"
                name="tags"
                id="tags"
                class="form-input"
                pattern="[a-zA-Z0-9_|]{0,}"
                placeholder="Twitter|elonmusk|PapaJohns|tyt__l"
                value="${tweet.tags}" />

            <input
                type="datetime-local"
                class="form-input"
                name="time"
                id="tweet-time"
                value="${tweet.time}"
                required />

            <section class="reorder-buttons">
                <button onclick="moveUp(${index})"><i class="fa-regular fa-square-caret-up"></i></button>
                <button onclick="moveDown(${index})"><i class="fa-regular fa-square-caret-down"></i></button>
            </section>
        </article>`;

        finalHTML += itemHTML;
    });

    let container = document.querySelector('#content .container');

    container.innerHTML = finalHTML;
};

renderTweets(tweets);

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

function moveUp(t) {
    if (t > 0) {
        const articles = array_move(tweets, t, t - 1);
        renderTweets(articles);
    }
}

function moveDown(t) {
    if (t < tweets.length - 1) {
        const articles = array_move(tweets, t, t + 1);
        renderTweets(articles);
    }
}

function cancelTweets() {
    window.location.href = '/tweets';
}

async function saveTweets() {
    const response = await fetch('/tweets/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lem: tweets }),
    });
    const status = (await response.json()).status;

    if (status === true) {
        window.location.href = '/tweets';
    } else {
        alert('It failed, please try again!');
    }
}
