/* EXAMPLE GRID HTML
<div class="grid-row">
    <div>Nov 2, 2025</div>
    <div><a href="today.html">Student Council Updates</a></div>
    <div>Alex Kim</div>
</div>
*/
const grid = document.getElementById('grid')
function createNewRow(item) {
    // Create the row container
    const row = document.createElement('div');
    row.className = 'grid-row';

    // Create date cell
    const dateDiv = document.createElement('div');
    dateDiv.textContent = item.date;

    // Create link cell
    const linkDiv = document.createElement('div');
    const link = document.createElement('a');
    link.href = "read.html";
    link.textContent = item.title;
    link.target="_blank";
    link.rel="noopener";
    link.addEventListener("click", () => {
        localStorage.setItem("currentArticle", JSON.stringify(item))
    });
    linkDiv.appendChild(link);

    // Create author cell
    const authorDiv = document.createElement('div');
    authorDiv.textContent = item.author;

    // Assemble the row
    row.appendChild(dateDiv);
    row.appendChild(linkDiv);
    row.appendChild(authorDiv);

    // Add to container
    grid.appendChild(row);
}


console.log("Loading Archive...");
fetch('allArticles/manifest.json')
  .then(response => response.json())
  .then(data => {
    grid.className = "grid-content";
    data.forEach(item => {
      console.log(item);
      createNewRow(item)
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
