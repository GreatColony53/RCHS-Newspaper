

/* FEATURED ARTICLE HTML 
<img id = "featured-image" src="" alt="Main article image"  />
<div class="featured-text">
    <h2 id="featured-title">Breaking News: Rancho Just Posted</h2>
    <p id="featured-summary">
        A new club has been made come check it out! A new club has been made come check it out! A new club has been made come check it out! A new club has been made come check it out!
    </p>
    <a id = "read-more" href="">Read More →</a>
</div> 
*/

function createFeatureArticle(item, section) {
    const card = document.createElement('div');
    card.className = 'feature-card';

    const img = document.createElement('img');
    img.id = 'featured-image';
    img.src = "/allArticles/" + item.fileName;
    img.alt = "Main Article Image";

    // Create text container
    const textDiv = document.createElement('div');
    textDiv.className = 'featured-text';

    // Create title
    const title = document.createElement('h2');
    title.id = 'featured-title';
    title.textContent = item.title;

    // Create summary
    const summary = document.createElement('p');
    summary.id = 'featured-summary';
    summary.textContent = item.desc;

    // Create link
    const link = document.createElement('a');
    link.id = 'read-more';
    link.href = "read.html";
    link.textContent = 'Read More →';
    link.target="_blank";
    link.rel="noopener";
    link.addEventListener("click", () => {
        localStorage.setItem("currentArticle", JSON.stringify(item))
    });

    // Assemble
    textDiv.appendChild(title);
    textDiv.appendChild(summary);
    textDiv.appendChild(link);

    section.appendChild(img);
    section.appendChild(textDiv);
}


/* ARTICLE CARD HTML
<div class="article-card">
    <img src="" alt="Article Image">
    <div class = "article-card-text">
        <h2>Example Article</h2>
        <p>This is a placeholder image</p>
    </div>
</div>
*/

function createArticleCard(item, section) {
    // Makes the entire card a link
    const link = document.createElement('a');
    link.href = "read.html";
    link.target="_blank";
    link.rel="noopener";
    link.addEventListener("click", () => {
        localStorage.setItem("currentArticle", JSON.stringify(item))
    });

    // Create main card div
    const card = document.createElement('div');
    card.className = 'article-card';
    link.appendChild(card);

    // Create image element
    const img = document.createElement('img');
    img.src = "/allArticles/" + item.fileName;
    img.alt = 'Article Image';

    // Create text container
    const textDiv = document.createElement('div');
    textDiv.className = 'article-card-text';

    // Create heading
    const heading = document.createElement('h2');
    heading.textContent = item.title;

    // Create paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = item.desc;

    // Assemble the card
    textDiv.appendChild(heading);
    textDiv.appendChild(paragraph);

    card.appendChild(img);
    card.appendChild(textDiv);
    

    section.appendChild(link);
}


console.log("Loading Home Page...");
fetch('manifest.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      console.log(item);
      if (item.location == "archive") { return; }
      const section = document.getElementById(item.location) // Sets the location to topArticles or Featured article
      if (item.location == "feature") {
        createFeatureArticle(item, section);
        section.className = "featured-article";
      } else if (item.location == "topArticle") {
        createArticleCard(item, section);
        section.className = "article-grid";
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));