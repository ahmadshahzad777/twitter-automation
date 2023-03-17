const renderRetweets = (retweets) => {
    let finalHTML = `<section id="action">
    <button id="save" onclick="saveRetweets()">Save Retweets Order</button>
    <button id="cancel" onclick="cancelRetweets()">Cancel</button>
</section>`;
    retweets.forEach((retweet, index) => {
        const itemHTML = `<article class="form">
    <p class="index">${index + 1}</p>
    
    <input type="number" name="id" value="${retweet.id}" style="display: none" />
    <input type="number" name="priority" value="${retweet.priority}" style="display: none" />
    
    <h2 class="form-heading">Update the Schedule</h2>
    
    <input
        type="url"
        name="link"
        class="form-input"
        id="retweet-link"
        pattern="^https:\/\/twitter\.com\/(\w*)\/status\/(\d*)"
        placeholder="https://twitter.com/Twitter/status/1580661436132757506"
        value="${retweet.link}"
        required />
    
    <input
        type="datetime-local"
        class="form-input"
        name="time"
        id="retweet-time"
        value="${retweet.time}"
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

renderRetweets(retweets);

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
        const articles = array_move(retweets, t, t - 1);
        renderRetweets(articles);
    }
}

function moveDown(t) {
    if (t < retweets.length - 1) {
        const articles = array_move(retweets, t, t + 1);
        renderRetweets(articles);
    }
}

function cancelSave() {
    window.location.href = '/retweets';
}

async function saveRetweets() {
    const response = await fetch('/retweets/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lem: retweets }),
    });
    const status = (await response.json()).status;

    if (status === true) {
        window.location.href = '/retweets';
    } else {
        alert('It failed, please try again!');
    }
}
